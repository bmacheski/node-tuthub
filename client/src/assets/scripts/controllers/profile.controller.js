(function() {
  'use strict';

  angular
    .module('controllers')
    .controller('ProfileCtrl', ProfileCtrl);

    function ProfileCtrl(TutorialFactory, AuthFactory) {
      let vm = this;
      let username = AuthFactory.getCurrentUserEmail();

      vm.loading = true;
      vm.deleteTut = function(id) {
        TutorialFactory.deleteTutorial(id, (tuts) => {
          vm.tutorials = tuts;
        });
      }

      TutorialFactory.findCreatedTutorials(username, (tutorials) => {
        vm.loading = false;
        vm.tutorials = tutorials;
      })
    }
})();
