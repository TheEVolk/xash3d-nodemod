// This file builded by: node scripts/buildEvents.js
  #include <extdll.h>
  #include "node/nodeimpl.hpp"

    // pfnGameInit
  void  base_pfnGameInit (void ) {}

// pfnSpawn
  int  base_pfnSpawn (edict_t *pent ) {}

// pfnThink
  void  base_pfnThink (edict_t *pent ) {}

// pfnUse
  void  base_pfnUse (edict_t *pentUsed, edict_t *pentOther ) {}

// pfnTouch
  void  base_pfnTouch (edict_t *pentTouched, edict_t *pentOther ) {}

// pfnBlocked
  void  base_pfnBlocked (edict_t *pentBlocked, edict_t *pentOther ) {}

// pfnKeyValue
  void  base_pfnKeyValue (edict_t *pentKeyvalue, KeyValueData *pkvd ) {}

// pfnSave
  void  base_pfnSave (edict_t *pent, SAVERESTOREDATA *pSaveData ) {}

// pfnRestore
  int  base_pfnRestore (edict_t *pent, SAVERESTOREDATA *pSaveData, int globalEntity ) {}

// pfnSetAbsBox
  void  base_pfnSetAbsBox (edict_t *pent ) {}

// pfnSaveWriteFields
  void  base_pfnSaveWriteFields (SAVERESTOREDATA*, const char*, void*, TYPEDESCRIPTION*, int ) {}

// pfnSaveReadFields
  void  base_pfnSaveReadFields (SAVERESTOREDATA*, const char*, void*, TYPEDESCRIPTION*, int ) {}

// pfnSaveGlobalState
  void  base_pfnSaveGlobalState (SAVERESTOREDATA * ) {}

// pfnRestoreGlobalState
  void  base_pfnRestoreGlobalState (SAVERESTOREDATA * ) {}

// pfnResetGlobalState
  void  base_pfnResetGlobalState (void ) {}

// pfnClientConnect
  qboolean  base_pfnClientConnect (edict_t *pEntity, const char *pszName, const char *pszAddress, char szRejectReason[128] ) {}

// pfnClientDisconnect
  void  base_pfnClientDisconnect (edict_t *pEntity ) {}

// pfnClientKill
  void  base_pfnClientKill (edict_t *pEntity ) {}

// pfnClientPutInServer
  void  base_pfnClientPutInServer (edict_t *pEntity ) {}

// pfnClientCommand
  void  base_pfnClientCommand (edict_t *pEntity ) {}

// pfnClientUserInfoChanged
  void  base_pfnClientUserInfoChanged (edict_t *pEntity, char *infobuffer ) {}

// pfnServerActivate
  void  base_pfnServerActivate (edict_t *pEdictList, int edictCount, int clientMax ) {}

// pfnServerDeactivate
  void  base_pfnServerDeactivate (void ) {}

// pfnPlayerPreThink
  void  base_pfnPlayerPreThink (edict_t *pEntity ) {}

// pfnPlayerPostThink
  void  base_pfnPlayerPostThink (edict_t *pEntity ) {}

// pfnStartFrame
  void  base_pfnStartFrame () {
    nodeImpl.Tick();
  }

// pfnParmsNewLevel
  void  base_pfnParmsNewLevel (void ) {}

// pfnParmsChangeLevel
  void  base_pfnParmsChangeLevel (void ) {}

// pfnGetGameDescription
  const char * base_pfnGetGameDescription (void ) {}

// pfnPlayerCustomization
  void  base_pfnPlayerCustomization (edict_t *pEntity, customization_t *pCustom ) {}

// pfnSpectatorConnect
  void  base_pfnSpectatorConnect (edict_t *pEntity ) {}

// pfnSpectatorDisconnect
  void  base_pfnSpectatorDisconnect (edict_t *pEntity ) {}

// pfnSpectatorThink
  void  base_pfnSpectatorThink (edict_t *pEntity ) {}

// pfnSys_Error
  void  base_pfnSys_Error (const char *error_string ) {}

