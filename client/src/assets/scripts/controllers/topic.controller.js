'use strict';

angular
  .module('tutHub')
  .controller('TopicCtrl', TopicCtrl);

  function TopicCtrl(TopicFactory, $http, $location) {
    var vm = this;

    TopicFactory
      .getAllTopics()
      .then((data) => {
        vm.topics = data;
      })

    vm.goToTut =  function(topic) {
     $location.path(`/topic/${topic}`);
    }
  }
