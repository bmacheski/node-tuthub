(function() {
  'use strict';

  angular
    .module('tutHub')
    .config(config)

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
        .when('/topic/:topic/:topicId/comments', {
          templateUrl: 'views/comments.html',
          controller: 'CommentsCtrl',
          controllerAs: 'comm'
        })
        .when('/edit', {
          templateUrl: 'views/edit.html',
          controller: 'EditCtrl',
          controllerAs: 'edit'
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
        .when('/bookmarks', {
          templateUrl: 'views/bookmarks.html',
          controller: 'BookmarkCtrl',
          controllerAs: 'bookmark'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
})();
