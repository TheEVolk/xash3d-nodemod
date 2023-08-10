import EventEmmiter from 'node:events';
import nodemodCore from './index.js';

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

export const MsgTypes = {
  bad: 0,
  nop: 1,
  disconnect: 2,
  event: 3,
  version: 4,
  setview: 5,
  sound: 6,
  time: 7,
  print: 8,
  stufftext: 9,
  setangle: 10,
  serverinfo: 11,
  lightstyle: 12,
  updateuserinfo: 13,
  deltadescription: 14,
  clientdata: 15,
  stopsound: 16,
  pings: 17,
  particle: 18,
  damage: 19,
  spawnstatic: 20,
  event_reliable: 21,
  spawnbaseline: 22,
  tempentity: 23,
  setpause: 24,
  signonnum: 25,
  centerprint: 26,
  killedmonster: 27,
  foundsecret: 28,
  spawnstaticsound: 29,
  intermission: 30,
  finale: 31,
  cdtrack: 32,
  restore: 33,
  cutscene: 34,
  weaponanim: 35,
  decalname: 36,
  roomtype: 37,
  addangle: 38,
  newusermsg: 39,
  packetentities: 40,
  deltapacketentities: 41,
  choke: 42,
  resourcelist: 43,
  newmovevars: 44,
  resourcerequest: 45,
  customization: 46,
  crosshairangle: 47,
  soundfade: 48,
  filetxferfailed: 49,
  hltv: 50,
  director: 51,
  voiceinit: 52,
  voicedata: 53,
  sendextrainfo: 54,
  timescale: 55,
  resourcelocation: 56,
  sendcvarvalue: 57,
  sendcvarvalue2: 58
}

export default class NodemodMsg extends EventEmmiter {
  state = null;
  registeredEventTypes = {};
  writers = {
    byte: v => nodemod.eng.writeByte(v),
    char: v => nodemod.eng.writeChar(v),
    short: v => nodemod.eng.writeShort(v),
    long: v => nodemod.eng.writeLong(v),
    angle: v => nodemod.eng.writeAngle(v),
    coord: v => nodemod.eng.writeCoord(v),
    string: v => nodemod.eng.writeString(v || ''),
    entity: v => nodemod.eng.writeEntity(typeof v === 'number' ? nodemod.eng.indexOfEdict(v) : v),
  };

  constructor() {
    super();
    this.on('newListener', (eventName) => this.getUserMsgId(eventName.replace(/^post:/, '')));

    nodemod.on('engMessageBegin', (msg_dest, msg_type, origin, entity) => {
      const name = nodemod.getUserMsgName(msg_type);
      if (!this.listeners(name).length && !this.listeners(`post:${name}`).length) {
        return;
      }

      this.state = { dest: msg_dest, type: msg_type, name, origin, entity, data: [], rawData: [] };
    });

    // POST потому что кодер захочет сразу из уведа прислать новое сообщенице
    nodemod.on('engMessageEnd', () => {
      if (!this.state) {
        return;
      }

      const state = this.state;
      this.emit(state.name, state);

      this.state.isMessageEnd = true; // чтобы методы записи не вызвались повторно
      this.state.rawData.map(v => this.writers[v.type](v.value));
      this.state.data = this.state.rawData.map(v => v.value);
    });

    nodemod.on('postEngMessageEnd', () => {
      if (!this.state) {
        return;
      }

      const state = this.state;
      delete this.state;

      this.emit(`post:${state.name}`, state);
    });

    nodemod.on('engWriteByte', v => this.writeValue(v || 0, 'byte'));
    nodemod.on('engWriteChar', v => this.writeValue(v || '', 'char'));
    nodemod.on('engWriteShort', v => this.writeValue(v || 0, 'short'));
    nodemod.on('engWriteLong', v => this.writeValue(v || 0, 'long'));
    nodemod.on('engWriteAngle', v => this.writeValue(v || 0, 'angle'));
    nodemod.on('engWriteCoord', v => this.writeValue(v || 0, 'coord'));
    nodemod.on('engWriteString', v => this.writeValue(v || '', 'string'));
    nodemod.on('engWriteEntity', v => this.writeValue(v, 'entity'));
  }

  writeValue(value, type) {
    if (!this.state || this.state.isMessageEnd) {
      nodemod.setMetaResult(0);
      return;
    }

    this.state.data.push(value);
    this.state.rawData.push({ type, value });
    nodemod.setMetaResult(/* nodemod.mres.ignored */4);
  }

  register(eventName, size = -1) {
    const eventId = nodemod.getUserMsgId(eventName) ?? nodemod.eng.regUserMsg(eventName, size);
    this.registeredEventTypes[eventId] = eventName;

    return eventId;
  }

  getUserMsgId(name, size = -1) {
    const entrie = Object.entries(this.registeredEventTypes).find(v => v[1] === name);
    return entrie ? entrie[0] : this.register(name, size);
  }

  send(options) {
    nodemod.eng.messageBegin(
      options.dest ?? (options.entity ? MsgDest.one : MsgDest.all),
      typeof options.type === 'string' ? this.getUserMsgId(options.type) : options.type,
      options.origin || [0, 0, 0],
      nodemodCore.util.forceEntityObject(options.entity)
    );

    options.data.map(v => this.writers[v.type](v.value));
    nodemod.eng.messageEnd();
  }
}