// pfnPM_Move
  void  base_pfnPM_Move (struct playermove_s *ppmove, qboolean server ) {}

// pfnPM_Init
  void  base_pfnPM_Init (struct playermove_s *ppmove ) {}

// pfnPM_FindTextureType
  char  base_pfnPM_FindTextureType (const char *name ) {}

// pfnSetupVisibility
  void  base_pfnSetupVisibility (struct edict_s *pViewEntity, struct edict_s *pClient, unsigned char **pvs, unsigned char **pas ) {}

// pfnUpdateClientData
  void  base_pfnUpdateClientData (const struct edict_s *ent, int sendweapons, struct clientdata_s *cd ) {}

// pfnAddToFullPack
  int  base_pfnAddToFullPack (struct entity_state_s *state, int e, edict_t *ent, edict_t *host, int hostflags, int player, unsigned char *pSet ) {}

// pfnCreateBaseline
  void  base_pfnCreateBaseline (int player, int eindex, struct entity_state_s *baseline, struct edict_s *entity, int playermodelindex, vec3_t player_mins, vec3_t player_maxs ) {}

// pfnRegisterEncoders
  void  base_pfnRegisterEncoders (void ) {}

// pfnGetWeaponData
  int  base_pfnGetWeaponData (struct edict_s *player, struct weapon_data_s *info ) {}

// pfnCmdStart
  void  base_pfnCmdStart (const edict_t *player, const struct usercmd_s *cmd, unsigned int random_seed ) {}

// pfnCmdEnd
  void  base_pfnCmdEnd (const edict_t *player ) {}

// pfnConnectionlessPacket
  int  base_pfnConnectionlessPacket (const struct netadr_s *net_from, const char *args, char *response_buffer, int *response_buffer_size ) {}

// pfnGetHullBounds
  int  base_pfnGetHullBounds (int hullnumber, float *mins, float *maxs ) {}

// pfnCreateInstancedBaselines
  void  base_pfnCreateInstancedBaselines (void ) {}

// pfnInconsistentFile
  int  base_pfnInconsistentFile (const struct edict_s *player, const char *filename, char *disconnect_message ) {}

// pfnAllowLagCompensation
  int  base_pfnAllowLagCompensation (void ) {}

    DLL_FUNCTIONS g_DllFunctionTable = {
      base_pfnGameInit,
base_pfnSpawn,
base_pfnThink,
base_pfnUse,
base_pfnTouch,
base_pfnBlocked,
base_pfnKeyValue,
base_pfnSave,
base_pfnRestore,
base_pfnSetAbsBox,
base_pfnSaveWriteFields,
base_pfnSaveReadFields,
base_pfnSaveGlobalState,
base_pfnRestoreGlobalState,
base_pfnResetGlobalState,
base_pfnClientConnect,
base_pfnClientDisconnect,
base_pfnClientKill,
base_pfnClientPutInServer,
base_pfnClientCommand,
base_pfnClientUserInfoChanged,
base_pfnServerActivate,
base_pfnServerDeactivate,
base_pfnPlayerPreThink,
base_pfnPlayerPostThink,
base_pfnStartFrame,
base_pfnParmsNewLevel,
base_pfnParmsChangeLevel,
base_pfnGetGameDescription,
base_pfnPlayerCustomization,
base_pfnSpectatorConnect,
base_pfnSpectatorDisconnect,
base_pfnSpectatorThink,
base_pfnSys_Error,
base_pfnPM_Move,
base_pfnPM_Init,
base_pfnPM_FindTextureType,
base_pfnSetupVisibility,
base_pfnUpdateClientData,
base_pfnAddToFullPack,
base_pfnCreateBaseline,
base_pfnRegisterEncoders,
base_pfnGetWeaponData,
base_pfnCmdStart,
base_pfnCmdEnd,
base_pfnConnectionlessPacket,
base_pfnGetHullBounds,
base_pfnCreateInstancedBaselines,
base_pfnInconsistentFile,
base_pfnAllowLagCompensation
    };
  