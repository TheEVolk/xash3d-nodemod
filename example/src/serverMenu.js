import nodemodCore from '@nodemod/core';

class ServerMenu {
  constructor() {
    nodemodCore.cmd.add({
      type: 'client',
      name: 'say /m',
      handler: ctx => this.openMenu(ctx.client)
    });
  }

  openMenu(entity) {
    nodemodCore.menu.show({
      entity,
      title: 'Main menu',
      items: [
        {
          name: 'Commands',
          handler: entity => this.openFastCommands(entity)
        },
        {
          name: 'Profile',
          handler: entity => this.openProfile(entity)
        },
        {
          name: 'Current game',
          handler: entity => this.openCurrentGame(entity)
        },
        {
          name: 'About us',
          handler: entity => this.openServerInfo(entity)
        }
      ]
    });
  }

  openFastCommands(entity) {
    nodemodCore.menu.show({
      entity,
      title: 'Commands',
      items: [
        {
          name: 'Kill me',
          handler: entity => nodemod.eng.clientCommand(entity, 'kill\n')
        },
        {
          name: 'No Hurt Mode',
          handler: entity => entity.health = 1
        },
        {
          name: 'Change map',
          handler: entity => nodemodCore.util.sendChat(`In dev`, entity)
        }
      ]
    });
  }

  openProfile(entity) {
    nodemodCore.util.sendChat(`Your id: ${nodemod.eng.getPlayerAuthId(entity)}`, entity);
  }

  openCurrentGame(entity) {
    nodemodCore.util.sendChat(`In dev`, entity)
  }

  openServerInfo(entity) {
    nodemodCore.util.sendChat(`In dev`, entity)
  }
}

const serverMenu = new ServerMenu();
export default serverMenu;