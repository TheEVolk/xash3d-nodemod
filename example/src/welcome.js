import nodemodCore from '@nodemod/core';

class Welcome {
  idsToSpawnWait = {};

  constructor() {
    nodemodCore.resource.precacheSound('welcome.wav');
    nodemod.on('postDllClientPutInServer', entity => setTimeout(
      () => nodemodCore.sound.emitClientSound(entity, 'welcome'),
      3e3
    ));
  }
}

const welcome = new Welcome();