'use strict';

angular
  .module('tutHub', [
    'ngRoute',
    'ui.materialize',
    'ngCookies'
  ])
  .config(config)
  .run(run)

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
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
        controllerAs: 'auth'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  function run($rootScope, AuthFactory) {
    $rootScope.loggedIn = Boolean(AuthFactory.checkLoggedIn())
  }
