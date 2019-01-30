'use strict';

const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.use(express.json());

app.get('/', (req, res) =>{
  res.send('<h1>Hello</h1>');
});

app.post('/save', (req, res) => {
  res.json(req.body);
});

app.get('/err', (req, res, next) => {
  next('Error');
});

app.get('*', (req, res) => {
  res.status(404);
  res.statusMessage = 'notfound';
  res.render('not-found', {request: req});
});

app.use((err, req, res, next) => {
  res.status(500);
  res.statusMessage = 'Server Error';
  res.render('error', {request: req, error: err});
});

module.exports = {
  server: app,
  start: () => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`server up on ${PORT}`));
  },
};
