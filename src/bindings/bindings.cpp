#include <utility>
#include <string>
#include <unistd.h>
#include <vector>
#include <limits.h>
#include "v8.h"
#include "bindings.hpp"
#include "util/convert.hpp"

extern std::vector<std::pair<std::string, v8::FunctionCallback>> nodemodFunctions;
extern v8::Local<v8::ObjectTemplate> registerEngineFunctions(v8::Isolate *isolate);
namespace players {
  extern void getPlayers(v8::Local<v8::String> property, const v8::PropertyCallbackInfo<v8::Value> &info);
}

namespace bindings
{
  void init(v8::Isolate *isolate, v8::Local<v8::ObjectTemplate> &global)
  {
    v8::Locker locker(isolate);
    v8::Local<v8::ObjectTemplate> nodemodObject = v8::ObjectTemplate::New(isolate);

    // add base functions
    for (auto &routine : nodemodFunctions)
    {
      nodemodObject->Set(
          convert::str2js(isolate, routine.first.c_str()),
          v8::FunctionTemplate::New(isolate, routine.second));
    }

    // add engine functions
    nodemodObject->Set(
        convert::str2js(isolate, "eng"),
        registerEngineFunctions(isolate));

    char cwd[PATH_MAX];
    getcwd(cwd, sizeof(cwd));

    nodemodObject->Set(
        convert::str2js(isolate, "cwd"),
        convert::str2js(isolate, cwd));

    // add getters
    nodemodObject->SetAccessor(
        convert::str2js(isolate, "players"),
         players::getPlayers);

    global->Set(convert::str2js(isolate, "nodemod"), nodemodObject);
  }
}
