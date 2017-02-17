'use strict';

require('./_contact.scss');

module.exports = ['$log', '$http', '$window', '$timeout', ContactController];

function ContactController($log, $http, $window, $timeout) {
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
    }
  };

  this.sendMail = function() {
    $log.debug('contactCtrl.sendMail()');
    // Send mail data!
    $http.post('/contact', this.data)
    // return server response and status code
    .then(function(response) {
      $log.debug('data and status code', response.data, response.status);
      return(response.data, response.status);
    })
    // Show success message then reload page
    .then(() => {
      this.showSuccessMessage = true;
    //  $timeout(this.reloadPage(), 5000);
    })
    .catch(function onError(response) {
      return('error', response.data);
    });
  };
}
