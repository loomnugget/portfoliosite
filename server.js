'use strict';

// npm modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const debug = require('debug')('portfolio:server');
const dotenv = require('dotenv');

// Load server environment variables
dotenv.load({path: `${__dirname}/.env`});

// Module constants
const PORT = process.env.PORT;
const app = express();

// app middleware
app.use(cors());
app.use(morgan('dev'));

// app routes
app.use(express.static(`${__dirname}/build`));

// start server
const server = module.exports = app.listen(PORT, function() {
  debug('server started');
  console.log('server up');
});

server.isRunning = true;
