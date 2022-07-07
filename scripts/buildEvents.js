// Создаем events.cpp и events.hpp, в которых все евенты автоматически транслируются в nodejs
import {
  camelCase
} from 'change-case';
import { promises as fs } from 'fs';

const generators = {
  'const char *': v => `v8::String::NewFromUtf8(isolate, ${v}).ToLocalChecked()`,
  'int': v => `v8::Integer::New(isolate, static_cast<uint32_t>(${v}));`
};

function argToValue(arg) {
  const generator = generators[arg.type];
  if (!generator) {
    console.log('no generator', arg);
    return 'v8::String::NewFromUtf8(isolate, "INVALID VALUE").ToLocalChecked()';
  }

  return generator(arg.name);
}

function getEventName(func, prefix) {
  return camelCase(`${prefix}${func.name.replace(/^pfn/, '')}`);
}

function getFunction(func, prefix) {
  if (func.type === 'NULL') {
    return `// NULL ${prefix}_${func.name}`;
  }

  const eventName = getEventName(func, prefix);
  if (func.name === 'pfnStartFrame' && prefix !== 'post') {
    return `// ${func.name}
  ${func.type} ${prefix}_${func.name} () {
    nodeImpl.Tick();
  }`;
  }

  const description = `// nodemod.on('${eventName}', (${func.args.map(v => v.name).join(', ')}) => console.log('${eventName} fired!'));`;
  if (func.args.length === 0) {
    return `${description}
  ${func.type} ${prefix}_${func.name} () {
    event::findAndCall("${eventName}", nullptr, 0);
  }`;
  }

  return `${description}
  ${func.type} ${prefix}_${func.name} (${func.args.map(v => `${v.type} ${v.name}`).join(', ')}) {
    event::findAndCall("${eventName}", [=](v8::Isolate* isolate) {
      unsigned int v8_argCount = ${func.args.length};
       v8::Local<v8::Value>* v8_args = new v8::Local<v8::Value>[${func.args.length}];
      ${func.args.map((v, i) => `v8_args[${i}] = ${argToValue(v)}; // ${v.name} (${v.type})`).join('\n')}
      return std::pair<unsigned int, v8::Local<v8::Value>*>(v8_argCount, v8_args);
    });
  }`;
}

function getFunctions(dllFunctions, prefix) {
  return {
    functions: dllFunctions.map(v => getFunction(v, prefix)),
    definitions: dllFunctions.map(v => v.type === 'NULL' ? 'NULL' : `${prefix}_${v.name}`)
  };
}

function clearByDefines(list) {
  return list;
  // Не нужно пока
  const isDefineTrue = true;
  const response = [];
  list.forEach(v => {
    if (v.startsWith('#')) {
      console.log('process rule ', v);
      const ifDef = v.match(/#ifdef (.+)/);
      console.log(ifDef)
      return;
    }
  });

  return response;
}

function parseFunction(line) {
  try {
    const prettyLine = line.replace(/[ \t]+/g, ' ');
    const [, type, name, argsPart] = prettyLine.match(/^([0-9a-z_ *]+) ?\(\*([0-9a-zA-Z_]+) ?\) ?\( ?([\s\S]+) ?\)/) || [];
    if (!type) {
      throw Error(`Invalid: ${prettyLine}`);
    }

    const args = argsPart.split(/, ?/).map(v => v.trim()).filter(v => v !== 'void').map((v, i) => {
      if (v === '...') {
        throw Error('rest not support');
        return { name: 'args', type: '$rest' };
      }

      if (v.match(/^[a-z_A-Z0-9]+ ?\*?$/)) {
        return { name: `value${i}`, type: v };
      }

      const [, type, name] = v.match(/^([a-z_A-Z0-9 ]+[ \*]+ ?)([a-z_A-Z0-9[\]]*)$/) || [];
      if (!type) {
        throw Error(`Invalid arg: ${v}`);
      }

      return { name: name || `value${i}`, type: type.trim() };
    });

    return {
      type: type.trim(),
      name,
      args,
      rawArgs: argsPart
    };
  }
  catch (error) {
    console.log(`Error function: ${line}\n${error.stack}`);
    return {
      type: 'NULL',
      name: line.match(/\(\*([0-9a-zA-Z_]+)\)/)[1]
    };
  }
}

(async () => {
  const eifaceContent = await fs.readFile('../../../../hlsdk-xash3d/engine/eiface.h').then(v => v.toString());
  const [_, dllFunctionsPart] = eifaceContent.match(/#endif\n\ntypedef struct \n{\n([\s\S]+)\n} DLL_FUNCTIONS;/m);
  const dllFunctionsLines = dllFunctionsPart.split('\n').map(v => v.trim().replace(/\/\*.+\*\//g, '')).filter(v => v && !v.startsWith('//'));
  const dllFunctions = dllFunctionsLines.map(parseFunction);

  const [, engineFunctionsPart] = eifaceContent.match(/typedef struct enginefuncs_s\n{\n([\s\S]+)\n} enginefuncs_t;/m);
  const engineFunctionsLines = clearByDefines(engineFunctionsPart.split('\n').map(v => v.trim().replace(/\/\*.+\*\//g, '')).filter(v => v && !v.startsWith('//')));
  const engineFunctions = engineFunctionsLines.map(parseFunction);

  const baseDllFunctions = getFunctions(dllFunctions, 'dll');
  const postDllFunctions = getFunctions(dllFunctions, 'postDll');
  const file = `// This file builded by: node scripts/buildEvents.js
  #include <extdll.h>
  #include "node/nodeimpl.hpp"
  #include "node/events.hpp"

  /* BASE EVENTS */
    ${baseDllFunctions.functions.join('\n\n')}

    DLL_FUNCTIONS g_DllFunctionTable = {
      ${baseDllFunctions.definitions.join(',\n')}
    };

  /* POST EVENTS */
    ${postDllFunctions.functions.join('\n\n')}

    DLL_FUNCTIONS g_DllFunctionTable_Post = {
      ${postDllFunctions.definitions.join(',\n')}
    };

    void registerDllEvents()
    {
      // base
      ${dllFunctions.map(v => `event::register_event("${getEventName(v, 'dll')}", "");`).join('\n')}
      // post
      ${dllFunctions.map(v => `event::register_event("${getEventName(v, 'postDll')}", "");`).join('\n')}
    }
  `;

  await fs.writeFile('./src/auto/dll_events.cpp', file);

  const baseEngineFunctions = getFunctions(engineFunctions, 'eng');
  const postEngineFunctions = getFunctions(engineFunctions, 'postEng');
  const engineFile = `// This file builded by: node scripts/buildEvents.js
  #include <extdll.h>
  #include "node/nodeimpl.hpp"
  #include "node/events.hpp"

  /* BASE EVENTS */
    ${baseEngineFunctions.functions.join('\n\n')}

    enginefuncs_t g_EngineFunctionsTable = {
      ${baseEngineFunctions.definitions.join(',\n')}
    };

  /* POST EVENTS */
    ${postEngineFunctions.functions.join('\n\n')}

    enginefuncs_t g_EngineFunctionsTable_Post = {
      ${postEngineFunctions.definitions.join(',\n')}
    };

    void registerEngineEvents()
    {
      // base
      ${engineFunctions.map(v => `event::register_event("${getEventName(v, 'eng')}", "");`).join('\n')}
      // post
      ${engineFunctions.map(v => `event::register_event("${getEventName(v, 'postEng')}", "");`).join('\n')}
    }
  `;

  await fs.writeFile('./src/auto/engine_events.cpp', engineFile);
})();