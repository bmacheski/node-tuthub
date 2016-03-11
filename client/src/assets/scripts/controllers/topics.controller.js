angular
  .module('tutHub')
  .controller('TopicsCtrl', TopicsCtrl)

  function TopicsCtrl(TopicsFactory, $http) {
    var vm = this

    vm.saveTopic = function() {
      let topic = { name: vm.topic.name }
      $http
        .post('/topics', topic)
        .then(function() {
          TopicsFactory.addTopic(topic)
        })
    }
  }
