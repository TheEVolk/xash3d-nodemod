import customs from './customs.js';

// Генератор транслейтов
const generator = {
  js2cpp(type, value) {
    const extractorGenerator = {
      'const char *': `utils::js2string(isolate, ${value})`,
      'char *': `utils::js2string(isolate, ${value})`,
      int: `${value}->Int32Value(context).ToChecked()`,
      float: `${value}->NumberValue(context).ToChecked()`,
      qboolean: `${value}->BooleanValue(isolate)`,
      FORCE_TYPE: `*(FORCE_TYPE*)utils::jsToBytes(isolate, ${value})`,
      PRINT_TYPE: `*(PRINT_TYPE*)utils::jsToBytes(isolate, ${value})`,
      'unsigned short': `${value}->Int32Value(context).ToChecked()`,
      'byte': `${value}->Int32Value(context).ToChecked()`,
    };

    if (extractorGenerator[type]) {
      return extractorGenerator[type];
    }

    const [_, name] = type.match(/(?:const )?(?:struct )?(.+)\*/) || [];
    if (name) {
      const structs = {
        edict_t: `structures::unwrapEntity(isolate, ${value})`
      };

      if (structs[name.trim()]) {
        return structs[name.trim()];
      }
    }

    console.warn(`No '${type}' js2cpp`);
    return `nullptr /* ${type} */`;
  },

  cpp2js(type, value) {
    const types = {
      'unsigned int': `v8::Number::New(isolate, ${value})`,
      int: `v8::Number::New(isolate, ${value})`,
      float: `v8::Number::New(isolate, ${value})`,
      qboolean: `v8::Boolean::New(isolate, ${value})`,
      vec3_t: `utils::vect2js(isolate, ${value})`
    };

    if (types[type]) {
      return types[type];
    }

    const [_, name] = type.match(/(?:const )?(?:struct )?(.+)\*/) || [];
    if (name) {
      const structs = {
        edict_t: `structures::wrapEntity(isolate, ${value})`,
        char: `v8::String::NewFromUtf8(isolate, ${value}).ToLocalChecked()`
      };

      if (structs[name.trim()]) {
        return structs[name.trim()];
      }

      console.warn(`Struct ${type} not found: cpp2js`);
      return `v8::External::New(isolate, ${value} /* ${name} */)`;
    }

    console.warn(`Type ${type} not found: cpp2js`);
    return null;
  },

  packReturn(func, value) {
    if (func.type === 'void') {
      return value;
    }

    const generated = this.cpp2js(func.type, value)
    if (!generated) {
      console.log(`No ${func.type} type packReturn`);
      if (func.type.includes('*')) {
        return `info.GetReturnValue().Set(v8::External::New(isolate, ${value}));`;
      }

      return `${value} /* TODO: type ${func.type} */`;
    }


    return `info.GetReturnValue().Set(${generated})`;
  },

  generateCppFunction(func, source, prefix) {
    const customBody = customs[prefix.split('_')[1]]?.[func.name]?.api?.body;
    return `void ${prefix}_${func.name}(const v8::FunctionCallbackInfo<v8::Value>& info)
{
	auto isolate = info.GetIsolate();
  v8::Locker locker(isolate);
	v8::HandleScope scope(isolate);
	auto context = isolate->GetCurrentContext();

  ${customBody || this.packReturn(func, `(*${source}.${func.name})(${func.args.map((v, i) => this.js2cpp(v.type, `info[${i}]`)).join(',\n')})`)};
}`;
  }
}

export default generator;