import nodemodCore from '@nodemod/core';

class Vampirism {
  constructor() {
    nodemodCore.msg.on('post:DeathMsg', state => {
      const [killerId, victimId] = state.data;
      if (killerId === 0 || killerId === victimId) {
        return;
      }

      const hp = 2 + Math.floor(Math.random() * 15);
      const killer = nodemod.eng.pEntityOfEntIndex(killerId);
      // А вдруг он перед смертью гранату кинул и убил кого-то
      if (killer.health <= 0) {
        return;
      }

      killer.health += hp;
      nodemodCore.util.showHudText(
        killer,
        `+${hp}hp`,
        {
          r: 220,
          g: Math.floor(Math.random() * 20),
          b: Math.floor(Math.random() * 20),
          x: Math.floor(3000 + Math.random() * 2000),
          y: Math.floor(3000 + Math.random() * 2000),
        }
      );
    });
  }
}

const vampirism = new Vampirism();