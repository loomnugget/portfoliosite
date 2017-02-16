'use strict';

// npm modules
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
const debug = require('debug')('devportfolio:server');
const nodemailer = require('nodemailer');

// Create Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
    auth: {
      user: 'hidden',
      pass: 'hidden',
    },
});

// Module constants
const PORT = process.env.PORT || 3000;
const app = express();

// app middleware
app.use(cors()); // allows anybody to use the app
app.use(morgan('dev'));
app.use(bodyparser());

// app routes
app.use(express.static(`${__dirname}/build`));

app.post('/contact', function(req,res){
  debug('hit post /contact');
  console.log(req.body);
  // .sendMail(mailOptions, callback funtion)
  transporter.sendMail(
    {
      from: req.body.email,
      to: 'claudia.cedfeldt@gmail.com',
      subject: 'Message from Portfolio Website',
      text: req.body.message,
    },
  function(err, data){
    if (err) return err;
    return res.json(201, data);
  });
});

// start server
const server = module.exports = app.listen(PORT, function() {
  debug('server started');
});

server.isRunning = true;
