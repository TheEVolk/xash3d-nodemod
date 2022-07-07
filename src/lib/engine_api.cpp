#include <extdll.h>
#include <meta_api.h>

extern enginefuncs_t g_EngineFunctionsTable;
extern enginefuncs_t g_EngineFunctionsTable_Post;

C_DLLEXPORT int GetEngineFunctions(enginefuncs_t *pengfuncsFromEngine, int *interfaceVersion)
{
	if (!pengfuncsFromEngine) {
		ALERT(at_logged, "%s called with null pengfuncsFromEngine", __FUNCTION__);
		return FALSE;
	}
	if (*interfaceVersion != ENGINE_INTERFACE_VERSION) {
		ALERT(at_logged, "%s version mismatch; requested=%d ours=%d", __FUNCTION__, *interfaceVersion, ENGINE_INTERFACE_VERSION);
		*interfaceVersion = ENGINE_INTERFACE_VERSION;
		return FALSE;
	}

	memcpy(pengfuncsFromEngine, &g_EngineFunctionsTable, sizeof(enginefuncs_t));
	return TRUE;
}

C_DLLEXPORT int GetEngineFunctions_Post(enginefuncs_t *pengfuncsFromEngine, int *interfaceVersion)
{
	if (!pengfuncsFromEngine) {
		ALERT(at_logged, "%s called with null pengfuncsFromEngine", __FUNCTION__);
		return FALSE;
	}
	if (*interfaceVersion != ENGINE_INTERFACE_VERSION) {
		ALERT(at_logged, "%s version mismatch; requested=%d ours=%d", __FUNCTION__, *interfaceVersion, ENGINE_INTERFACE_VERSION);
		*interfaceVersion = ENGINE_INTERFACE_VERSION;
		return FALSE;
	}

	memcpy(pengfuncsFromEngine, &g_EngineFunctionsTable_Post, sizeof(enginefuncs_t));
	return TRUE;
}
