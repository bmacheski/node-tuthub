'use strict';

angular
  .module('tutHub')
  .controller('CommentsCtrl', CommentsCtrl);

  function CommentsCtrl(CommentFactory, AuthFactory, TutorialFactory, $routeParams) {
    let vm = this;

    let username =  AuthFactory.getCurrentUserEmail()
    let topic = $routeParams.topicId

    CommentFactory.getComments(topic, (comments) => {
      vm.comments = comments;
    })

    TutorialFactory.getTutorials(topic, (tuts) => {
      vm.tutorials = tuts;
    });

    vm.postComment = function() {
      let comment = {
        topic: topic, author: username, comment: vm.commentMessage
      }
      CommentFactory.saveComment(comment)
    }
  }
