(function() {
  'use strict';

  angular
    .module('directives')
    .directive('loading', loading);

    function loading() {
      return {
        restrict: 'E',
        templateUrl: 'views/loading.html'
      }
    }
})();
