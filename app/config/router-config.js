'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('' , '/landing');
  $urlRouterProvider.when('/' , '/landing');

  let states = [
    {
      name: 'welcome',
      url: '/landing',
      controllerAs: 'landingCtrl',
      controller: 'LandingController',
      template: require('../view/landing/landing.html'),
    },
    {
      name: 'portfolio',
      url: '/portfolio',
      controllerAs: 'portfolioCtrl',
      controller: 'PortfolioController',
      template: require('../view/portfolio/portfolio.html'),
    },
    {
      name: 'about',
      url: '/about',
      controllerAs: 'aboutCtrl',
      controller: 'AboutController',
      template: require('../view/about/about.html'),
    },
    {
      name: 'contact',
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
