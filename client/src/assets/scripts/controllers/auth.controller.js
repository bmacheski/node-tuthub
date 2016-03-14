'use strict';

angular
  .module('tutHub')
  .controller('AuthCtrl', AuthCtrl);

  function AuthCtrl(AuthFactory, $location) {
    var vm = this;

    vm.login = function() {
      let email = vm.info.email;
      let password = vm.info.password;
      AuthFactory.login(email, password, () => {
        $location.path('/');
      })
    }

    vm.logout = function() {
      AuthFactory.logout(() => {
        $location.path('/login');
      })
    }
  }
