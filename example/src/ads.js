import nodemodCore from '@nodemod/core';

/*
  Вы можете как угодно манипулировать сообщениями.
  import ads from './ads.js';
  ads.list = ['Это теперь мои новые сообщения'];
  ads.push(
    'ляляля1',
    'Дядя Миша лучший'
  );
*/

class Ads {
  list = [
    'На сервере используется nodemod: ^5https://github.com/theevolk/xash3d-nodemod',
    'Посети нашу тему на форуме hlfx: ^5https://vk.cc/ceZHMr'
  ];

  constructor() {
    setInterval(() => {
      const ad = this.list[Math.floor(Math.random() * this.list.length)];
      const text = typeof ad === 'string' ? ad : ad();
      nodemodCore.util.sendChat(text);
    }, 1e3 * 300);
  }
}

const ads = new Ads();
export default ads;