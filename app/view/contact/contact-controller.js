'use strict';

require('./_contact.scss');

module.exports = ['$log', '$http', '$animate', ContactController];

function ContactController($log, $http) {
  $log.debug('init contactCtrl');

  // function called on form submit
  this.sendMail = function () {
    $log.debug('contactCtrl.sendMail()');
    //ng-models are put into the data object to be sent to the server
    var data = ({
      name : this.name,
      email : this.email,
      message : this.message,
    });

    // send form inputs to the endpoint '/contact-form' with the data
    $http.post('/contact', data);
    // .success(function(data) {
    //   $log.debug('success', data);
    // })
    // .error(function(data) {
    //   $log.debug('error', data);
    // });

  };
}
