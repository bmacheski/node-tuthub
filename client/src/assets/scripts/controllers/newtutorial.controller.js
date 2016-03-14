'use strict';

angular
  .module('tutHub')
  .controller('NewTutorialCtrl', NewTutorialCtrl);

  function NewTutorialCtrl($http, $location, TopicFactory, TutorialFactory) {
    var vm = this;

    TopicFactory
      .getAllTopics()
      .then((data) => {
        vm.topics = data;
      });

    vm.saveTut = function() {
      let topic = vm.tutorial.name;

      let tutorial = {
        name: vm.tutorial.title,
        url: vm.tutorial.url,
        topic: topic
      }

      TutorialFactory.addTutorial(tutorial, topic, () => {
        $location.path(`/topic/${topic}`);
      })
    }
  }
