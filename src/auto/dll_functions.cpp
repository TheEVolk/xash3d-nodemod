#include <string>
#include "v8.h"
#include "extdll.h"
#include "meta_api.h"
#include "node/utils.hpp"
#include "structures/structures.hpp"
#include "util/convert.hpp"

#define V8_STUFF() v8::Isolate* isolate = info.GetIsolate(); \
  v8::Locker locker(isolate); \
  v8::HandleScope scope(isolate); \
  v8::Local<v8::Context> context = isolate->GetCurrentContext()

extern gamedll_funcs_t *gpGamedllFuncs;

// nodemod.dll.spawn();
void sf_dll_pfnSpawn(const v8::FunctionCallbackInfo<v8::Value> &info)
{
  V8_STUFF();
  (*gpGamedllFuncs->dllapi_table->pfnSpawn)(structures::unwrapEntity(isolate, info[0]));
}

static std::pair<std::string, v8::FunctionCallback> gamedllSpecificFunctions[] = {
    {"spawn", sf_dll_pfnSpawn}};

v8::Local<v8::ObjectTemplate> registerDllFunctions(v8::Isolate *isolate)
{
  v8::Local<v8::ObjectTemplate> object = v8::ObjectTemplate::New(isolate);
  for (auto &routine : gamedllSpecificFunctions)
  {
    object->Set(v8::String::NewFromUtf8(isolate, routine.first.c_str(), v8::NewStringType::kNormal).ToLocalChecked(), v8::FunctionTemplate::New(isolate, routine.second));
  };

  return object;
};
