'use strict';

angular
  .module('tutHub')
  .controller('NewTutorialCtrl', NewTutorialCtrl);

  function NewTutorialCtrl(TopicFactory) {
    var vm = this;

    TopicFactory
      .getAllTopics()
      .then((data) => {
        vm.topics = data
      })
  }
