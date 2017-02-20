'use strict';

const debug = require('debug')('devportfolio:server-control');

module.exports = exports = {};

exports.serverUp = function(server, done){
  if (!server.isRunning){
    debug('turning on server');
    server.listen(3000, () => {
      server.isRunning = true;
      done();
    });
    return;
  }
  done();
};

exports.serverDown = function(server, done){
  if (server.isRunning){
    debug('turning off server');
    server.close(err => {
      if (err) return done(err);
      server.isRunning = false;
      debug('server is off');
      done();
    });
    return;
  }
  done();
};
