// This file is generated automatically. Don't edit it.
declare class nodemod {
  static eng = {
    /** int	(*pfnPrecacheModel)( const char *s ); */
    precacheModel: (s) => unknown,
    /** int	(*pfnPrecacheSound)( const char *s ); */
    precacheSound: (s) => unknown,
    /** void	(*pfnSetModel)( edict_t *e, const char *m ); */
    setModel: (e, m) => unknown,
    /** int	(*pfnModelIndex)( const char *m ); */
    modelIndex: (m) => unknown,
    /** int	(*pfnModelFrames)( int modelIndex ); */
    modelFrames: (modelIndex) => unknown,
    /** void	(*pfnSetSize)( edict_t *e, const float *rgflMin, const float *rgflMax ); */
    setSize: (e, rgflMin, rgflMax) => unknown,
    /** void	(*pfnChangeLevel)( const char *s1, const char *s2 ); */
    changeLevel: (s1, s2) => unknown,
    /** void	(*pfnGetSpawnParms)( edict_t *ent ); */
    getSpawnParms: (ent) => unknown,
    /** void	(*pfnSaveSpawnParms)( edict_t *ent ); */
    saveSpawnParms: (ent) => unknown,
    /** float	(*pfnVecToYaw)( const float *rgflVector ); */
    vecToYaw: (rgflVector) => unknown,
    /** void	(*pfnVecToAngles)( const float *rgflVectorIn, float *rgflVectorOut ); */
    vecToAngles: (rgflVectorIn, rgflVectorOut) => unknown,
    /** void	(*pfnMoveToOrigin)( edict_t *ent, const float *pflGoal, float dist, int iMoveType ); */
    moveToOrigin: (ent, pflGoal, dist, iMoveType) => unknown,
    /** void	(*pfnChangeYaw)( edict_t* ent ); */
    changeYaw: (ent) => unknown,
    /** void	(*pfnChangePitch)( edict_t* ent ); */
    changePitch: (ent) => unknown,
    /** edict_t*	(*pfnFindEntityByString)( edict_t *pEdictStartSearchAfter, const char *pszField, const char *pszValue ); */
    findEntityByString: (pEdictStartSearchAfter, pszField, pszValue) => unknown,
    /** int	(*pfnGetEntityIllum)( edict_t* pEnt ); */
    getEntityIllum: (pEnt) => unknown,
    /** edict_t*	(*pfnFindEntityInSphere)( edict_t *pEdictStartSearchAfter, const float *org, float rad ); */
    findEntityInSphere: (pEdictStartSearchAfter, org, rad) => unknown,
    /** edict_t*	(*pfnFindClientInPVS)( edict_t *pEdict ); */
    findClientInPvs: (pEdict) => unknown,
    /** edict_t*	(*pfnEntitiesInPVS)( edict_t *pplayer ); */
    entitiesInPvs: (pplayer) => unknown,
    /** void	(*pfnMakeVectors)( const float *rgflVector ); */
    makeVectors: (rgflVector) => unknown,
    /** void	(*pfnAngleVectors)( const float *rgflVector, float *forward, float *right, float *up ); */
    angleVectors: (rgflVector, forward, right, up) => unknown,
    /** edict_t*	(*pfnCreateEntity)( void ); */
    createEntity: () => unknown,
    /** void	(*pfnRemoveEntity)( edict_t* e ); */
    removeEntity: (e) => unknown,
    /** edict_t*	(*pfnCreateNamedEntity)( int className ); */
    createNamedEntity: (className) => unknown,
    /** void	(*pfnMakeStatic)( edict_t *ent ); */
    makeStatic: (ent) => unknown,
    /** int	(*pfnEntIsOnFloor)( edict_t *e ); */
    entIsOnFloor: (e) => unknown,
    /** int	(*pfnDropToFloor)( edict_t* e ); */
    dropToFloor: (e) => unknown,
    /** int	(*pfnWalkMove)( edict_t *ent, float yaw, float dist, int iMode ); */
    walkMove: (ent, yaw, dist, iMode) => unknown,
    /** void	(*pfnSetOrigin)( edict_t *e, const float *rgflOrigin ); */
    setOrigin: (e, rgflOrigin) => unknown,
    /** void	(*pfnEmitSound)( edict_t *entity, int channel, const char *sample, float volume, float attenuation, int fFlags, int pitch ); */
    emitSound: (entity, channel, sample, volume, attenuation, fFlags, pitch) => unknown,
    /** void	(*pfnEmitAmbientSound)( edict_t *entity, const float *pos, const char *samp, float vol, float attenuation, int fFlags, int pitch ); */
    emitAmbientSound: (entity, pos, samp, vol, attenuation, fFlags, pitch) => unknown,
    /** void	(*pfnTraceLine)( const float *v1, const float *v2, int fNoMonsters, edict_t *pentToSkip, TraceResult *ptr ); */
    traceLine: (v1, v2, fNoMonsters, pentToSkip, ptr) => unknown,
    /** void	(*pfnTraceToss)( edict_t* pent, edict_t* pentToIgnore, TraceResult *ptr ); */
    traceToss: (pent, pentToIgnore, ptr) => unknown,
    /** int	(*pfnTraceMonsterHull)( edict_t *pEdict, const float *v1, const float *v2, int fNoMonsters, edict_t *pentToSkip, TraceResult *ptr ); */
    traceMonsterHull: (pEdict, v1, v2, fNoMonsters, pentToSkip, ptr) => unknown,
    /** void	(*pfnTraceHull)( const float *v1, const float *v2, int fNoMonsters, int hullNumber, edict_t *pentToSkip, TraceResult *ptr ); */
    traceHull: (v1, v2, fNoMonsters, hullNumber, pentToSkip, ptr) => unknown,
    /** void	(*pfnTraceModel)( const float *v1, const float *v2, int hullNumber, edict_t *pent, TraceResult *ptr ); */
    traceModel: (v1, v2, hullNumber, pent, ptr) => unknown,
    /** const char *(*pfnTraceTexture)( edict_t *pTextureEntity, const float *v1, const float *v2 ); */
    traceTexture: (pTextureEntity, v1, v2) => unknown,
    /** void	(*pfnTraceSphere)( const float *v1, const float *v2, int fNoMonsters, float radius, edict_t *pentToSkip, TraceResult *ptr ); */
    traceSphere: (v1, v2, fNoMonsters, radius, pentToSkip, ptr) => unknown,
    /** void	(*pfnGetAimVector)( edict_t *ent, float speed, float *rgflReturn ); */
    getAimVector: (ent, speed, rgflReturn) => unknown,
    /** void	(*pfnServerCommand)( const char *str ); */
    serverCommand: (str) => unknown,
    /** void	(*pfnServerExecute)( void ); */
    serverExecute: () => unknown,
    /** void	(*pfnClientCommand)( edict_t* pEdict, const char *szFmt, ... ); */
    undefined,
    /** void	(*pfnParticleEffect)( const float *org, const float *dir, float color, float count ); */
    particleEffect: (org, dir, color, count) => unknown,
    /** void	(*pfnLightStyle)( int style, const char *val ); */
    lightStyle: (style, val) => unknown,
    /** int	(*pfnDecalIndex)( const char *name ); */
    decalIndex: (name) => unknown,
    /** int	(*pfnPointContents)( const float *rgflVector ); */
    pointContents: (rgflVector) => unknown,
    /** void	(*pfnMessageBegin)( int msg_dest, int msg_type, const float *pOrigin, edict_t *ed ); */
    messageBegin: (msg_dest, msg_type, pOrigin, ed) => unknown,
    /** void	(*pfnMessageEnd)( void ); */
    messageEnd: () => unknown,
    /** void	(*pfnWriteByte)( int iValue ); */
    writeByte: (iValue) => unknown,
    /** void	(*pfnWriteChar)( int iValue ); */
    writeChar: (iValue) => unknown,
    /** void	(*pfnWriteShort)( int iValue ); */
    writeShort: (iValue) => unknown,
    /** void	(*pfnWriteLong)( int iValue ); */
    writeLong: (iValue) => unknown,
    /** void	(*pfnWriteAngle)( float flValue ); */
    writeAngle: (flValue) => unknown,
    /** void	(*pfnWriteCoord)( float flValue ); */
    writeCoord: (flValue) => unknown,
    /** void	(*pfnWriteString)( const char *sz ); */
    writeString: (sz) => unknown,
    /** void	(*pfnWriteEntity)( int iValue ); */
    writeEntity: (iValue) => unknown,
    /** void	(*pfnCVarRegister)( cvar_t *pCvar ); */
    cVarRegister: (pCvar) => unknown,
    /** float	(*pfnCVarGetFloat)( const char *szVarName ); */
    cVarGetFloat: (szVarName) => unknown,
    /** const char* (*pfnCVarGetString)( const char *szVarName ); */
    cVarGetString: (szVarName) => unknown,
    /** void	(*pfnCVarSetFloat)( const char *szVarName, float flValue ); */
    cVarSetFloat: (szVarName, flValue) => unknown,
    /** void	(*pfnCVarSetString)( const char *szVarName, const char *szValue ); */
    cVarSetString: (szVarName, szValue) => unknown,
    /** void	(*pfnAlertMessage)( ALERT_TYPE atype, const char *szFmt, ... ); */
    undefined,
    /** void	(*pfnEngineFprintf)( FILE *pfile, const char *szFmt, ... ); */
    undefined,
    /** void*	(*pfnPvAllocEntPrivateData)( edict_t *pEdict, int cb ); */
    pvAllocEntPrivateData: (pEdict, cb) => unknown,
    /** void*	(*pfnPvEntPrivateData)( edict_t *pEdict ); */
    pvEntPrivateData: (pEdict) => unknown,
    /** void	(*pfnFreeEntPrivateData)( edict_t *pEdict ); */
    freeEntPrivateData: (pEdict) => unknown,
    /** const char *(*pfnSzFromIndex)( int iString ); */
    szFromIndex: (iString) => unknown,
    /** int	(*pfnAllocString)( const char *szValue ); */
    allocString: (szValue) => unknown,
    /** struct entvars_s *(*pfnGetVarsOfEnt)( edict_t *pEdict ); */
    getVarsOfEnt: (pEdict) => unknown,
    /** edict_t*	(*pfnPEntityOfEntOffset)( int iEntOffset ); */
    pEntityOfEntOffset: (iEntOffset) => unknown,
    /** int	(*pfnEntOffsetOfPEntity)( const edict_t *pEdict ); */
    entOffsetOfPEntity: (pEdict) => unknown,
    /** int	(*pfnIndexOfEdict)( const edict_t *pEdict ); */
    indexOfEdict: (pEdict) => unknown,
    /** edict_t*	(*pfnPEntityOfEntIndex)( int iEntIndex ); */
    pEntityOfEntIndex: (iEntIndex) => unknown,
    /** edict_t*	(*pfnFindEntityByVars)( struct entvars_s* pvars ); */
    findEntityByVars: (pvars) => unknown,
    /** void*	(*pfnGetModelPtr)( edict_t* pEdict ); */
    getModelPtr: (pEdict) => unknown,
    /** int	(*pfnRegUserMsg)( const char *pszName, int iSize ); */
    regUserMsg: (pszName, iSize) => unknown,
    /** void	(*pfnAnimationAutomove)( const edict_t* pEdict, float flTime ); */
    animationAutomove: (pEdict, flTime) => unknown,
    /** void	(*pfnGetBonePosition)( const edict_t* pEdict, int iBone, float *rgflOrigin, float *rgflAngles ); */
    getBonePosition: (pEdict, iBone, rgflOrigin, rgflAngles) => unknown,
    /** void* (*pfnFunctionFromName)( const char *pName ); */
    functionFromName: (pName) => unknown,
    /** const char *(*pfnNameForFunction)( void *function ); */
    nameForFunction: (function) => unknown,
    /** void	(*pfnClientPrintf)( edict_t* pEdict, PRINT_TYPE ptype, const char *szMsg ); // JOHN: engine callbacks so game DLL can print messages to individual clients */
    clientPrintf: (pEdict, ptype, szMsg) => unknown,
    /** void	(*pfnServerPrint)( const char *szMsg ); */
    serverPrint: (szMsg) => unknown,
    /** const char *(*pfnCmd_Args)( void );		// these 3 added */
    cmdArgs: () => unknown,
    /** const char *(*pfnCmd_Argv)( int argc );		// so game DLL can easily */
    cmdArgv: (argc) => unknown,
    /** int	(*pfnCmd_Argc)( void );		// access client 'cmd' strings */
    cmdArgc: () => unknown,
    /** void	(*pfnGetAttachment)( const edict_t *pEdict, int iAttachment, float *rgflOrigin, float *rgflAngles ); */
    getAttachment: (pEdict, iAttachment, rgflOrigin, rgflAngles) => unknown,
    /** int	(*pfnRandomLong)( int lLow, int lHigh ); */
    randomLong: (lLow, lHigh) => unknown,
    /** float	(*pfnRandomFloat)( float flLow, float flHigh ); */
    randomFloat: (flLow, flHigh) => unknown,
    /** void	(*pfnSetView)( const edict_t *pClient, const edict_t *pViewent ); */
    setView: (pClient, pViewent) => unknown,
    /** float	(*pfnTime)( void ); */
    time: () => unknown,
    /** void	(*pfnCrosshairAngle)( const edict_t *pClient, float pitch, float yaw ); */
    crosshairAngle: (pClient, pitch, yaw) => unknown,
    /** byte*	(*pfnLoadFileForMe)( const char *filename, int *pLength ); */
    loadFileForMe: (filename, pLength) => unknown,
    /** void	(*pfnFreeFile)( void *buffer ); */
    freeFile: (buffer) => unknown,
    /** void	(*pfnEndSection)( const char *pszSectionName ); // trigger_endsection */
    endSection: (pszSectionName) => unknown,
    /** int	(*pfnCompareFileTime)( char *filename1, char *filename2, int *iCompare ); */
    compareFileTime: (filename1, filename2, iCompare) => unknown,
    /** void	(*pfnGetGameDir)( char *szGetGameDir ); */
    getGameDir: (szGetGameDir) => unknown,
    /** void	(*pfnCvar_RegisterVariable)( cvar_t *variable ); */
    cvarRegisterVariable: (variable) => unknown,
    /** void	(*pfnFadeClientVolume)( const edict_t *pEdict, int fadePercent, int fadeOutSeconds, int holdTime, int fadeInSeconds ); */
    fadeClientVolume: (pEdict, fadePercent, fadeOutSeconds, holdTime, fadeInSeconds) => unknown,
    /** void	(*pfnSetClientMaxspeed)( const edict_t *pEdict, float fNewMaxspeed ); */
    setClientMaxspeed: (pEdict, fNewMaxspeed) => unknown,
    /** edict_t	*(*pfnCreateFakeClient)( const char *netname ); // returns NULL if fake client can't be created */
    createFakeClient: (netname) => unknown,
    /** void	(*pfnRunPlayerMove)( edict_t *fakeclient, const float *viewangles, float forwardmove, float sidemove, float upmove, unsigned short buttons, byte impulse, byte msec ); */
    runPlayerMove: (fakeclient, viewangles, forwardmove, sidemove, upmove, buttons, impulse, msec) => unknown,
    /** int	(*pfnNumberOfEntities)( void ); */
    numberOfEntities: () => unknown,
    /** char*	(*pfnGetInfoKeyBuffer)( edict_t *e );			// passing in NULL gets the serverinfo */
    getInfoKeyBuffer: (e) => unknown,
    /** char*	(*pfnInfoKeyValue)( char *infobuffer, const char *key ); */
    infoKeyValue: (infobuffer, key) => unknown,
    /** void	(*pfnSetKeyValue)( char *infobuffer, const char *key, const char *value ); */
    setKeyValue: (infobuffer, key, value) => unknown,
    /** void	(*pfnSetClientKeyValue)( int clientIndex, char *infobuffer, const char *key, const char *value ); */
    setClientKeyValue: (clientIndex, infobuffer, key, value) => unknown,
    /** int	(*pfnIsMapValid)( const char *filename ); */
    isMapValid: (filename) => unknown,
    /** void	(*pfnStaticDecal)( const float *origin, int decalIndex, int entityIndex, int modelIndex ); */
    staticDecal: (origin, decalIndex, entityIndex, modelIndex) => unknown,
    /** int	(*pfnPrecacheGeneric)( const char *s ); */
    precacheGeneric: (s) => unknown,
    /** int	(*pfnGetPlayerUserId)( edict_t *e ); // returns the server assigned userid for this player.  useful for logging frags, etc.  returns -1 if the edict couldn't be found in the list of clients */
    getPlayerUserId: (e) => unknown,
    /** void	(*pfnBuildSoundMsg)( edict_t *entity, int channel, const char *sample, float volume, float attenuation, int fFlags, int pitch, int msg_dest, int msg_type, const float *pOrigin, edict_t *ed ); */
    buildSoundMsg: (entity, channel, sample, volume, attenuation, fFlags, pitch, msg_dest, msg_type, pOrigin, ed) => unknown,
    /** int	(*pfnIsDedicatedServer)( void );			// is this a dedicated server? */
    isDedicatedServer: () => unknown,
    /** cvar_t	*(*pfnCVarGetPointer)( const char *szVarName ); */
    cVarGetPointer: (szVarName) => unknown,
    /** unsigned int (*pfnGetPlayerWONId)( edict_t *e ); // returns the server assigned WONid for this player.  useful for logging frags, etc.  returns -1 if the edict couldn't be found in the list of clients */
    getPlayerWonId: (e) => unknown,
    /** void	(*pfnInfo_RemoveKey)( char *s, const char *key ); */
    infoRemoveKey: (s, key) => unknown,
    /** const char *(*pfnGetPhysicsKeyValue)( const edict_t *pClient, const char *key ); */
    getPhysicsKeyValue: (pClient, key) => unknown,
    /** void	(*pfnSetPhysicsKeyValue)( const edict_t *pClient, const char *key, const char *value ); */
    setPhysicsKeyValue: (pClient, key, value) => unknown,
    /** const char *(*pfnGetPhysicsInfoString)( const edict_t *pClient ); */
    getPhysicsInfoString: (pClient) => unknown,
    /** unsigned short (*pfnPrecacheEvent)( int type, const char*psz ); */
    precacheEvent: (type, psz) => unknown,
    /** void	(*pfnPlaybackEvent)( int flags, const edict_t *pInvoker, unsigned short eventindex, float delay, const float *origin, const float *angles, float fparam1, float fparam2, int iparam1, int iparam2, int bparam1, int bparam2 ); */
    playbackEvent: (flags, pInvoker, eventindex, delay, origin, angles, fparam1, fparam2, iparam1, iparam2, bparam1, bparam2) => unknown,
    /** unsigned char *(*pfnSetFatPVS)( const float *org ); */
    setFatPvs: (org) => unknown,
    /** unsigned char *(*pfnSetFatPAS)( const float *org ); */
    setFatPas: (org) => unknown,
    /** int	(*pfnCheckVisibility )( const edict_t *entity, unsigned char *pset ); */
    checkVisibility: (entity, pset) => unknown,
    /** void	(*pfnDeltaSetField)	( struct delta_s *pFields, const char *fieldname ); */
    deltaSetField: (pFields, fieldname) => unknown,
    /** void	(*pfnDeltaUnsetField)( struct delta_s *pFields, const char *fieldname ); */
    deltaUnsetField: (pFields, fieldname) => unknown,
    /** void	(*pfnDeltaAddEncoder)( const char *name, void (*conditionalencode)( struct delta_s *pFields, const unsigned char *from, const unsigned char *to ) ); */
    undefined,
    /** int	(*pfnGetCurrentPlayer)( void ); */
    getCurrentPlayer: () => unknown,
    /** int	(*pfnCanSkipPlayer)( const edict_t *player ); */
    canSkipPlayer: (player) => unknown,
    /** int	(*pfnDeltaFindField)( struct delta_s *pFields, const char *fieldname ); */
    deltaFindField: (pFields, fieldname) => unknown,
    /** void	(*pfnDeltaSetFieldByIndex)( struct delta_s *pFields, int fieldNumber ); */
    deltaSetFieldByIndex: (pFields, fieldNumber) => unknown,
    /** void	(*pfnDeltaUnsetFieldByIndex)( struct delta_s *pFields, int fieldNumber ); */
    deltaUnsetFieldByIndex: (pFields, fieldNumber) => unknown,
    /** void	(*pfnSetGroupMask)( int mask, int op ); */
    setGroupMask: (mask, op) => unknown,
    /** int	(*pfnCreateInstancedBaseline)( int classname, struct entity_state_s *baseline ); */
    createInstancedBaseline: (classname, baseline) => unknown,
    /** void	(*pfnCvar_DirectSet)( struct cvar_s *var, const char *value ); */
    cvarDirectSet: (var, value) => unknown,
    /** void	(*pfnForceUnmodified)( FORCE_TYPE type, const float *mins, const float *maxs, const char *filename ); */
    forceUnmodified: (type, mins, maxs, filename) => unknown,
    /** void	(*pfnGetPlayerStats)( const edict_t *pClient, int *ping, int *packet_loss ); */
    getPlayerStats: (pClient, ping, packet_loss) => unknown,
    /** void	(*pfnAddServerCommand)( const char *cmd_name, void (*function) (void) ); */
    undefined,
    /** qboolean	(*pfnVoice_GetClientListening)(int iReceiver, int iSender); */
    voiceGetClientListening: (iReceiver, iSender) => unknown,
    /** qboolean	(*pfnVoice_SetClientListening)(int iReceiver, int iSender, qboolean bListen); */
    voiceSetClientListening: (iReceiver, iSender, bListen) => unknown,
    /** const char *(*pfnGetPlayerAuthId)		( edict_t *e ); */
    getPlayerAuthId: (e) => unknown,
    /** void	*(*pfnSequenceGet)( const char *fileName, const char *entryName ); */
    sequenceGet: (fileName, entryName) => unknown,
    /** void	*(*pfnSequencePickSentence)( const char *groupName, int pickMethod, int *picked ); */
    sequencePickSentence: (groupName, pickMethod, picked) => unknown,
    /** int	(*pfnGetFileSize)( const char *filename ); */
    getFileSize: (filename) => unknown,
    /** unsigned int (*pfnGetApproxWavePlayLen)( const char *filepath ); */
    getApproxWavePlayLen: (filepath) => unknown,
    /** int	(*pfnIsCareerMatch)( void ); */
    isCareerMatch: () => unknown,
    /** int	(*pfnGetLocalizedStringLength)( const char *label ); */
    getLocalizedStringLength: (label) => unknown,
    /** void	(*pfnRegisterTutorMessageShown)( int mid ); */
    registerTutorMessageShown: (mid) => unknown,
    /** int	(*pfnGetTimesTutorMessageShown)( int mid ); */
    getTimesTutorMessageShown: (mid) => unknown,
    /** void	(*pfnProcessTutorMessageDecayBuffer)( int *buffer, int bufferLength ); */
    processTutorMessageDecayBuffer: (buffer, bufferLength) => unknown,
    /** void	(*pfnConstructTutorMessageDecayBuffer)( int *buffer, int bufferLength ); */
    constructTutorMessageDecayBuffer: (buffer, bufferLength) => unknown,
    /** void	(*pfnResetTutorMessageDecayData)( void ); */
    resetTutorMessageDecayData: () => unknown,
    /** void	(*pfnQueryClientCvarValue)( const edict_t *player, const char *cvarName ); */
    queryClientCvarValue: (player, cvarName) => unknown,
    /** void	(*pfnQueryClientCvarValue2)( const edict_t *player, const char *cvarName, int requestID ); */
    queryClientCvarValue2: (player, cvarName, requestID) => unknown,
    /** int	(*CheckParm)( char *parm, char **ppnext ); */
    checkParm: (parm, ppnext) => unknown
  };
};