(function() {
  'use strict';

  angular
    .module('tutHub')
    .controller('NewTutorialCtrl', NewTutorialCtrl);

    function NewTutorialCtrl($http, $location, AuthFactory, TopicFactory, TutorialFactory) {
      let vm = this;
      let username = AuthFactory.getCurrentUserEmail();

      TopicFactory
        .getAllTopics()
        .then((data) => {
          vm.topics = data;
        });

      vm.saveTut = function() {
        let topic = vm.tutorial.name;
        let name = vm.tutorial.title;
        let url = vm.tutorial.url;

        if (topic && name && url) {
          let domain = url.split('/').filter((el) => { return el !== "" })[1];

          TutorialFactory.addTutorial(name, url, topic, domain, username, () => {
            $location.path(`/topic/${topic}`);
          })
        } else {
          Materialize.toast('All fields must be filled out.', 2000);
        }
      }
    }
})();
