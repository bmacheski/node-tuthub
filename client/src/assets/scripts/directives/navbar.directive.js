(function() {
  'use strict';

  angular
    .module('tutHub')
    .directive('navBar', navBar);

    function navBar() {
      return {
        restrict: 'E',
        templateUrl: 'views/navbar.html',
        controller: 'AuthCtrl',
        controllerAs: 'auth'
      }
    }
})();
