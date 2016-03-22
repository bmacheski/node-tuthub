(function() {
  'use strict';

  angular
    .module('controllers')
    .controller('EditCtrl', EditCtrl);

    function EditCtrl(TutorialFactory, AuthFactory) {
      let vm = this;
      let username = AuthFactory.getCurrentUserEmail();

      vm.deleteTut = function(id) {
        TutorialFactory.deleteTutorial(id, (tuts) => {
          vm.tutorials = tuts;
        });
      }

      TutorialFactory.findCreatedTutorials(username, (tutorials) => {
        vm.tutorials = tutorials;
      })
    }
})();
