import nodemodCore from './index.js';
import { MsgDest } from './msg.js';

export default class NodemodUtil {
  forceEntityId(entity) {
    if (!entity) {
      return null;
    }

    return typeof entity === 'number' ? entity : nodemod.eng.indexOfEdict(entity);
  }

  forceEntityObject(entity) {
    if (!entity) {
      return null;
    }

    return typeof entity === 'number' ? nodemod.eng.pEntityOfEntIndex(entity) : entity;
  }

  sendChat(message, target = null) {
    message.split('\n').forEach(value => nodemodCore.msg.send({
      dest: target ? MsgDest.one : MsgDest.all,
      type: 'SayText',
      data: [
        { type: 'byte', value: 0 },
        { type: 'string', value }
      ]
    }));
  }

  showHudText(entity, text) {
    if (Array.isArray(entity)) {
      return entity.map(v => this.showHudText(v, text));
    }

    nodemodCore.msg.send({
      type: 'HudText',
      data: [{ type: 'string', value: text }],
      entity
    });
  }

  rainbowizeString(text) {
    return text.split().map(v => `^${Math.floor(Math.random() * 10)}${v}`).join('');
  }
}