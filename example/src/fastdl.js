import express from 'express';
import serve from 'express-static';

const app = express();

app.use(serve('./valve/custom'));
app.get(/maps\/*/, serve('./valve'));
app.get(/sound\/*/, serve('./valve'));
app.get(/gfx\/*/, serve('./valve'));
app.get(/models\/*/, serve('./valve'));
app.get(/overviews\/*/, serve('./valve'));
app.get(/sprites\/*/, serve('./valve'));
app.get(/.+\.wad/, serve('./valve'));

app.listen(8081);