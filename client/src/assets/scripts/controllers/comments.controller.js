'use strict';

angular
  .module('tutHub')
  .controller('CommentsCtrl', CommentsCtrl);

  function CommentsCtrl(CommentFactory, AuthFactory, TutorialFactory, $routeParams) {
    let vm = this;
    let topic = $routeParams.topicId;

    vm.username = AuthFactory.getCurrentUserEmail()
    CommentFactory.getComments(topic, (comments) => {
      vm.comments = comments;
    })

    // TutorialFactory.getTutorials(topic, (tuts) => {
    //   vm.tutorials = tuts;
    // });

    vm.postComment = function() {
      let comment = { topic: topic, author: vm.username, comment: vm.commentMessage };
      CommentFactory.saveComment(comment);
      vm.commentMessage = ''
    }

    vm.removeComment = function(id) {
      CommentFactory.deleteComment(id, topic, (comments) => {
        vm.comments = comments;
      })
    }
  }
