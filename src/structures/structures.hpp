#pragma once
#include "v8.h"
#include "extdll.h"

namespace structures {
  extern v8::Eternal<v8::ObjectTemplate> entity;

  extern void createEntityTemplate(v8::Isolate *isolate, v8::Local<v8::ObjectTemplate> &global);
  extern  v8::Local<v8::Value> wrapEntity(v8::Isolate* isolate, edict_t* entity);
  extern edict_t* unwrapEntity(v8::Isolate* isolate, const v8::Local<v8::Value> &obj);
}