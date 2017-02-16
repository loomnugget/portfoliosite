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

    this.data = ({
      name : this.name,
      email : this.email,
      message : this.message,
    });

    // send form inputs to the endpoint '/contact-form' with the data
    $http.post('/contact', this.data);
    // .success(function(data) {
    //   $log.debug('success', data);
    // })
    // .error(function(data) {
    //   $log.debug('error', data);
    // });

  };
}
