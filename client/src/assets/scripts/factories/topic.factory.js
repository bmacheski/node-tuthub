(function() {
  'use strict';

  angular
    .module('services')
    .factory('TopicFactory', TopicFactory);

    function TopicFactory($http, $q) {
      let TopicFactoryObj = {};
      let topics;

      TopicFactoryObj.getAllTopics = function() {
          return topics
          ? $q.when(topics)
          : $http
            .get('/api/topics')
            .then((res) => {
              topics = res.data;
              return topics;
            })
        },

      TopicFactoryObj.addTopic = function(topic) {
        topics.push(topic);
      }

      return TopicFactoryObj;
    }
})();
