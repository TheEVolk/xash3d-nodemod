export default {
  pfnClientCommand: {
    api: {
      body: `(*g_engfuncs.pfnClientCommand)(structures::unwrapEntity(isolate, info[0]), utils::js2string(isolate, info[1]));`
    }
  }
};