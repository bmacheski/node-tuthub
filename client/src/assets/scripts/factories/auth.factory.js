'use strict';

angular
  .module('tutHub')
  .factory('AuthFactory', AuthFactory);

  function AuthFactory($http, $cookies, $rootScope) {
    let user = {};

    return {
      signup(username, password, cb) {
        let info = { username: username, password: password };
        $http
          .post('/register', info)
          .then(() => {
            user.username = username;
            $rootScope.loggedIn = true;
            $cookies.username = username;
            cb();
          })
      },

      login(email, password, cb) {
        let info = { email: email, password: password };
        $http
          .post('/login', info)
          .then(() => {
            $rootScope.loggedIn = true;
            user.username = username;
            $cookies.username = username;
            cb();
          })
      },

      logout(cb) {
        $http
          .get('/logout')
          .then(() => {
            $rootScope.loggedIn = false;
            delete user.username;
            delete $cookies.username;
            cb();
          })
      },

      checkLoggedIn() {
        return $cookies.get('username');
      },

      getCurrentUserEmail() {
        return $cookies.get('username');
      }
    }
  }
