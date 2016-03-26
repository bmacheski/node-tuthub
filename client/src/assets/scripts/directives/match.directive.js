(function() {
  'use strict';

  angular
    .module('directives')
    .directive('match', match);

    function match() {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {

          function passwordMatch(val) {
            scope.$watch(attrs.match, function(newVal, oldVal) {
              let isValid = val === scope.$eval(attrs.match);

              ctrl.$setValidity('match', isValid);
            })
            return val;
          }

          ctrl.$parsers.push(passwordMatch);
        }
      }
    }
})();
