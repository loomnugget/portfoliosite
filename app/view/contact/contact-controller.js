'use strict';

require('./_contact.scss');

module.exports = ['$log', ContactController];

function ContactController($log) {
  $log.debug('init contactCtrl');
}
