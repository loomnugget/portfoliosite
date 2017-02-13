'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('' , '/landing');
  $urlRouterProvider.when('/' , '/landing');

  let states = [
    {
      name: 'Welcome',
      url: '/landing',
      controllerAs: 'landingCtrl',
      controller: 'LandingController',
      template: require('../view/landing/landing.html'),
    },
    {
      name: 'Art Portfolio',
      url: '/portfolio',
      controllerAs: 'portfolioCtrl',
      controller: 'PortfolioController',
      template: require('../view/portfolio/portfolio.html'),
    },
    {
      name: 'Projects',
      url: '/projects',
      controllerAs: 'projectCtrl',
      controller: 'ProjectController',
      template: require('../view/project/project.html'),
    },
    {
      name: 'About',
      url: '/about',
      controllerAs: 'aboutCtrl',
      controller: 'AboutController',
      template: require('../view/about/about.html'),
    },
    {
      name: 'Contact',
      url: '/contact',
      controllerAs: 'contactCtrl',
      controller: 'ContactController',
      template: require('../view/contact/contact.html'),
    },
  ];

  states.forEach(state => {
    $stateProvider.state(state);
  });
}
