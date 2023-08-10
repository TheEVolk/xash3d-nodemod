import nodemodCore from './index.js';

export const SoundChannel = {
  auto: 0,
  weapon: 1,
  voice: 2,
  item: 3,
  body: 4,
  stream: 5,
  static: 6,
  networkVoiceBase: 7,
  networkVoiceEnd: 500
};

export default class NodemodSound {
  emitSound(options) {
    nodemod.eng.emitSound(
      nodemodCore.util.forceEntityObject(options.entity) || 0,
      options.channel || 0,
      options.sound,
      1,
      1,
      0,
      options.pith || 100
    );
  }

  emitClientSound(entity, soundName) {
    console.log(soundName)
    nodemod.eng.clientCommand(nodemodCore.util.forceEntityObject(entity), `spk sound/${soundName}.wav\n`);
  }
}