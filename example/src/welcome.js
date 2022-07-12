import nodemodCore from '@nodemod/core';

class Welcome {
  constructor() {
    nodemod.eng.precacheSound('welcome.wav');
    // nodemodCore.msg.on('post:dllClientPutInServer', entity => console.log(entity, 'зашел'));
    nodemod.on('postDllClientPutInServer', entity => nodemodCore.sound.emitClientSound(entity, 'welcome.wav'));
  }
}

const welcome = new Welcome();