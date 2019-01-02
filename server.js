'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

//EJS Template
app.set('views', `${__dirname}/views`);
app.set(`view engine`, `ejs`);

//static routes
app.use(express.static(`${__dirname}/public`));

//middleware
app.use(express.json());

//routes
app.get('/', (req, res)=>{
  res.send('<h1>Hello /</h1>');
});

app.post('/save', (req, res) =>{
  res.json(req.body);
});

app.get('/err', (req, res, next) => {
  next(`This is an error`);
});

app.get('*', (req, res)=>{
  res.status(404);
  res.statusMessage = 'Not Found';
  res.render('not-found', {request: req});
});

app.use((err, req, res, next )=>{
  res.status(500);
  res.statusMessage = 'Server Error';
  res.render('error', {request: req, error: err});
});

app.listen(PORT, () => console.log('Server up on 8000'));