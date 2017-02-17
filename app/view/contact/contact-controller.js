'use strict';

require('./_contact.scss');

module.exports = ['$log', '$http', '$window', '$timeout', '$animate', ContactController];

function ContactController($log, $http, $window, $timeout) {
  $log.debug('init contactCtrl');

  //Create data object on the scope
  this.data = {};
  this.submitted = false;
  this.showSuccessMessage = false;

  // Called when submit button is pressed
  // If there are errors, show, ngMessages
  // if there are no errors, call sendMail() and show success message
  this.onSubmit = function() {
    $log.debug('contactCtrl.onSubmit()');

  };

  // Reload Contact Page after valid Submit
  this.reloadPage = function() {
    $log.debug('contactCtrl.reloadPage()');
    $window.location.reload();
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
      $timeout(this.reloadPage(), 5000);
    })
    .catch(function onError(response) {
      return('error', response.data);
    });
  };
}
