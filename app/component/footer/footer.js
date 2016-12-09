'use strict';

require('./_footer.scss');

module.exports = {
  template: require('./footer.html'),
  controller: ['$log', '$location', '$rootScope', FooterController],
  controllerAs: 'footerCtrl',
};

function FooterController($log) {
  $log.debug('init footerCtrl');

}
