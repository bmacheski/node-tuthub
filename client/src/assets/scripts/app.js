(function() {
  'use strict';

  angular
    .module('tutHub', [
      'controllers',
      'directives',
      'services',
      'modules'
    ])
  angular
    .module('controllers', [])
  angular
    .module('directives', [])
  angular
    .module('services', [])
  angular
    .module('modules', [
      'ngRoute',
      'ui.materialize',
      'ngCookies'
    ])
})();
