#import "v8.h"
#import "structures/structures.hpp"
#include "extdll.h"

extern globalvars_t   *gpGlobals;
extern enginefuncs_t	 g_engfuncs;

namespace players
{
  void getPlayers(v8::Local<v8::String> property, const v8::PropertyCallbackInfo<v8::Value>& info) {
    auto isolate = info.GetIsolate();
    v8::Locker locker(isolate);
    v8::HandleScope scope(isolate);

    edict_t* ents[gpGlobals->maxClients];
    int length = 0;
    for (int i = 0; i < gpGlobals->maxClients; i++) {
      edict_t* entity = (*g_engfuncs.pfnPEntityOfEntIndex)(i + 1);
      if ((*g_engfuncs.pfnGetPlayerUserId)(entity) <= 0) {
        continue;
      }

      ents[length++] = entity;
    }

    v8::Local<v8::Array> array = v8::Array::New(isolate, length);
    for (int i = 0; i < length; i++) {
      array->Set(isolate->GetCurrentContext(), i, structures::wrapEntity(isolate, ents[i]));
    }

    info.GetReturnValue().Set(array);
  }
}