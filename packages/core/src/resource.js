export default class NodemodResource {
  listToPrecache = [];

  constructor() {
    nodemod.on('dllSpawn', () => {
      while (this.listToPrecache.length) {
        this.listToPrecache.pop()();
      }
    });
  }

  async precacheSound(path, cb = () => {}) {
    this.listToPrecache.push(() => {
      const id = nodemod.eng.precacheSound(path);
      console.log(path, id);
      cb(id);
    });
  }

  precacheModel(path) {
    return new Promise((resolve) => {
    this.listToPrecache.push(() => {
      const id = nodemod.eng.precacheModel(path);
      console.log(path, id);
      resolve(id);
    });
  });
  }
}