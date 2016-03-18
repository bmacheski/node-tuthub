(function() {
  'use strict';

  angular
    .module('tutHub')
    .controller('AuthCtrl', AuthCtrl);

    function AuthCtrl(AuthFactory, $location) {
      let vm = this;

      vm.login = function() {
        let username = vm.info.username;
        let password = vm.info.password;
        AuthFactory.login(username, password, () => {
          $location.path('/');
        })
      }

      vm.logout = function() {
        AuthFactory.logout(() => {
          $location.path('/login');
        })
      }
    }
})();
