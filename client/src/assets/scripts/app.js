'use strict';

angular
  .module('tutHub', [
    'ngRoute',
    'ui.materialize'
  ])
  .config(config);

  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/topic/new', {
        templateUrl: 'views/newtopic.html',
        controller: 'NewTopicCtrl',
        controllerAs: 'newtopic'
      })
      .when('/topic/:topicId', {
        templateUrl: 'views/tutorials.html',
        controller: 'TutorialCtrl',
        controllerAs: 'tut'
      })
      .when('/tutorial/new', {
        templateUrl: 'views/newtutorial.html',
        controller: 'NewTutorialCtrl',
        controllerAs: 'newtut'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
