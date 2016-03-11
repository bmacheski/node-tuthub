'use strict';

angular
  .module('tutHub', [
    'ngRoute'
  ])
  .config(config);

  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: '',
        controllerAs: ''
      })
      .when('/topics/new', {
        templateUrl: 'views/newtopic.html',
        controller: 'TopicsCtrl',
        controllerAs: 'topics'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
