import nodemodCore from '@nodemod/core';

nodemodCore.msg.on('post:DeathMsg', state => {
  const [killerId, victimId] = state.data;
  if (killerId === 0 || killerId === victimId) {
    return;
  }

  nodemodCore.msg.send({
    type: 'ScreenFade',
    entity: killerId,
    data: [
      { type: 'short', value: 1 << 10 },
      { type: 'short', value: 1 << 10 },
      { type: 'short', value: 0x0000 },
      { type: 'byte', value: 100 },
      { type: 'byte', value: 0 },
      { type: 'byte', value: 100 },
      { type: 'byte', value: 230 },
    ]
  })
});