angular
  .module('tutHub')
  .factory('AuthFactory', AuthFactory)

  function AuthFactory($http, $cookies, $rootScope) {
    let user = {}

    return {
      signup(email, password, cb) {
        let info = { email: email, password: password }
        $http
          .post('/register', info)
          .then(() => {
            user.email = email
            $rootScope.loggedIn = true
            $cookies.email = email
            cb()
          })
      },

      login(email, password, cb) {
        let info = { email: email, password: password }
        $http
          .post('/login', info)
          .then(() => {
            console.log('hello from res')
            $rootScope.loggedIn = true
            user.email = email
            $cookies.email = email
            cb()
          })
      },

      logout(cb) {
        $http
          .get('/logout')
          .then(() => {
            $rootScope.loggedIn = false
            delete user.email
            delete $cookies.email
            cb()
          })
      },

      checkLoggedIn() {
        return $cookies.get('email')
      }
    }
  }
