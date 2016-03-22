(function() {
  'use strict';

  angular
    .module('controllers')
    .controller('BookmarkCtrl', BookmarkCtrl);

    function BookmarkCtrl(BookmarkFactory, AuthFactory) {
      let vm = this;
      let email = AuthFactory.getCurrentUserEmail();

      BookmarkFactory.getBookmarks(email, (bookmarks) => {
        vm.bookmarks = bookmarks;
      })

      let bookmarkIdx = vm.bookmarks

      vm.removeBookmark = function(id) {
        BookmarkFactory.deleteBookmark(email, id, (bookmarks) => {
          vm.bookmarks = bookmarks;
        })
      }
    }
})();
