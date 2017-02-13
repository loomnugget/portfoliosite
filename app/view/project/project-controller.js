'use strict';

require('./_project.scss');

module.exports = ['$log', ProjectController];

function ProjectController($log) {
  $log.debug('init projectCtrl');

  this.isVisible1 = false;
  this.isVisible2 = false;
  this.isVisible3 = false;

  this.states = {};
  this.states.activeItem = 'item1';
  this.items = [
    {
      id: 'item1',
      title: 'Puptracker',
    },
    {
      id: 'item2',
      title: '3D Engine',
    },
    {
      id: 'item3',
      title: 'Art-C',
    },
  ];
  this.selectItem = function(item) {
    if(item === 1) {
      this.isVisible1 = true;
      this.isVisible2 = false;
      this.isVisible3 = false;
    }
    if(item === 2) {
      this.isVisible2 = true;
      this.isVisible1 = false;
      this.isVisible3 = false;
    }
    if(item === 3) {
      this.isVisible3 = true;
      this.isVisible1 = false;
      this.isVisible2 = false;
    }
  };

}
