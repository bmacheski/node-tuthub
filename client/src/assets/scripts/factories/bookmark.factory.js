angular
  .module('tutHub')
  .factory('BookmarkFactory', BookmarkFactory)

  function BookmarkFactory($http) {
    let bookmarks = []

    return {
      saveBookmark(id, email) {
        let item = { id: id, email: email }
        $http
          .post('/api/bookmarks', item)
          .then(() => {
            bookmarks.push(item)
          })
      },

      getBookmarks(email, cb) {
        $http
          .get(`/api/bookmarks/${email}`)
          .then((res) => {
            bookmarks = res.data
            cb(bookmarks)
          })
      }
    }
  }
