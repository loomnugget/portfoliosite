'use strict';

// npm modules
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser').json();
const dotenv = require('dotenv');
//const createError = require('http-errors');
const cors = require('cors');
const debug = require('debug')('devportfolio:server');
const nodemailer = require('nodemailer');

// Create Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'claufadayas@gmail.com',
    pass: 'ghlaqvdaqhgjdxlc',
  },
});

dotenv.load({path: `${__dirname}/.env`});
// Module constants
const PORT = process.env.PORT || 3000;
const app = express();

// app middleware
app.use(cors()); // allows anybody to use the app
app.use(morgan('dev'));

// app routes
app.use(express.static(`${__dirname}/build`));

app.post('/contact', bodyparser, function(req,res){
  debug('hit post /contact');
  debug('req.body', req.body);
  let message = {
    from: `${req.body.name} - ${req.body.email}`,
    to: 'claufadayas@gmail.com',
    subject: 'Message from Portfolio Website',
    text: req.body.message,
  };

  transporter.sendMail(message, (error, data) => {  // .sendMail(mailOptions, callback funtion)
    debug('message', message);
    if (error) return error.message;
    debug('Message sent successfully!', data);
    transporter.close();
  });
  res.json(message);
});

// start server
const server = module.exports = app.listen(PORT, function() {
  debug(`server up on port ${PORT}`);
});

server.isRunning = true;
