import express from 'express';
import { promises as fs } from 'fs';

/* In development */

class WebMap {
  constructor() {
    this.app = express();
    this.app.get('', async (req, res) => {
      res.send(await this.getFile());
    });
  }

  async getFile() {
    this.cache = this.cache || await fs.readFile('valve/addons/nodemod/assets/webmap.html').then(v => v.toString());
    return this.cache;
  }
}

const webmap = new WebMap();
export default webmap;