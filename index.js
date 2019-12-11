const express = require('express');
const helmet = require('helmet');
// const server = express();
const server = require('./server.js');
const carsRouter = require('./data/carsRouter');


server.use(helmet());
server.use(express.json());

server.use('/api/cars', carsRouter);


const PORT = process.env.PORT || 4400;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = server;