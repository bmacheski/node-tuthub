'use strict';

angular
  .module('tutHub')
  .controller('TutorialCtrl', TutorialCtrl);

  function TutorialCtrl($routeParams, TutorialFactory) {
    var vm = this;

    vm.currentTutorial = $routeParams.topicId;

    vm.go = function() {
      $location.path('/tutorial/new');
    }

    TutorialFactory.getTutorials(vm.currentTutorial, (tuts) => {
      vm.tutorials = tuts;
    });
  }
