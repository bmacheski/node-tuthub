(function() {

angular
  .module('tutHub')
  .run(run)

  function run($rootScope, AuthFactory) {
    $rootScope.loggedIn = Boolean(AuthFactory.checkLoggedIn())
  }
})();
