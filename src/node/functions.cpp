#include <utility>
#include <string>
#include "v8.h"
#include "functions.hpp"
#include "events.hpp"


static std::pair<std::string, v8::FunctionCallback> sampnodeSpecificFunctions[] =
{
	{ "on", event::on },
	{ "addEventListener", event::on },
	{ "addListener", event::on },
	{ "removeListener", event::remove_listener },
	{ "removeEventListener", event::remove_listener },
	//{ "fire", sampnode::event::fire },
	//{ "registerEvent", sampnode::event::register_event },
	//{ "callNative", sampnode::native::call },
	//{ "callNativeFloat", sampnode::native::call_float },
	//{ "callPublic", sampnode::callback::call },
	//{ "callPublicFloat", sampnode::callback::call_float },
	//{ "logprint", sampnode::functions::logprint }
};

namespace functions {
	void init(v8::Isolate* isolate, v8::Local<v8::ObjectTemplate>& global)
	{
		v8::Locker locker(isolate);
		v8::Local<v8::ObjectTemplate> nodemodObject = v8::ObjectTemplate::New(isolate);
		for (auto& routine : sampnodeSpecificFunctions)
		{
			nodemodObject->Set(v8::String::NewFromUtf8(isolate, routine.first.c_str(), v8::NewStringType::kNormal).ToLocalChecked(),
				v8::FunctionTemplate::New(isolate, routine.second));
		}

		global->Set(v8::String::NewFromUtf8(isolate, "nodemod", v8::NewStringType::kNormal).ToLocalChecked(), nodemodObject);
	}
}