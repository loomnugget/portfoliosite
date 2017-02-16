'use strict';

// npm modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const debug = require('debug')('portfolio:server');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({});

// Module constants
const PORT = process.env.PORT || 3000;
const app = express();

// app middleware
app.use(cors()); // allows anybody to use the app
app.use(morgan('dev'));

// app routes
app.use(express.static(`${__dirname}/build`));
app.post('/contact', function(req,res){
  var data = req.body;
  // .sendMail(mailOptions, callback funtion)
  transporter.sendMail(
    {
      from: data.email,
      to: 'claudia.cedfeldt@gmail.com',
      subject: 'Message from Portfolio Website',
      text: data.message,
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
