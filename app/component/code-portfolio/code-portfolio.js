'use strict';

require('./_code-portfolio.scss');

module.exports = {
  template: require('./code-portfolio.html'),
  controller: ['$log', '$location', '$rootScope', CodePortfolioController],
  controllerAs: 'codePortfolioCtrl',
};

function CodePortfolioController($log) {
  $log.debug('init codePortfolioCtrl');
}
