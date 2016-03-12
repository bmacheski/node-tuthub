'use strict';

angular
  .module('tutHub', [
    'ngRoute'
  ])
  .config(config);

  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/topics/new', {
        templateUrl: 'views/newtopic.html',
        controller: 'NewTopicCtrl',
        controllerAs: 'newtopic'
      })
      .when('/topics/:topicid', {
        templateUrl: 'views/tutorials.html',
        controller: 'TutorialCtrl',
        controllerAs: 'tut'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
