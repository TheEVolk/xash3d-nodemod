#pragma once
#include <v8.h>

namespace bindings
{
  void init(v8::Isolate *isolate, v8::Local<v8::ObjectTemplate> &global);
}