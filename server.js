'use strict';


const express = require('express');
const app = express();


const PORT = process.env.PORT || 8000;


app.set('views', `./views`);
app.set(`view engine`, `ejs`);


app.use(express.static(`/public`));

app.use(express.json());

app.get('/', (req, res)=>{
  res.send('<h1> hello world /</h1>');
});

app.post('/save', (req, res) =>{
  res.json(req.body);
});

app.get('/err', (req, res, next) => {
  next(`error`);
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