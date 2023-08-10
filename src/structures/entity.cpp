#include "v8.h"
#include "extdll.h"
#include "structures.hpp"
#include "node/utils.hpp"
#include <unordered_map>

extern enginefuncs_t g_engfuncs;

#define E_GET (edict_t *)structures::unwrapEntity(info.GetIsolate(), info.Holder());

#define GETN(v) v
#define GETVEC3(v) utils::vect2js(info.GetIsolate(), v)
#define GETSTR(v) v8::String::NewFromUtf8(info.GetIsolate(), (*g_engfuncs.pfnSzFromIndex)(v), v8::NewStringType::kNormal).ToLocalChecked()

#define SETINT(v) v->Int32Value(info.GetIsolate()->GetCurrentContext()).ToChecked()
#define SETSTR(v) (*g_engfuncs.pfnAllocString)(utils::js2string(info.GetIsolate(), v))
#define SETVEC3(v, f) utils::js2vect(info.GetIsolate(), v8::Local<v8::Array>::Cast(v), f)

#define GETTER(FIELD, TYPE) ([](v8::Local<v8::String> property, const v8::PropertyCallbackInfo<v8::Value> &info) { \
        edict_t *edict = (edict_t *)structures::unwrapEntity(info.GetIsolate(), info.Holder()); \
        if (edict == NULL) return;\
        info.GetReturnValue().Set(TYPE(edict->FIELD)); })

#define SETTER(field, TYPE) ([](v8::Local<v8::String> property, v8::Local<v8::Value> value, const v8::PropertyCallbackInfo<v8::Value> &info) { edict_t *edict = E_GET if (edict == NULL) return; edict->field = TYPE(value); })
#define SETTERL(field, TYPE) ([](v8::Local<v8::String> property, v8::Local<v8::Value> value, const v8::PropertyCallbackInfo<v8::Value> &info) { edict_t *edict = E_GET if (edict == NULL) return; TYPE(value, edict->field); })
#define ACCESSOR(entity, name, field, GET, SET) entity->SetAccessor(v8::String::NewFromUtf8(isolate, name).ToLocalChecked(), GETTER(field, GET), SETTER(field, SET))
#define ACCESSORL(entity, name, field, GET, SET) entity->SetAccessor(v8::String::NewFromUtf8(isolate, name).ToLocalChecked(), GETTER(field, GET), SETTERL(field, SET))

namespace structures
{
  v8::Eternal<v8::ObjectTemplate> entity;
  std::unordered_map<int, v8::Persistent<v8::Object>> wrappedEntities;

  edict_t *unwrapEntity(v8::Isolate *isolate, const v8::Local<v8::Value> &obj)
  {
    v8::Locker locker(isolate);
    if (obj.IsEmpty() || !obj->IsObject())
    {
      return NULL;
    }

    auto object = obj->ToObject(isolate->GetCurrentContext());
    if (object.IsEmpty())
    {
      return NULL;
    }

    auto field = object.ToLocalChecked()->GetAlignedPointerFromInternalField(0);
    return static_cast<edict_t *>(field);
  }

  v8::Local<v8::Value> wrapEntity(v8::Isolate *isolate, edict_t *entity)
  {
    v8::Locker locker(isolate);
    if (entity == NULL)
    {
      return v8::Null(isolate);
    }

    int entityId = (*g_engfuncs.pfnIndexOfEdict)(entity);
    if (wrappedEntities.find(entityId) != wrappedEntities.end())
    {
      v8::Local<v8::Object> existingObject = v8::Local<v8::Object>::New(isolate, wrappedEntities[entityId]);
      return existingObject;
    }

    // Create a new instance if an object doesn't exist for this ID
    v8::Local<v8::Object> obj = structures::entity.Get(isolate)->NewInstance(isolate->GetCurrentContext()).ToLocalChecked();
    obj->SetAlignedPointerInInternalField(0, entity);
    obj->Set(isolate->GetCurrentContext(), v8::String::NewFromUtf8(isolate, "id").ToLocalChecked(), v8::Number::New(isolate, entityId));

    wrappedEntities[entityId].Reset(isolate, obj);
    return obj;
  }

  void createEntityTemplate(v8::Isolate *isolate)
  {
    v8::Locker locker(isolate);
    v8::EscapableHandleScope scope(isolate);
    auto context = isolate->GetCurrentContext();

    v8::Local<v8::ObjectTemplate> _entity = v8::ObjectTemplate::New(isolate);
    _entity->SetInternalFieldCount(1);

    ACCESSOR(_entity, "classname", v.classname, GETSTR, SETSTR);
    ACCESSOR(_entity, "globalname", v.globalname, GETSTR, SETSTR);
    ACCESSOR(_entity, "model", v.model, GETSTR, SETSTR);
    ACCESSOR(_entity, "netname", v.netname, GETSTR, SETSTR);
    ACCESSOR(_entity, "health", v.health, GETN, SETINT);
    ACCESSORL(_entity, "origin", v.origin, GETVEC3, SETVEC3);

    structures::entity.Set(isolate, _entity);
  }
}