angular
  .module('tutHub')
  .factory('BookmarkFactory', BookmarkFactory);

  function BookmarkFactory($http) {
    let bookmarks = [];

    return {
      saveBookmark(id, email, obj) {
        let item = { id: id, email: email };
        $http
          .post('/api/bookmarks', item)
          .then(() => {
            bookmarks.push(obj);
          })
      },

      getBookmarks(email, cb) {
        return bookmarks.length > 0 ?
        cb(bookmarks) :
        $http
          .get(`/api/bookmarks/${email}`)
          .then((res) => {
            if (Array.isArray(res.data)) {
              bookmarks = res.data;
              cb(bookmarks);
            } else {
              console.log('There are no bookmarks.');
            }
          })
      },

      deleteBookmark(user, id, cb) {
        $http
          .delete(`/api/bookmarks/${user}/${id}`)
          .then((res) => {
            let bmarks = bookmarks.map((bookmark) => { return bookmark._id });
            let idx = bmarks.indexOf(id);
            bookmarks = [...bookmarks.slice(0, idx), ...bookmarks.slice(idx + 1)];
            cb(bookmarks);
          })
      }
    }
  }
