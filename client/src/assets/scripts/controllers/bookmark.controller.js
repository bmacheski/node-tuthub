'use strict';

angular
  .module('tutHub')
  .controller('BookmarkCtrl', BookmarkCtrl);

  function BookmarkCtrl(BookmarkFactory, AuthFactory) {
    let vm = this;

    let email = AuthFactory.getCurrentUserEmail()
    BookmarkFactory.getBookmarks(email, (bookmarks) => {
      vm.bookmarks = bookmarks
    })
  }
