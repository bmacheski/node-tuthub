(function() {

angular
  .module('tutHub')
  .run(run)

  function run($rootScope, AuthFactory, $location) {
    $rootScope.loggedIn = Boolean(AuthFactory.checkLoggedIn())

    $rootScope.$on('$routeChangeStart', function (e, nextRoute) {
      if (nextRoute.$$route && nextRoute.$$route.private && !$rootScope.loggedIn) {
        $location.path('/login')
      }
    });
  }
})();
