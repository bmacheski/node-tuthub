'use strict';

angular
  .module('tutHub')
  .controller('BookmarkCtrl', BookmarkCtrl);

  function BookmarkCtrl(BookmarkFactory, AuthFactory, $scope) {
    let vm = this;

    let email = AuthFactory.getCurrentUserEmail();

    BookmarkFactory.getBookmarks(email, (bookmarks) => {
      vm.bookmarks = bookmarks;
    })

    vm.removeBookmark = function(id) {
      BookmarkFactory.deleteBookmark(email, id, (bookmarks) => {
        vm.bookmarks = bookmarks;
      })
    }
  }
