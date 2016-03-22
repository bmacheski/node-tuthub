(function() {
  'use strict';

  angular
    .module('controllers')
    .controller('NewTopicCtrl', NewTopicCtrl);

    function NewTopicCtrl(TopicFactory, $http, $scope) {
      let vm = this;

      vm.saveTopic = function() {
        let topic = { name: vm.topic.name };
        $http
          .post('/api/topics', topic)
          .then(function() {
            TopicFactory.addTopic(topic)
            vm.topic.name = '';
          })
      }
    }
})();
