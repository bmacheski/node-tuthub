'use strict';

angular
  .module('tutHub')
  .controller('RegisterCtrl', RegisterCtrl);

  function RegisterCtrl($http) {
    var vm = this;

    vm.signup = function() {
      let info = { email: vm.info.email, password: vm.info.password }
      $http
        .post('/register', info)
        .then(() => {
          console.log('registration success.')
        })
    }
  }
