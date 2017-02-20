'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const nodemailer = require('nodemailer');
const debug = require('debug')('devportfolio:mail-router');

const mailRouter = module.exports = Router();

// Create Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'SECRET!',
    pass: 'SECRET!',
  },
});

mailRouter.post('/contact', jsonParser, function(req,res){
  debug('POST /contact');

  let message = {
    from: `${req.body.name} - ${req.body.email}`,
    to: 'claufadayas@gmail.com',
    subject: 'Message from Portfolio Website',
    text: req.body.message,
    // html:
  };

  transporter.sendMail(message, (error, info) => {
    debug('message', message);
    if (error) {
      debug('Error!', error);
    }
    else {
      debug('Message sent successfully!', info);
    }
    transporter.close();
  });
  res.json(message);
});
