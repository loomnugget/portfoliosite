'use strict';

require('./_art-portfolio.scss');

module.exports = {
  template: require('./art-portfolio.html'),
  controller: ['$log', '$uibModal', ArtPortfolioController],
  controllerAs: 'artPortfolioCtrl',
};
function ArtPortfolioController($log, $uibModal){
  $log.debug('init artPortfolioCtrl');

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
      src: 'http://i65.tinypic.com/1z5kqcx.jpg',
      category: 'Acrylic',
    },
    {
      id: '2',
      title: 'Art 2',
      src: 'http://i63.tinypic.com/t66vsm.jpg',
      category: 'Acrylic',
    },
    {
      id: '3',
      title: 'Art 3',
      src: 'http://i64.tinypic.com/5l2jgm.jpg',
      category: 'Acrylic',
    },
    {
      id: '4',
      title: 'Art 4',
      src: 'http://i64.tinypic.com/2qa45kg.jpg',
      category: 'Acrylic',
    },
    {
      id: '5',
      title: 'Art 5',
      src: 'http://i64.tinypic.com/fz3spy.jpg',
    },
    {
      id: '6',
      title: 'Art 6',
      src: 'http://i64.tinypic.com/2j2g9kx.jpg',
    },
    {
      id: '7',
      title: 'Art 7',
      src: 'http://i66.tinypic.com/2zftwfs.jpg',
    },
    {
      id: '8',
      title: 'Art 8',
      src: 'http://i65.tinypic.com/35l51yv.jpg',
    },
    {
      id: '9',
      title: 'Art 9',
      src: 'http://i63.tinypic.com/14wpy6a.jpg',
    },
    {
      id: '10',
      title: 'Art 10',
      src: 'http://i63.tinypic.com/zmmv86.jpg',
    },
    {
      id: '11',
      title: 'Art 11',
      src: 'http://i67.tinypic.com/2q2og7t.jpg',
    },
    {
      id: '12',
      title: 'Art 12',
      src: 'http://i63.tinypic.com/2zdt444.jpg',
    },
    {
      id: '13',
      title: 'Art 13',
      src: 'http://i66.tinypic.com/15g5p9i.jpg',
    },
    {
      id: '14',
      title: 'Art 14',
      src: 'http://i67.tinypic.com/wve2oy.jpg',
    },
    {
      id: '15',
      title: 'Art 15',
      src: 'http://i67.tinypic.com/10x51fb.jpg',
    },
    {
      id: '16',
      title: 'Art 16',
      src: 'http://i66.tinypic.com/qso4n7.jpg',
    },
    {
      id: '17',
      title: 'Art 17',
      src: 'http://i65.tinypic.com/ww128k.jpg',
    },
    {
      id: '18',
      title: 'Art 18',
      src: 'http://i65.tinypic.com/24mzzh4.jpg',
    },
    {
      id: '19',
      title: 'Art 19',
      src: 'http://i64.tinypic.com/2d8ntx2.jpg',
    },

  ];
}
