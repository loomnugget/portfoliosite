'use strict';

require('./_project.scss');

module.exports = ['$log', ProjectController];

function ProjectController($log) {
  $log.debug('init projectCtrl');

  this.states = {};
  this.states.activeItem = 'item1';
  this.items = [
    {
      id: 'item1',
      title: 'Puptracker',
      url: '',
    },
    {
      id: 'item2',
      title: '3D Engine',
      url: '',
    },
    {
      id: 'item3',
      title: 'Art-C',
      url: '',
    },
  ];

}
