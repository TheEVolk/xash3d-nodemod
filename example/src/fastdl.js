import express from 'express';
import serve from 'express-static';

const app = express();

app.use(serve('./valve/custom'));

app.listen(8081);