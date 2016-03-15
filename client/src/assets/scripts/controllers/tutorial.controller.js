'use strict';

angular
  .module('tutHub')
  .controller('TutorialCtrl', TutorialCtrl);

  function TutorialCtrl($routeParams, TutorialFactory, BookmarkFactory, AuthFactory) {
    let vm = this;
    let email = AuthFactory.getCurrentUserEmail();

    vm.currentTutorial = $routeParams.topicId;

    vm.go = function() {
      $location.path('/tutorial/new');
    }

    vm.addToBookmarks = function(id, name, url) {
      let obj = { '_id': id, name: name, url: url };

      BookmarkFactory.saveBookmark(id, email, obj, (bookmarks) => {
        vm.bIds = bookmarks.map((b) => { return b._id });
      });

      vm.name = '';
      vm.url = '';
    }

    BookmarkFactory.getBookmarks(email, (bookmarks) => {
      vm.bIds = bookmarks.map((b) => { return b._id });
    })

    TutorialFactory.getTutorials(vm.currentTutorial, (tuts) => {
      vm.tutorials = tuts;
    });
  }
