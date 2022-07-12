import nodemodCore from '@nodemod/core';
import './ads.js';
import './blueFade.js';
import './fastdl.js';
import './rampageSounds.js';
import './vampirism.js';
import './welcome.js';

// Это пример работы с cmd
nodemodCore.cmd.add({
  type: 'client',
  name: 'say sh',
  handler: ctx => {
    nodemodCore.util.showHudText(
      ctx.client,
      `WTF BRO`,
      {
        r: 220,
        g: 50,
        b: 50,
        x: +ctx.args[2] ?? 4000,
        y: +ctx.args[3] ?? 4000,
      }
    );
  }
});