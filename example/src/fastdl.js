import express from 'express';
import serve from 'express-static';

class Fastdl {
  constructor() {
    this.app = express();
    this.app.get(/maps\/*/, serve('./valve_addon'), serve('./valve_addon'));
    this.app.get(/sound\/*/, serve('./valve_addon'), serve('./valve_addon'));
    this.app.get(/gfx\/*/, serve('./valve_addon'), serve('./valve_addon'));
    this.app.get(/models\/*/, serve('./valve_addon'), serve('./valve_addon'));
    this.app.get(/overviews\/*/, serve('./valve_addon'), serve('./valve_addon'));
    this.app.get(/sprites\/*/, serve('./valve_addon'), serve('./valve_addon'));
    this.app.get(/.+\.wad/, serve('./valve_addon'), serve('./valve_addon'));
  }
}

const fastdl = new Fastdl();
export default fastdl;