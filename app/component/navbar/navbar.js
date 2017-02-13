'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', NavbarController],
  controllerAs: 'navbarCtrl',
};

function NavbarController($log) {
  $log.debug('init navbarCtrl');

  this.states = {};
  // this.states.activeItem = 'item4';
  this.items = [
    {
      id: 'item2',
      title: 'About',
      url: '#/about',
    },
    {
      id: 'item3',
      title: 'Portfolio',
      url: '#/portfolio',
    },
  ];
}
