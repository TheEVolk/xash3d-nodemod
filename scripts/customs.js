export default {
  eng: {
    pfnClientCommand: {
      event: {
        argsString: 'edict_t* ed, const char *szFmt, ...',
        body: `unsigned int v8_argCount = 2;
  v8::Local<v8::Value>* v8_args = new v8::Local<v8::Value>[2];
  v8_args[0] = structures::wrapEntity(isolate, ed);
  v8_args[1] = v8::String::NewFromUtf8(isolate, CMD_ARGS()).ToLocalChecked();`
      },
      api: {
        body: `(*g_engfuncs.pfnClientCommand)(structures::unwrapEntity(isolate, info[0]), utils::js2string(isolate, info[1]));`
      }
    }
  },
  dll: {
    pfnClientCommand: {
      event: {
        argsString: 'edict_t* ed',
        body: `unsigned int v8_argCount = 2;
  v8::Local<v8::Value>* v8_args = new v8::Local<v8::Value>[2];
  v8_args[0] = structures::wrapEntity(isolate, ed);

  // refactor it str hell
  if (CMD_ARGC() > 1) {
  char buf[100];
  sprintf(buf, "%s %s", CMD_ARGV(0), CMD_ARGS());
  v8_args[1] = v8::String::NewFromUtf8(isolate, buf).ToLocalChecked();
  } else {
    v8_args[1] = v8::String::NewFromUtf8(isolate, CMD_ARGV(0)).ToLocalChecked();
  }`
      }
    }
  }
};