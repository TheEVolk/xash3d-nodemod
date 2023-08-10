import nodemodCore from '@nodemod/core';

export default class AntiSelfGaussPlugin {
  constructor() {
    nodemodCore.msg.on('ham:takedamage', this.handleDamage);
  }

  handleDamage() {
    console.log('ham:takedamage');
  }
}