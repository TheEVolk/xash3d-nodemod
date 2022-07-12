import nodemodCore from '@nodemod/core';

class Welcome {
  idsToSpawnWait = {};

  constructor() {
    nodemod.eng.precacheSound('welcome.wav');
    nodemod.on('postDllClientPutInServer', entity => setTimeout(
      () => nodemodCore.sound.emitClientSound(entity, 'welcome.wav'),
      3e3
    ));
  }
}

const welcome = new Welcome();