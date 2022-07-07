#include <string>
#include "v8.h"

static std::pair<std::string, v8::FunctionCallback> engineSpecificFunctions[] =
{
	{ "regUserMsg", sf_eng_pfnRegUserMsg }
};

// int(*pfnRegUserMsg)( const char *pszName, int iSize );
void sf_eng_pfnRegUserMsg(const v8::FunctionCallbackInfo<v8::Value>& info)
{
    v8::Locker locker(info.GetIsolate()); // todo: add Isolate::Scope
			v8::HandleScope scope(info.GetIsolate());
      
			v8::String::Utf8Value _str(info.GetIsolate(), info[0]);
			v8::Integer::IntegerValue _size(info.GetIsolate(), info[1]);

auto response = (*g_engfuncs.pfnRegUserMsg)(_str, _size);

  info.GetReturnValue().Set(v8::Number::New(info.GetIsolate(), response).ToLocalChecked());
}