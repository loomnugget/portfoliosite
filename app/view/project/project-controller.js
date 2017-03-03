'use strict';

require('./_project.scss');

module.exports = ['$log', ProjectController];

function ProjectController($log) {
  $log.debug('init projectCtrl');

  this.isVisible1 = false;
  this.isVisible2 = false;
  this.isVisible3 = false;

  this.isActive = false;

  this.items = [
    {
      id: 1,
      title: 'PupTracker',
      category: 'JavaScript',
      summary: 'App for research scientists to track mouse breeding',
      url: 'http://i65.tinypic.com/24mzzh4.jpg',
    },
    {
      id: 2,
      title: '3D Engine',
      category: 'JavaScript',
      summary: 'interactive 3D physics engine',
      url: 'http://i65.tinypic.com/24mzzh4.jpg',
    },
    {
      id: 3,
      title: 'Art-C',
      category: 'JavaScript',
      summary: 'Social media platform for artists',
      url: 'http://i65.tinypic.com/24mzzh4.jpg',
    },
  ];

  this.selectItem = function(item) {
    if(item === 1) {
      this.isVisible1 = true;
      this.isVisible2 = false;
      this.isVisible3 = false;
      this.isActive = true;
    }
    if(item === 2) {
      this.isVisible2 = true;
      this.isVisible1 = false;
      this.isVisible3 = false;
      this.isActive = true;
    }
    if(item === 3) {
      this.isVisible3 = true;
      this.isVisible1 = false;
      this.isVisible2 = false;
      this.isActive = true;
    }
  };

}
