#pragma once
#include <sstream>

enum class LogLevel
{
	LOG_ERROR = 0, // level 1
	LOG_WARN = 1, // level 2
	LOG_DEBUG = 2, // level 3
	LOG_INFO = 3, // level 4
	LOG_FULL = 4
};

#define L_INFO Log().Get(LogLevel::LOG_INFO)
#define L_DEBUG Log().Get(LogLevel::LOG_DEBUG)
#define L_WARN Log().Get(LogLevel::LOG_WARN)
#define L_ERROR Log().Get(LogLevel::LOG_ERROR)


class Log
{
public:
	static LogLevel logLevel;

	static void Init(LogLevel level);

	Log();
	virtual ~Log();
	std::ostringstream& Get(LogLevel level = LogLevel::LOG_INFO);

protected:
	std::ostringstream os;
private:
	LogLevel currentLevel;

	std::string GetLevelName(LogLevel messageLevel);
	Log(const Log&);
};