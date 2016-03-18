'use strict';

angular
  .module('tutHub')
  .controller('TutorialCtrl', TutorialCtrl);

  function TutorialCtrl($routeParams, TutorialFactory, BookmarkFactory, AuthFactory) {
    let vm = this;

    vm.email = AuthFactory.getCurrentUserEmail();
    vm.currentTutorial = $routeParams.topicId;

    vm.go = function() {
      $location.path('/tutorial/new');
    }

    vm.addToBookmarks = function(id, name, url) {
      let domain = url.split('/').filter((el) => { return el !== "" })[1];
      let obj = { '_id': id, name: name, url: url, domain: domain };

      BookmarkFactory.saveBookmark(id, vm.email, obj, (bookmarks) => {
        vm.bIds = bookmarks.map((b) => { return b._id });
      });

      vm.name = '';
      vm.url = '';
    }

    vm.incrementVote = function(id, topic) {
      TutorialFactory.upVoteTutorial(id, topic, (tuts) => {
        vm.tutorials = tuts;
      })
    }

    BookmarkFactory.getBookmarks(vm.email, (bookmarks) => {
      vm.bIds = bookmarks.map((b) => { return b._id });
    })

    TutorialFactory.getTutorials(vm.currentTutorial, (tuts) => {
      vm.tutorials = tuts;
    });
  }
