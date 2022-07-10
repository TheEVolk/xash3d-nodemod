import NodemodMsg from './msg.js';
import NodemodUtil from './util.js';

class NodemodCore {
  msg = new NodemodMsg();
  util = new NodemodUtil();
}

const nodemodCore = new NodemodCore();
export default nodemodCore;