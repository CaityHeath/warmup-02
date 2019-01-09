'use strict';
const express = require('express');
const app = express();

app.post('/save', (req, res) =>{
  res.json(req.body);
});

app.get('/err', (req, res, next) => {
  next(`This is an error`);
});
