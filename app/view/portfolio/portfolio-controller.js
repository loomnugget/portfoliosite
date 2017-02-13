'use strict';

require('./_portfolio.scss');

module.exports = ['$log', '$uibModal', PortfolioController];

function PortfolioController($log, $uibModal){
  $log.debug('init portfolioCtrl');

  this.open = function(item) {
    let modalInstance = $uibModal.open({
      component: 'modal',
      size: 'lg',
      resolve: {
        imageToggle: function() {
          return item;
        },
      },
    });

    return modalInstance;
  };

  this.items = [
    {
      id: '1',
      title: 'Art 1',
      url: 'http://i65.tinypic.com/1z5kqcx.jpg',
      category: 'Painting',
    },
    {
      id: '2',
      title: 'Art 2',
      url: 'http://i63.tinypic.com/t66vsm.jpg',
      category: 'Painting',
    },
    {
      id: '3',
      title: 'Art 3',
      url: 'http://i64.tinypic.com/5l2jgm.jpg',
      category: 'Painting',
    },
    {
      id: '4',
      title: 'Art 4',
      url: 'http://i64.tinypic.com/2qa45kg.jpg',
      category: 'Painting',
    },
    {
      id: '5',
      title: 'Art 5',
      url: 'http://i64.tinypic.com/fz3spy.jpg',
      category: 'Painting',
    },
    {
      id: '6',
      title: 'Art 6',
      url: 'http://i64.tinypic.com/2j2g9kx.jpg',
      category: 'Painting',
    },
    {
      id: '7',
      title: 'Art 7',
      url: 'http://i66.tinypic.com/2zftwfs.jpg',
      category: 'Painting',
    },
    {
      id: '8',
      title: 'Art 8',
      url: 'http://i65.tinypic.com/35l51yv.jpg',
      category: 'Drawing',
    },
    {
      id: '9',
      title: 'Art 9',
      url: 'http://i63.tinypic.com/14wpy6a.jpg',
      category: 'Drawing',
    },
    {
      id: '10',
      title: 'Art 10',
      url: 'http://i63.tinypic.com/zmmv86.jpg',
      category: 'Drawing',
    },
    {
      id: '11',
      title: 'Art 11',
      url: 'http://i67.tinypic.com/2q2og7t.jpg',
      category: 'Drawing',
    },
    {
      id: '12',
      title: 'Art 12',
      url: 'http://i63.tinypic.com/2zdt444.jpg',
      category: 'Drawing',
    },
    {
      id: '13',
      title: 'Art 13',
      url: 'http://i66.tinypic.com/15g5p9i.jpg',
      category: 'Drawing',
    },
    {
      id: '14',
      title: 'Art 14',
      url: 'http://i67.tinypic.com/wve2oy.jpg',
      category: 'Drawing',
    },
    {
      id: '15',
      title: 'Art 15',
      url: 'http://i67.tinypic.com/10x51fb.jpg',
      category: 'Drawing',
    },
    {
      id: '16',
      title: 'Art 16',
      url: 'http://i66.tinypic.com/qso4n7.jpg',
      category: 'Drawing',
    },
    {
      id: '17',
      title: 'Art 17',
      url: 'http://i65.tinypic.com/ww128k.jpg',
      category: 'Drawing',
    },
    {
      id: '18',
      title: 'Art 18',
      url: 'http://i65.tinypic.com/24mzzh4.jpg',
      category: 'Drawing',
    },
    {
      id: '19',
      title: 'Art 19',
      url: 'http://i64.tinypic.com/2d8ntx2.jpg',
      category: 'Drawing',
    },

  ];
}
