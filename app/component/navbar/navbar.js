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
  this.items = [
    {
      id: 'item1',
      title: 'About',
      url: '#/about',
    },
    {
      id: 'item2',
      title: 'Art',
      url: '#/portfolio',
    },
    {
      id: 'item3',
      title: 'Projects',
      url: '#/projects',
    },
  ];
}
