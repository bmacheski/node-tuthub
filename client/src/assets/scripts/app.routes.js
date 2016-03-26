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
          controllerAs: 'newtopic',
          private: true
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
        .when('/profile', {
          templateUrl: 'views/profile.html',
          controller: 'ProfileCtrl',
          controllerAs: 'profile',
          private: true
        })
        .when('/profile/:topicId/:tutId', {
          templateUrl: 'views/edit.html',
          controller: 'EditCtrl',
          controllerAs: 'edit',
          private: true
        })
        .when('/tutorial/new', {
          templateUrl: 'views/newtutorial.html',
          controller: 'NewTutorialCtrl',
          controllerAs: 'newtut',
          private: true
        })
        .when('/register', {
          templateUrl: 'views/register.html',
          controller: 'RegisterCtrl',
          controllerAs: 'register',
          resolve: {
            checkAuth: function ($rootScope, $location) {
              if ($rootScope.loggedIn) {
                $location.path('/')
              }
            }
          }
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'AuthCtrl',
          controllerAs: 'auth',
          resolve: {
            checkAuth: function ($rootScope, $location) {
              if ($rootScope.loggedIn) {
                $location.path('/')
              }
            }
          }
        })
        .when('/bookmarks', {
          templateUrl: 'views/bookmarks.html',
          controller: 'BookmarkCtrl',
          controllerAs: 'bookmark',
          private: true
        })
        .otherwise({
          redirectTo: '/'
        });
    }
})();
