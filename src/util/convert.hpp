#pragma once
#include "v8.h"

namespace convert {
  inline v8::Local<v8::String> str2js(v8::Isolate *isolate, const char *str) {
    return v8::String::NewFromUtf8(isolate, str, v8::NewStringType::kNormal).ToLocalChecked();
  };
}