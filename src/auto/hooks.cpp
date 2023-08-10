  #include <extdll.h>
  #include "node/nodeimpl.hpp"
  #include "node/events.hpp"
  #include "meta_api.h"
  #include "node/utils.hpp"
  #include "structures/structures.hpp"

typedef void(TakeDamageFunc)(entvars_t* pevInflictor, entvars_t* pevAttacker, float flDamage, int bitsDamageType);
  
void hookTakedamage(entvars_t* pevInflictor, entvars_t* pevAttacker, float flDamage, int bitsDamageType) {
    SERVER_PRINT("::Takedamage(void) posthook!\n");
}

void subscribeTakedamage (edict_t* edict) {
  void* baseEntity = edict->pvPrivateData;
  TakeDamageFunc* methodPtr = *(reinterpret_cast<TakeDamageFunc**>(edict) + 11);
  // TakeDamageFunc method = *methodPtr;
  methodPtr = &hookTakedamage;
/*
    event::findAndCall("postEngPEntityOfEntIndexAllEntities", [=](v8::Isolate* isolate) {
      unsigned int v8_argCount = 1;
       v8::Local<v8::Value>* v8_args = new v8::Local<v8::Value>[1];
      v8_args[0] = v8::Number::New(isolate, iEntIndex); // iEntIndex (int)
      return std::pair<unsigned int, v8::Local<v8::Value>*>(v8_argCount, v8_args);
    });*/
  }

  void subscribeHamHooksEntity(edict_t* edict) {
    // subscribeTakedamage(edict);
  }

    void registerHamHooks()
    {
      // base
      event::register_event("ent:takedamage", "");
      // post
    }
  