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
    let name = vm.tutorial.title
    let url = vm.tutorial.url

    TutorialFactory.addTutorial(name, url, topic, () => {
        $location.path(`/topic/${topic}`);
      })
    }
  }
