(function() {
  'use strict';

  angular
    .module('services')
    .factory('AuthFactory', AuthFactory);

    function AuthFactory($http, $cookies, $rootScope) {
      let AuthFactoryObj = {};

      let user = {};

      AuthFactoryObj.signup = function(username, password, cb) {
        let info = { username: username, password: password };

        $http
          .post('/register', info)
          .then(() => {
            user.username = username;
            $rootScope.loggedIn = true;
            $cookies.username = username;

            cb();
          }, () => {
            Materialize.toast('That username is already taken.', 3000);
          })
      }

      AuthFactoryObj.login = function(username, password, cb) {
        let info = { username: username, password: password };

        $http
          .post('/login', info)
          .then(() => {
            $rootScope.loggedIn = true;
            user.username = username;
            $cookies.username = username;

            cb();
          }, () => {
            Materialize.toast('Authentication failure.', 3000);
          })
      }

      AuthFactoryObj.logout = function(cb) {
        $http
          .get('/logout')
          .then(() => {
            $rootScope.loggedIn = false;

            delete user.username;
            delete $cookies.username;

            cb();
          })
      }

      AuthFactoryObj.checkLoggedIn = function() {
        return $cookies.get('username');
      }

      AuthFactoryObj.getCurrentUserEmail = function() {
        return $cookies.get('username');
      }

      return AuthFactoryObj;
    }
})();
