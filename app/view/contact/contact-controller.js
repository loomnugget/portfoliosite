'use strict';

require('./_contact.scss');

module.exports = ['$log', '$http', '$animate', ContactController];

function ContactController($log, $http) {
  $log.debug('init contactCtrl');

  //Create data object on the scope
  this.data = {};

  // function called on form submit
  this.sendMail = function () {
    $log.debug('contactCtrl.sendMail()');
    $http.post('/contact', this.data);
    $log.debug('data', this.data);
    // .success(function(data) {
    //   $log.debug('success', data);
    // })
    // .error(function(data) {
    //   $log.debug('error', data);
    // });

  };
}
