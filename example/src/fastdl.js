import express from 'express';
import serve from 'express-static';

class Fastdl {
  constructor() {
    this.app = express();
    this.app.get(/maps\/*/, serve('./valve'));
    this.app.get(/sound\/*/, serve('./valve'));
    this.app.get(/gfx\/*/, serve('./valve'));
    this.app.get(/models\/*/, serve('./valve'));
    this.app.get(/overviews\/*/, serve('./valve'));
    this.app.get(/sprites\/*/, serve('./valve'));
    this.app.get(/.+\.wad/, serve('./valve'));
    this.app.get(serve('./valve/custom'));
  }
}

const fastdl = new Fastdl();
export default fastdl;