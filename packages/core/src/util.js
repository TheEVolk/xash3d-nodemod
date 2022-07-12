import nodemodCore from './index.js';
import { MsgDest, MsgTypes } from './msg.js';

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
      entity: target,
      type: 'SayText',
      data: [
        { type: 'byte', value: 0 },
        { type: 'string', value }
      ]
    }));
  }

  showHudText(entity, text, options = null) {
    if (Array.isArray(entity)) {
      return entity.map(v => this.showHudText(v, text));
    }

    if (options) {
      nodemodCore.msg.send({
        type: MsgTypes.tempentity,
        dest: entity ? MsgDest.one_unreliable : MsgDest.broadcast,
        entity,
        data: [
          { type: 'byte', value: 29 },
          { type: 'byte', value: -1 }, // channel
          { type: 'short', value: options.x || 4000 },
          { type: 'short', value: options.y || 4000 },
          { type: 'byte', value: options.effect || 0 },
          { type: 'byte', value: options.r || 0 },
          { type: 'byte', value: options.g || 0 },
          { type: 'byte', value: options.b || 0 },
          { type: 'byte', value: 0 }, // a
          { type: 'byte', value: 255 },
          { type: 'byte', value: 255 },
          { type: 'byte', value: 250 },
          { type: 'byte', value: 0 },
          { type: 'short', value: 100 }, // fadein
          { type: 'short', value: 100 }, // fadeout
          { type: 'short', value: 800 }, // hold
          // { type: 'short', value: 29 }, // fxtime
          { type: 'string', value: text }
        ]
      });

      return;
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