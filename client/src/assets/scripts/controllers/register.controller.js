'use strict';

angular
  .module('tutHub')
  .controller('RegisterCtrl', RegisterCtrl);

  function RegisterCtrl($http, AuthFactory, $location) {
    var vm = this;

    vm.signup = function() {
      let email = vm.info.email
      let password = vm.info.password

      AuthFactory.signup(email, password, function() {
        $location.path('/')
      })
    }
  }
