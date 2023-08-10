import nodemodCore from '@nodemod/core';
import express from 'express';
import './ads.js';
import './blueFade.js';
import fastdl from './fastdl.js';
import './serverMenu.js';
import './vampirism.js';
import webmap from './webmap.js';
import './welcome.js';

const expressApp = express();
expressApp.use('/fastdl', fastdl.app);
expressApp.get('/', (req, res) => {
  res.send('Hello World!')
})

expressApp.listen(80);
console.log('listen')

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

nodemodCore.cmd.add({
  type: 'client',
  name: 'say /i',
  handler: ctx => {
    nodemodCore.util.sendChat(`Your id: ${nodemod.eng.getPlayerAuthId(ctx.client)}`, ctx.client);
  }
});
