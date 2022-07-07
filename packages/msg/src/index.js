import EventEmmiter from 'node:events';

export const MsgDest = {
  broadcast: 0, // Сообщение всем игрокам без гарантии доставки
  one: 1, // Сообщение одному игроку с гарантией доставки
  all: 2, // Сообщение с гарантией доставки всем игрокам
  init: 3, // Write to the init string
  pvs: 4, // Всем игрокам в зоне видимости точки
  pas: 5, // Всем игрокам в зоне слышимости
  pvs_r: 6, // Всем игрокам в зоне видимости точки с гарант.доставки
  pas_r: 7, // Всем игрокам в зоне слышимости с гарант.доставки
  one_unreliable: 8, // Сообщение одному игроку, без гарантии доставки
  spec: 9 // Сообщение всем HLTV proxy
}

export class HNodemodMsg extends EventEmmiter {
  state = null;
  registeredEventTypes = {};

  constructor() {
    super();
    nodemod.on('engMessageBegin', (msg_dest, msg_type, origin, entity) => {
      if (!this.registeredEventTypes[msg_type]) {
        this.state = null;
        return;
      }

      this.state = { dest: msg_dest, type: msg_type, origin, entity, data: [] };
    });

    nodemod.on('engMessageEnd', () => {
      if (!this.state) {
        return;
      }

      const eventName = this.registeredEventTypes[this.state.type];
      this.emit(eventName, this.state);
      delete this.state;
    });

    nodemod.on('engWriteByte', v => this.writeValue(v));
    nodemod.on('engWriteChar', v => this.writeValue(v));
    nodemod.on('engWriteShort', v => this.writeValue(v));
    nodemod.on('engWriteLong', v => this.writeValue(v));
    nodemod.on('engWriteAngle', v => this.writeValue(v));
    nodemod.on('engWriteCoord', v => this.writeValue(v));
    nodemod.on('engWriteString', v => this.writeValue(v));
    nodemod.on('engWriteEntity', v => this.writeValue(v));
  }

  writeValue(value) {
    if (!this.state) {
      return;
    }

    this.state.data.push(value);
  }

  register(eventName) {
    const eventId = nodemod.eng.regUserMsg(eventName, -1);
    this.registeredEventTypes[eventId] = eventName;
  }
}

const hnodemodMsg = new HNodemodMsg();
export default hnodemodMsg;