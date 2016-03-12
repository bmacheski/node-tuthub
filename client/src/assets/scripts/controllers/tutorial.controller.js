'use strict';

angular
  .module('tutHub')
  .controller('TutorialCtrl', TutorialCtrl);

  function TutorialCtrl($routeParams) {
    var vm = this;

    vm.currentTutorial = $routeParams.topicId

    vm.go = function() {
      $location.path('/tutorial/new')
    }
  }
