'use strict';

angular
  .module('tutHub')
  .controller('TutorialCtrl', TutorialCtrl);

  function TutorialCtrl($routeParams, TutorialFactory, BookmarkFactory, AuthFactory) {
    var vm = this;

    vm.currentTutorial = $routeParams.topicId;

    vm.go = function() {
      $location.path('/tutorial/new');
    }

    vm.addToBookmarks = function(id, name, url) {
      let obj = { '_id': id, name: name, url: url};
      let email = AuthFactory.getCurrentUserEmail();
      BookmarkFactory.saveBookmark(id, email, obj);
    }

    TutorialFactory.getTutorials(vm.currentTutorial, (tuts) => {
      vm.tutorials = tuts;
    });
  }
