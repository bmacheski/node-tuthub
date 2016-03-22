(function() {
  'use strict';

  angular
    .module('directives')
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
