'use strict';

angular
  .module('tutHub')
  .controller('EditCtrl', EditCtrl);

  function EditCtrl(TutorialFactory, AuthFactory) {
    let vm = this;

    let username = AuthFactory.getCurrentUserEmail()

    TutorialFactory.findCreatedTutorials(username, (tutorials) => {
      vm.tutorials = tutorials;
    })
  }
