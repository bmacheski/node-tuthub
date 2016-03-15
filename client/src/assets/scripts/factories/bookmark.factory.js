'use strict';

angular
  .module('tutHub')
  .factory('BookmarkFactory', BookmarkFactory);

  function BookmarkFactory($http) {
    let bookmarks = [];
    let apiCallStatus = false;

    return {
      saveBookmark(id, username, obj, cb) {
        let item = { id: id, username: username };
        $http
          .post('/api/bookmarks', item)
          .then(() => {
            bookmarks.push(obj);
            cb(bookmarks)
          })
      },

      getBookmarks(username, cb) {
        return apiCallStatus ?
        cb(bookmarks) :
        $http
          .get(`/api/bookmarks/${username}`)
          .then((res) => {
            apiCallStatus = true;
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
