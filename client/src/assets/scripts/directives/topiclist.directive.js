(function() {
  'use strict';

  angular
    .module('tutHub')
    .directive('topicList', topicList);

    function topicList() {
      return {
        restrict: 'E',
        templateUrl: 'views/topics.html',
        controller: 'TopicCtrl',
        controllerAs: 'topic'
      }
    }
})();
