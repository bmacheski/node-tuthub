'use strict';

angular
  .module('tutHub')
  .controller('RegisterCtrl', RegisterCtrl);

  function RegisterCtrl($http, AuthFactory, $location) {
    let vm = this;

    vm.signup = function() {
      let username = vm.info.username;
      let password = vm.info.password;

      AuthFactory.signup(username, password, function() {
        $location.path('/');
      })
    }
  }
