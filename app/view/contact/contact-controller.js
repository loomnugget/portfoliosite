'use strict';

require('./_contact.scss');

module.exports = ['$log', '$http',ContactController];

function ContactController($log, $http) {
  $log.debug('init contactCtrl');

  //Create data object on the scope
  this.data = {};
  this.showSuccessMessage = false;

  // Called when submit button is pressed
  // If there are errors, show, ngMessages
  // if there are no errors, call sendMail() and show success message
  this.onSubmit = function(form) {
    if (form.$valid){
      $log.debug('Valid Form Submitted');
      this.sendMail();
      this.showSuccessMessage = true;
    }
  };

  this.sendMail = function() {
    $log.debug('contactCtrl.sendMail()');
    // Send mail data!
    $http.post('/contact', this.data)
    // return server response and status code
    .then(function(response) {
      $log.debug('Data object and status code', response.data, response.status);
      return(response.data, response.status);
    })
    .catch(function onError(response) {
      return('error', response.data);
    });
  };
}
