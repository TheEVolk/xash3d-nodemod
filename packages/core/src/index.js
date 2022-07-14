import NodemodCmd from './cmd.js';
import NodemodMenu from './menu.js';
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
  menu = new NodemodMenu();
}

const nodemodCore = new NodemodCore();
export default nodemodCore;