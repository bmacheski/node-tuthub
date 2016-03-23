(function() {
  'use strict';

  angular
    .module('controllers')
    .controller('EditCtrl', EditCtrl);

    function EditCtrl(TutorialFactory, AuthFactory, $routeParams, $location) {
      let vm = this;
      let tutId = $routeParams.tutId;
      let topicId = $routeParams.topicId;
      let username = AuthFactory.getCurrentUserEmail();

      TutorialFactory.findCreatedTutorials(username, (tutorials) => {
        vm.tutorials = tutorials;

        let idx = tutorials.map((t) => { return t._id }).indexOf(tutId)

        vm.tutorial = tutorials[idx];
      })

      vm.updateTutorial = function() {
        TutorialFactory.updateTut(vm.tutorial, () => {
          $location.path('/profile')
        })
      }
    }
})();
