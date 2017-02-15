'use strict';

// npm modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const debug = require('debug')('portfolio:server');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport();

// Module constants
const PORT = process.env.PORT || 3000;
const app = express();

// app middleware
app.use(cors()); // allows anybody to use the app
app.use(morgan('dev'));

// app routes
app.use(express.static(`${__dirname}/build`));

const router = express.Router();
app.use('/contact-form', router); //route to connect front to back end
router.post('/', sendMail);

function sendMail(req, res) {
  // Get request body
  var data = req.body;

  // Set up mail options
  transporter.sendMail({
    from: data.email,
    to: 'claudia.cedfeldt@gmail.com',
    subject: 'Message from Portfolio Website',
    text: data.message,
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  });
  res.json(data);
}

// start server
const server = module.exports = app.listen(PORT, function() {
  debug('server started');
});

server.isRunning = true;
