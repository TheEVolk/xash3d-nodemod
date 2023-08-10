#include <utility>
#include <string>
#include "v8.h"
#include "functions.hpp"
#include "events.hpp"


extern v8::Local<v8::ObjectTemplate> registerEngineFunctions(v8::Isolate* isolate);
extern void getUserMsgId(const v8::FunctionCallbackInfo<v8::Value>& info);
extern void getUserMsgName(const v8::FunctionCallbackInfo<v8::Value>& info);
extern void setMetaResult(const v8::FunctionCallbackInfo<v8::Value>& info);
extern void continueHandler(const v8::FunctionCallbackInfo<v8::Value>& info);

static std::pair<std::string, v8::FunctionCallback> sampnodeSpecificFunctions[] =
{
	{ "on", event::on },
	{ "addEventListener", event::on },
	{ "addListener", event::on },
	{ "clearListeners", event::clearListeners },
	{ "removeListener", event::remove_listener },
	{ "removeEventListener", event::remove_listener },
	{ "getUserMsgId", getUserMsgId },
	{ "getUserMsgName", getUserMsgName },
	{ "setMetaResult", setMetaResult },
	{ "continue", continueHandler }
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

		nodemodObject->Set(
			v8::String::NewFromUtf8(isolate, "eng", v8::NewStringType::kNormal).ToLocalChecked(),
			registerEngineFunctions(isolate)
		);

		char oldCwd[PATH_MAX];
		getcwd(oldCwd, sizeof(oldCwd));
		nodemodObject->Set(
			v8::String::NewFromUtf8(isolate, "cwd", v8::NewStringType::kNormal).ToLocalChecked(),
			v8::String::NewFromUtf8(isolate, oldCwd, v8::NewStringType::kNormal).ToLocalChecked()
		);

		global->Set(v8::String::NewFromUtf8(isolate, "nodemod", v8::NewStringType::kNormal).ToLocalChecked(), nodemodObject);
	}
}