#include "v8.h"
#include "extdll.h"
#include "structures.hpp"
#include "node/utils.hpp"

extern enginefuncs_t g_engfuncs;

#define E_GET (edict_t *)structures::unwrapEntity(info.GetIsolate(), info.Holder());

#define GETN(v) v
#define GETVEC3(v) utils::vect2js(info.GetIsolate(), v)
#define GETSTR(v) v8::String::NewFromUtf8(info.GetIsolate(), (*g_engfuncs.pfnSzFromIndex)(v), v8::NewStringType::kNormal).ToLocalChecked()

#define SETINT(v) v->Int32Value(info.GetIsolate()->GetCurrentContext()).ToChecked()
#define SETSTR(v) (*g_engfuncs.pfnAllocString)(utils::js2string(info.GetIsolate(), v))
#define SETVEC3(v, f) utils::js2vect(info.GetIsolate(), v8::Local<v8::Array>::Cast(v), f)

#define GETTER(field, TYPE) ([](v8::Local<v8::String> property, const v8::PropertyCallbackInfo<v8::Value> &info) { \
        edict_t *edict = (edict_t *)structures::unwrapEntity(info.GetIsolate(), info.Holder()); \
        if (edict == NULL) return;\
        info.GetReturnValue().Set(TYPE(edict->field)); \
      }) \

#define SETTER(field, TYPE) ([](v8::Local<v8::String> property, v8::Local<v8::Value> value, const v8::PropertyCallbackInfo<v8::Value> &info) { edict_t *edict = E_GET if (edict == NULL) return; edict->field = TYPE(value); })
#define SETTERL(field, TYPE) ([](v8::Local<v8::String> property, v8::Local<v8::Value> value, const v8::PropertyCallbackInfo<v8::Value> &info) { edict_t *edict = E_GET if (edict == NULL) return; TYPE(value, edict->field); })

namespace structures {
v8::Eternal<v8::ObjectTemplate> entity;

edict_t* unwrapEntity(v8::Isolate* isolate, const v8::Local<v8::Value> &obj) {
		v8::Locker locker(isolate);
  if (obj.IsEmpty() || !obj->IsObject()) {
    // printf("NOUNWRAP\n");
    return nullptr;
  }

     //printf("UNWRAP\n");
  auto object = obj->ToObject(isolate->GetCurrentContext());
  if (object.IsEmpty()) {
     printf("NOUNWRAP maybe\n"); // It crash server
    return nullptr;
  }

 v8::Handle<v8::External> field = v8::Handle<v8::External>::Cast(
   object.ToLocalChecked()->GetInternalField(0)
  );

 return static_cast<edict_t *>(field->Value());
}

 v8::Local<v8::Value> wrapEntity(v8::Isolate* isolate, edict_t* entity) {
		v8::Locker locker(isolate);
   if (entity == NULL) {
     // printf("NOWRAP\n");
     return v8::Null(isolate);
   }

    // printf("WRAP\n");
  auto obj = structures::entity.Get(isolate)->NewInstance(isolate->GetCurrentContext()).ToLocalChecked();
  obj->SetInternalField(0, v8::External::New(isolate, entity));
  return obj;
}

void createEntityTemplate(v8::Isolate* isolate)
{
	v8::Locker locker(isolate);
  v8::EscapableHandleScope scope(isolate);
	auto context = isolate->GetCurrentContext();

  v8::Local<v8::ObjectTemplate> _entity = v8::ObjectTemplate::New(isolate);
  _entity->SetInternalFieldCount(1);

  // classname
  _entity->SetAccessor(
    v8::String::NewFromUtf8(isolate, "classname").ToLocalChecked(),
    GETTER(v.classname, GETSTR),
    SETTER(v.classname, SETSTR)
  );

  // globalname
  _entity->SetAccessor(
    v8::String::NewFromUtf8(isolate, "globalname").ToLocalChecked(),
    GETTER(v.globalname, GETSTR),
    SETTER(v.globalname, SETSTR)
  );

  // model
  _entity->SetAccessor(
    v8::String::NewFromUtf8(isolate, "model").ToLocalChecked(),
    GETTER(v.model, GETSTR),
    SETTER(v.model, SETSTR)
  );

  // netname
  _entity->SetAccessor(
    v8::String::NewFromUtf8(isolate, "netname").ToLocalChecked(),
    GETTER(v.netname, GETSTR),
    SETTER(v.netname, SETSTR)
  );

  // health
  _entity->SetAccessor(
    v8::String::NewFromUtf8(isolate, "health").ToLocalChecked(),
    GETTER(v.health, GETN),
    SETTER(v.health, SETINT)
  );

  // origin
  _entity->SetAccessor(
    v8::String::NewFromUtf8(isolate, "origin").ToLocalChecked(),
    GETTER(v.origin, GETVEC3),
    SETTERL(v.origin, SETVEC3)
  );

  // controller
  _entity->SetAccessor(
    v8::String::NewFromUtf8(isolate, "origin").ToLocalChecked(),
    GETTER(v.origin, GETVEC3),
    SETTERL(v.origin, SETVEC3)
  );

    structures::entity.Set(isolate, _entity);
}
}