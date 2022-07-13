import NodemodCmd from './cmd.js';
import NodemodMsg from './msg.js';
import NodemodResource from './resource.js';
import NodemodSound from './sound.js';
import NodemodUtil from './util.js';

class NodemodCore {
  msg = new NodemodMsg();
  util = new NodemodUtil();
  sound = new NodemodSound();
  cmd = new NodemodCmd();
  resource = new NodemodResource();
}

const nodemodCore = new NodemodCore();
export default nodemodCore;

// Вот эту тему я приберег для генератора меню
/*hnodemodMsg.send({
    dest: options.entity ? MsgDest.one : MsgDest.all,
    type: 'ShowMenu',
    entity,
    data: [
      { type: 'short', value: options.slots },
      { type: 'char', value: options.time || -1 },
      {}
    ]
  });
  WRITE_SHORT(slots);
  WRITE_CHAR(time);
  WRITE_BYTE(c ? TRUE : FALSE);
  WRITE_STRING(menu);
  MESSAGE_END();*/