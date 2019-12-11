const express = require('express');
const helmet = require('helmet');
const carsRouter = require('./data/carsRouter');
const server = express();

server.use(helmet());
server.use(express.json());
server.use('./cars/carsRouter.js', carsRouter);
server.get('/', (req, res) => {
    res.send('<h1>Server is live!</h1>');
  });

module.exports = server;