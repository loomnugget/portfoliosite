'use strict';

require('./scss/main.scss');

// Require node modules
const path = require('path');

// Require npm modules
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');

// Require angular modules
const ngTouch = require('angular-touch');
const ngAnimate = require('angular-animate');
const uiRouter = require('angular-ui-router');
const uiBootstrap = require('angular-ui-bootstrap');
const ngFileUpload = require('ng-file-upload');

// Create angular module
const app = angular.module('app', [ngTouch, uiBootstrap, ngAnimate, uiRouter, ngFileUpload]);

// Load config
let context = require.context('./config/', true, /.js$/);
context.keys().forEach( path => {
  app.config(context(path));
});

// Load view controllers
context = require.context('./view/', true, /.js$/);
context.keys().forEach( key => {
  let name = pascalcase(path.basename(key, '.js'));
  let module = context(key);
  app.controller(name, module);
});

// Load components
context = require.context('./component/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  app.component(name, module);
});

// Load filters
context = require.context('./filter/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  app.filter(name, module);
});
