
export default class NodemodResource {
  listToPrecache = [];

  constructor() {
    nodemod.on('dllSpawn', () => {
      this.listToPrecache.forEach(v => v());
    });
  }

  precacheSound(path) {
    this.listToPrecache.push(() => nodemod.eng.precacheSound(path));
  }
}