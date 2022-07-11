import nodemodCore from '@nodemod/core';

class RampageSounds {
  levels = [
    {
      from: 2,
      name: 'Killing Spree',
      sound: '2killingspree'
    },
    {
      from: 3,
      name: 'Multi kill',
      sound: '3multikill'
    },
    {
      from: 4,
      name: 'Mega Kill',
      sound: '4megakill'
    },
    {
      from: 5,
      name: 'Rampage',
      sound: '5rampage'
    },
    {
      from: 6,
      name: 'Monster Kill',
      sound: '6monsterkill'
    },
    {
      from: 7,
      name: 'Ultra Kill',
      sound: '7ultrakill'
    },
    {
      from: 8,
      name: 'Holy Shit',
      sound: '8holyshit'
    },
    {
      from: 9,
      name: 'GodLike',
      sound: '9godlike'
    },
    {
      from: 10,
      name: 'Unstoppable',
      sound: '10unstoppable'
    },
    {
      from: 11,
      name: 'Ludacrisskill',
      sound: '11ludacrisskill'
    },
    {
      from: 12,
      name: 'Wicked Sick',
      sound: '12wickedsick'
    },
    {
      from: 13,
      name: 'Blaze Of Glory',
      sound: '13blazeofglory'
    }
  ];

  players = {};

  constructor() {
    nodemodCore.msg.on('post:DeathMsg', state => this.processDeath(...state.data));
    this.levels.forEach(v => (v.soundId = nodemod.eng.precacheSound(`rampage/${v.sound}.wav`)));
  }

  processDeath(killerId, victimId) {
    const state = this.getOrCreatePlayerState(victimId);
    if (state.kills > 0) {
      nodemodCore.util.showHudText(victimId, `You have scored ${state.lifeKills} kills for this life.`);
      state.kills = 0;
      state.lifeKills = 0;
    }

    if (killerId === 0 || killerId === victimId) {
      this.processSuicide(victimId);
      return;
    }

    this.processKill(killerId, victimId);
  }

  processSuicide(victimId) {
    // todo: смех
  }

  processKill(killerId, victimId) {
    const state = this.getOrCreatePlayerState(killerId);
    state.lifeKills++;
    if (Date.now() - state.lastKill > this.getNeededTime(state.kills) * 1e3) {
      state.lastKill = Date.now();
      state.kills = 1;
      return;
    }

    state.lastKill = Date.now();
    state.kills++;

    const level = [...this.levels].reverse().find(v => v.from <= state.kills);
    if (!level) {
      return;
    }

    nodemodCore.util.showHudText(killerId, level.name);
    nodemodCore.sound.emitClientSound(killerId, `rampage/${level.sound}.wav`);
  }

  getNeededTime(kills) {
    if (kills > 5) {
      return null;
    }

    return 10 * kills;
  }

  getOrCreatePlayerState(playerId) {
    this.players[playerId] = this.players[playerId] || {
      lastKill: Date.now(),
      kills: 0,
      lifeKills: 0
    };

    return this.players[playerId];
  }
}

const rampageSounds = new RampageSounds();