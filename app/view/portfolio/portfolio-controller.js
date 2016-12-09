'use strict';

require('./_portfolio.scss');

module.exports = ['$log', PortfolioController];

function PortfolioController($log) {
  $log.debug('init portfolioCtrl');

  this.states = {};
  this.states.activeItem = 'item1';
  this.items = [
    {
      id: 'item1',
      title: 'Code Projects',
      url: 'http://i64.tinypic.com/mjsiep.jpg',
    },
    {
      id: 'item2',
      title: 'Art Projects',
      url: 'http://i67.tinypic.com/wve2oy.jpg',
    },
  ];

}
