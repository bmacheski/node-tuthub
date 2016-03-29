(function() {
  'use strict';

  angular
    .module('directives')
    .directive('match', match);

    function match() {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attrs, ngModel) {

          function passwordMatch(val) {
            scope.$watch(attrs.match, function(newVal, oldVal) {
              let isValid = val === scope.$eval(attrs.match);

              ngModel.$setValidity('match', isValid);
            })
            return val;
          }

          ngModel.$parsers.push(passwordMatch);
        }
      }
    }
})();
