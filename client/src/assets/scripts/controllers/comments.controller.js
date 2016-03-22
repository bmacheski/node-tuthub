(function() {
  'use strict';

  angular
    .module('controllers')
    .controller('CommentsCtrl', CommentsCtrl);

    function CommentsCtrl(CommentFactory, AuthFactory, TutorialFactory, $routeParams) {
      let vm = this;
      let topic = $routeParams.topicId;

      vm.topic = $routeParams.topic;
      vm.username = AuthFactory.getCurrentUserEmail();
      CommentFactory.getComments(topic, (comments) => {
        vm.comments = comments;
      })

      TutorialFactory.getTutorials(vm.topic, (tuts) => {
        let idx = tuts.map((t) => { return t._id }).indexOf(topic)
        vm.tutorial = tuts[idx];
      });

      vm.postComment = function() {
        let comment = { topic: topic, author: vm.username, comment: vm.commentMessage };
        CommentFactory.saveComment(comment);
        vm.commentMessage = '';
      }

      vm.removeComment = function(id) {
        CommentFactory.deleteComment(id, topic, (comments) => {
          vm.comments = comments;
        })
      }
    }
})();
