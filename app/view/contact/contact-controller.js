'use strict';

require('./_contact.scss');

module.exports = ['$log', '$http', '$window', '$timeout', '$animate', ContactController];

function ContactController($log, $http, $window, $timeout) {
  $log.debug('init contactCtrl');

  //Create data object on the scope
  this.data = {};
  this.submitted = false;
  this.showSuccessMessage = false;

  this.reloadPage = function() {
    $window.location.reload();
  };

  // function called on form submit
  this.sendMail = function () {
    $log.debug('contactCtrl.sendMail()');

    // Form submit check
    this.submitted = true;

    // Send mail data!
    $http.post('/contact', this.data)
    .then(response => {
      $log.debug(response.data, response.status);
    })
    .then(() => {
      $timeout(this.reloadPage(), 5000);
      this.showSuccessMessage = true;
    })
    .catch(function onError(response) {
      return('error', response.data);
    });
  };
}
