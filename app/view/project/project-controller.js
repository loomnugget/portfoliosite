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
      url: 'http://i66.tinypic.com/23wjdk.jpg',
    },
    {
      id: 2,
      title: '3D Engine',
      category: 'JavaScript',
      summary: 'Interactive 3D physics engine',
      url: 'http://i66.tinypic.com/2lwok6v.jpg',
    },
    {
      id: 3,
      title: 'Art-C',
      category: 'JavaScript',
      summary: 'Social media platform for artists',
      url: 'http://i65.tinypic.com/14tqvxe.jpg',
    },
    {
      id: 4,
      title: 'Green Key',
      category: 'Responsive Web Design',
      summary: 'Local landscaping business website redesign',
      url: 'http://i68.tinypic.com/2m61wm8.jpg',
    },
    {
      id: 5,
      title: 'Portfolio',
      category: 'Responsive Web Design',
      summary: 'Series of Portfolio Website Designs',
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
