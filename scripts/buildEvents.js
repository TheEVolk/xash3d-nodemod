// Создаем events.cpp и events.hpp, в которых все евенты автоматически транслируются в nodejs
import { promises as fs } from 'fs';

function getFunction(func, prefix) {
  if (func.name === 'pfnStartFrame') {
    return `// ${func.name}
  ${func.type} ${prefix}_${func.name} () {
    nodeImpl.Tick();
  }`;
  }

  return `// ${func.name}
  ${func.type} ${prefix}_${func.name} (${func.rawArgs}) {}`;

  return [
    `// ${func.name}`,
    `${func.type} ${prefix}_${func.name} ()`,
    '{',
    'v8::Isolate* isolate = info.GetIsolate();',
    'v8::Locker locker(isolate);',
    'v8::Isolate::Scope isolateScope(isolate);',
    '',
    'auto _context = isolate->GetCurrentContext();',
    'v8::Context::Scope contextScope(_context);',
    '',
    'v8:: TryCatch eh(isolate);',
    'int returnValue = 0;',
    '',
    'Handle<v8::Object> global = _context->Global();',
    `Handle<v8::Value> value = global->Get(String::New("${prefix}_${func.name}"));`,
    '',
    'if (!value->IsFunction()) {',
    'return;',
    '}',
    '',
    'Handle<v8::Function> func = v8::Handle<v8::Function>::Cast(value);',
    'func->Call(global);',
    '}'
  ].join('\n');
}

function getFunctions(dllFunctions, prefix) {
  return {
    functions: dllFunctions.map(v => getFunction(v, prefix)),
    definitions: dllFunctions.map(v => `${prefix}_${v.name}`)
  };
}

(async () => {
  const eifaceContent = await fs.readFile('../../../../hlsdk-xash3d/engine/eiface.h').then(v => v.toString());
  const [_, dllFunctionsPart] = eifaceContent.match(/#endif\n\ntypedef struct \n{\n([\s\S]+)\n} DLL_FUNCTIONS;/m);
  const dllFunctionsLines = dllFunctionsPart.split('\n').map(v => v.trim()).filter(v => v && !v.startsWith('//'));
  const dllFunctions = dllFunctionsLines.map(line => {
    const prettyLine = line.replace(/[ \t]+/g, ' ');
    const [, type, name, argsPart] = prettyLine.match(/^([0-9a-z_ *]+) ?\(\*([0-9a-zA-Z_]+) ?\) ?\( ?([\s\S]+) ?\)/) || [];
    if (!type) {
      throw Error(`Invalid: ${prettyLine}`);
    }

    const args = argsPart.split(/, ?/).map(v => v.trim()).filter(v => v !== 'void').map(v => {
      if (v.match(/^[a-z_A-Z0-9]+ ?\*?$/)) {
        return { name: 'value', type: v };
      }

      const [, type, name] = v.match(/^([a-z_A-Z0-9 ]+[ \*]+ ?)([a-z_A-Z0-9[\]]*)$/) || [];
      if (!type) {
        throw Error(`Invalid arg: ${v}`);
      }

      return { name: name || 'value', type };
    });

    return {
      type,
      name,
      args,
      rawArgs: argsPart
    };
  });

  console.log(dllFunctions)

  const baseFunctions = getFunctions(dllFunctions, 'base');
  const file = `// This file builded by: node scripts/buildEvents.js
  #include <extdll.h>
  #include "node/nodeimpl.hpp"

    ${baseFunctions.functions.join('\n\n')}

    DLL_FUNCTIONS g_DllFunctionTable = {
      ${baseFunctions.definitions.join(',\n')}
    };
  `;

  await fs.writeFile('./src/auto/events.cpp', file);
})();