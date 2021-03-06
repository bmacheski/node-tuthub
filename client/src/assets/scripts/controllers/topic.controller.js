(function() {
  'use strict';

  angular
    .module('controllers')
    .controller('TopicCtrl', TopicCtrl);

    function TopicCtrl(TopicFactory, $http, $location) {
      let vm = this;

      TopicFactory
        .getAllTopics()
        .then((data) => {
          vm.topics = data;
        })

      vm.goToTut =  function(topic) {
       $location.path(`/topic/${topic}`);
      }
    }
})();
