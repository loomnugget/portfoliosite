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
    $http.post('/contact-form', data)
    .success(function(data, status, headers, config){
      $log.debug('success', data, status, headers, config);
    })
    .error(function(data, status, headers, config){
      $log.debug('error', data, status, headers, config);
    });
  };
}
