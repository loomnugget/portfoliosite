'use strict';

require('./_project.scss');

module.exports = ['$log', ProjectController];

function ProjectController($log) {
  $log.debug('init projectCtrl');

  this.items = [
    {
      id: '#/projects/puptracker',
      title: 'PupTracker',
      category: 'JavaScript',
      tools: 'Node + Angular',
      summary: 'App for research scientists to track mouse breeding',
      url: 'http://i66.tinypic.com/23wjdk.jpg',
    },
    {
      id: '#/projects/engine',
      title: '3D Physics Engine',
      category: 'JavaScript',
      tools: 'HTML5 Canvas',
      summary: 'Interactive 3D physics engine',
      url: 'http://i66.tinypic.com/2lwok6v.jpg',
    },
    {
      id: '#/projects/artc',
      title: 'Art-C',
      category: 'JavaScript',
      tools: 'Node + Angular',
      summary: 'Social media platform for artists',
      url: 'http://i65.tinypic.com/14tqvxe.jpg',
    },
    // {
    //   id: 'greenkey',
    //   title: 'Green Key Landscaping',
    //   category: 'Responsive Web Design',
    //   summary: 'Local landscaping business website redesign',
    //   url: 'http://i68.tinypic.com/2m61wm8.jpg',
    // },
    // {
    //   id: 'portfolioseries',
    //   title: 'Portfolio Design Series',
    //   category: 'Responsive Web Design',
    //   summary: 'Series of Portfolio Website Designs',
    //   url: 'http://i65.tinypic.com/24mzzh4.jpg',
    // },
  ];
}
