
export default class NodemodCmd {
  commands = [];

  constructor() {
    nodemod.on('dllClientCommand', (client, rtext) => {
      const text = rtext.replace(/say "/, 'say ').replace(/"$/g, '');
      const args = text.split(' ');
      const ctx = { text, args, client };

      console.log('find command', text)
      const command = this.getCommand(text, 'client');
      if (!command) {
        return;
      }

      console.log('found command')
      nodemod.setMetaResult(4);
      return command.handler(ctx);
    });
  }

  getCommand(text, type) {
    return this.commands.find(v => text.startsWith(v.name) && v.type === type);
  }

  add(options) {
    this.commands.push(options);
  }
}