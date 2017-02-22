'use strict';

require('./_footer.scss');

module.exports = {
  template: require('./footer.html'),
  controller: ['$log', '$location', FooterController],
  controllerAs: 'footerCtrl',
};

function FooterController($log, $location) {
  $log.debug('init footerCtrl');

  this.isActive = function(viewLocation) {
    console.log($location.path);
    return viewLocation === $location.path();
  };
}
