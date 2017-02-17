'use strict';

// npm modules
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser').json();
const dotenv = require('dotenv');
const cors = require('cors');
const debug = require('debug')('devportfolio:server');
const nodemailer = require('nodemailer');
const mailRouter = require('./route/mail-router.js');

// load environment variables
dotenv.load({path: `${__dirname}/.env`});

// Module constants
const PORT = process.env.PORT || 3000;
const app = express();

// app middleware
app.use(cors()); // allows anybody to use the app
app.use(morgan('dev'));

// app routes
app.use(express.static(`${__dirname}/build`));
app.use(mailRouter);

// start server
const server = module.exports = app.listen(PORT, function() {
  debug(`server up on port ${PORT}`);
});

server.isRunning = true;
