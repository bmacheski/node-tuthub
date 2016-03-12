angular
  .module('tutHub')
  .factory('TopicFactory', TopicFactory)

  function TopicFactory($http, $q) {
    let topics

    return {
      getAllTopics() {
        return topics
        ? $q.when(topics)
        : $http
          .get('/topics')
          .then((res) => {
            topics = res.data
            return topics
          })
      },

      addTopic(topic) {
        topics.push(topic)
        console.log('added-->', topics)
      }
    }
  }