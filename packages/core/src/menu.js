import nodemodCore from './index.js';

export default class NodemodMenu {
  menuStates = {};

  constructor() {
    nodemod.on('dllClientCommand', (client, text) => {
      const args = text.split(' ');
      if (args[0] !== 'menuselect') {
        return;
      }

      console.log(args)
      console.log(`Клиент ${client.netname} нажал кнопку в меню ${+args[1]}`);
      const state = this.menuStates[nodemod.eng.indexOfEdict(client)] || this.menuStates['all'];
      if (!state) {
        return;
      }

      state.used.push(nodemod.eng.indexOfEdict(client));
      if (!state.isAll) {
        delete this.menuStates[nodemod.eng.indexOfEdict(client)];
      }

      const handler = state.handlers[+args[1] - 1];
      if (!handler) {
        return;
      }

      nodemod.setMetaResult(4);
      handler(client);
    });
  }

  show(options) {
    this.menuStates[options.entity ? nodemod.eng.indexOfEdict(options.entity) : 'all'] = {
      handlers: options.items.map(v => v.handler),
      isAll: !options.entity,
      used: []
    };

    nodemodCore.msg.send({
      type: 'ShowMenu',
      entity: options.entity,
      data: [
        { type: 'short', value: options.items.reduce((acc, v, i) => acc + (v.handler ? (1 << i) : 0), 0) },
        { type: 'char', value: options.time || -1 },
        { type: 'byte', value: false }, // Зачем это?
        { type: 'string', value: `${options.title}\n${options.items.map((v, i) => `${i + 1}. ${v.name}`).join('\n')}` }
      ]
    });
  }
}