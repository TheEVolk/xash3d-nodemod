import nodemodCore from './index.js';
import { MsgDest } from './msg.js';

export default class NodemodUtil {
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
}