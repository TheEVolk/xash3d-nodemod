import nodemodCore from '@nodemod/core';

export default class RampageSounds {
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
      sound: '13blazeofglory',
      isFinal: true,
    }
  ];

  players = {};

  constructor() {
    nodemodCore.msg.on('post:DeathMsg', state => this.processDeath(...state.data));
    this.levels.forEach(v => (v.soundId = nodemodCore.resource.precacheSound(`rampage/${v.sound}.wav`)));
    nodemodCore.resource.precacheSound('rampage/tank.wav');
    nodemodCore.resource.precacheModel('sprites/dexplo.spr').then((id) => this.expId = id);
  }

  makeTank(entity) {
    nodemodCore.sound.emitSound({ entity, sound: 'rampage/tank.wav' });
    entity.health = 1000;

    nodemodCore.msg.send({
      type: 'ScreenFade',
      data: [
        { type: 'short', value: 1 << 10 },
        { type: 'short', value: 1 << 10 },
        { type: 'short', value: 0x0000 },
        { type: 'byte', value: 0 },
        { type: 'byte', value: 0 },
        { type: 'byte', value: 0 },
        { type: 'byte', value: 230 },
      ]
    });

    nodemodCore.msg.send({
      type: 'ScreenFade',
      entity,
      data: [
        { type: 'short', value: 1 << 10 },
        { type: 'short', value: 1 << 10 },
        { type: 'short', value: 0x0000 },
        { type: 'byte', value: 100 },
        { type: 'byte', value: 100 },
        { type: 'byte', value: 100 },
        { type: 'byte', value: 230 },
      ]
    });
     
    nodemodCore.msg.send({
      type: 23,
      dest: 0,
      data: [
        { type: 'byte', value: 101 },
        { type: 'coord', value: entity.origin[0] },
        { type: 'coord', value: entity.origin[1] },
        { type: 'coord', value: entity.origin[2] },
        { type: 'coord', value: 0 },
        { type: 'coord', value: 0 },
        { type: 'coord', value: 1000 },
        { type: 'byte', value: 70 },
        { type: 'byte', value: 1000 },
      ]
    });
  }

  processDeath(killerId, victimId) {
    const killer = nodemod.eng.pEntityOfEntIndex(killerId);

    const state = this.getOrCreatePlayerState(victimId);
    if (state.kills > 0) {
      nodemodCore.util.showHudText(victimId, `You have scored ${state.lifeKills} kills for this life.`);
      state.kills = 0;
      state.lifeKills = 0;
      state.campKills = 0;
    }

    if (killerId === 0 || killerId === victimId) {
      this.processSuicide(victimId);
      return;
    }

    if (killer.health <= 0) {
      if (state.isFinal) {
        nodemodCore.util.sendChat(`${killer.netname} убил финалиста и умер сам. Кина не будет.`);
      }

      return;
    }

    if (state.isFinal) {
      state.isFinal = false;
      nodemodCore.util.sendChat(`${killer.netname} убил финалиста и получил 1000 hp, спасайтесь кто может!`);
      this.makeTank(killer);
      return;
    }

    this.processKill(killerId, victimId);
  }

  processSuicide(victimId) {
    // todo: смех
  }

  processKill(killerId, victimId) {
    const killer = nodemod.eng.pEntityOfEntIndex(killerId);
    const state = this.getOrCreatePlayerState(killerId);
    state.lifeKills++;
    if (this.getNeededTime(state.kills) && Date.now() - state.lastKill > this.getNeededTime(state.kills) * 1e3) {
      state.lastKill = Date.now();
      state.kills = 1;
      return;
    }

    state.lastKill = Date.now();
    state.kills++;
    state.campKills++;

    if (state.origin && state.campKills >= 3) {
      const dist = this.getDist(killer.origin, state.origin);
      if (dist < Math.min(state.campKills * dist / 2, 20)) {
        nodemodCore.util.showHudText(killerId, `dist ${dist}, you camper)`);
        nodemod.eng.clientCommand(killer, `say "я закемпил уже ${state.campKills} челов, ищи меня по полоске крови)))"\n`);
        nodemodCore.msg.send({
          type: 23,
          dest: 0,
          data: [
            { type: 'byte', value: 101 },
            { type: 'coord', value: killer.origin[0] },
            { type: 'coord', value: killer.origin[1] },
            { type: 'coord', value: killer.origin[2] },
            { type: 'coord', value: 0 },
            { type: 'coord', value: 0 },
            { type: 'coord', value: 1000 },
            { type: 'byte', value: 70 },
            { type: 'byte', value: 1000 },
          ]
        });
      } else {
        state.campKills = 1;
      }
    }

    state.origin = killer.origin;

    const level = [...this.levels].reverse().find(v => v.from <= state.kills);
    if (!level) {
      return;
    }

    nodemodCore.util.showHudText(killerId, level.name);
    nodemodCore.sound.emitClientSound(killerId, `rampage/${level.sound}.wav`);

    if (state.isFinal || !level.isFinal) {
      return;
    }
    
    state.isFinal = true;
    nodemodCore.util.sendChat(`${nodemod.eng.pEntityOfEntIndex(killerId).netname} дошел до финала! Убей его и получи 1000 hp!`);
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
      lifeKills: 0,
      campKills: 0,
    };

    return this.players[playerId];
  }

  getDist(origin1, origin2) {
    const deltaX = origin2[0] - origin1[0];
    const deltaY = origin2[1] - origin1[1];
    const deltaZ = origin2[2] - origin1[2];

    const squaredDeltaX = deltaX * deltaX;
    const squaredDeltaY = deltaY * deltaY;
    const squaredDeltaZ = deltaZ * deltaZ;

    const sumOfSquaredDeltas = squaredDeltaX + squaredDeltaY + squaredDeltaZ;
    const distance = Math.sqrt(sumOfSquaredDeltas);

    return distance;
  }
}

