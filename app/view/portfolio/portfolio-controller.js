'use strict';

require('./_portfolio.scss');

module.exports = ['$log', '$uibModal', PortfolioController];

function PortfolioController($log, $uibModal){
  $log.debug('init portfolioCtrl');

  this.isActive1 = true;
  this.isActive2 = false;
  this.isActive3 = false;

  this.isActive = function(item) {
    if (item === 1) {
      this.isActive1 = true;
      this.isActive2 = false;
      this.isActive3 = false;
    }
    if (item === 2) {
      this.isActive1 = false;
      this.isActive2 = true;
      this.isActive3 = false;
    }
    if (item === 3) {
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = true;
    }
  };

  this.open = function(item) {
    let modalInstance = $uibModal.open({
      component: 'modal',
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
      id: '3',
      title: 'Abstract Flower',
      url: 'http://i63.tinypic.com/t66vsm.jpg',
      src: '../scss/lib/img/texture2.jpg',
      category: 'Drawing',
    },
    {
      id: '4',
      title: 'Ink Flowers',
      url: 'http://i63.tinypic.com/2zdt444.jpg',
      category: 'Painting',
    },
    {
      id: '6',
      title: 'Abstract Wall II',
      url: 'http://i64.tinypic.com/2qa45kg.jpg',
      category: 'Painting',
    },
    {
      id: '1',
      title: 'Abstract Circle',
      url: 'http://i66.tinypic.com/or54yq.jpg',
      category: 'Painting',
    },
    {
      id: '7',
      title: 'Marbling I',
      url: 'http://i64.tinypic.com/315fpc5.jpg',
      category: 'Painting',
    },
    {
      id: '8',
      title: 'Marbling II',
      url: 'http://i64.tinypic.com/fz3spy.jpg',
      // http://i66.tinypic.com/29o04fo.jpg
      category: 'Painting',
    },
    {
      id: '9',
      title: 'Abstract Ink',
      url: 'http://i64.tinypic.com/35mdqmu.jpg',
      category: 'Drawing',
    },
    {
      id: '10',
      title: 'Symmetry I',
      url: 'http://i64.tinypic.com/5l2jgm.jpg',
      category: 'Drawing',
    },
    {
      id: '11',
      title: 'Symmetry II',
      url: 'http://i65.tinypic.com/24mzzh4.jpg',
      category: 'Drawing',
    },
    {
      id: '12',
      title: 'Symmetry III',
      url: 'http://i66.tinypic.com/15g5p9i.jpg',
      category: 'Drawing',
    },
    {
      id: '13',
      title: 'Symmetry IV',
      url: 'http://i67.tinypic.com/10x51fb.jpg',
      category: 'Drawing',
    },
    {
      id: '14',
      title: 'Symmetry V',
      url: 'http://i66.tinypic.com/qso4n7.jpg',
      category: 'Drawing',
    },
    {
      id: '15',
      title: 'Leaves',
      url: 'http://i63.tinypic.com/15cf1ci.jpg',
      category: 'Painting',
    },
    {
      id: '16',
      title: 'Lines',
      url: 'http://i67.tinypic.com/2zp4ob8.jpg',
      category: 'Drawing',
    },
    {
      id: '17',
      title: 'Abstract',
      url: 'http://i64.tinypic.com/zv8zlj.jpg',
      category: 'Painting',
    },
    {
      id: '18',
      title: 'More Flowers',
      url: 'http://i66.tinypic.com/2uzz5zt.jpg',
      category: 'Painting',
    },
    {
      id: '19',
      title: 'More Roses',
      url: 'http://i68.tinypic.com/f50yn5.jpg',
      category: 'Painting',
    },
  ];
}
