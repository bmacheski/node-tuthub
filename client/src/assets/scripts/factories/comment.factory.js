'use strict';

angular
  .module('tutHub')
  .factory('CommentFactory', CommentFactory);

  function CommentFactory($http) {
    let comments = {}
    let callStateObj = {};

    return {
      saveComment(comment) {
        let topic = comment.topic;
        $http
          .post('/api/comments', comment)
          .then(() => {
            if (~Object.keys(comments).indexOf(topic)) {
              comments[topic].push(comment);
            } else {
              comments[topic] = comment;
            }
            console.log(comments)
          })
      },

      getComments(id, cb) {
        callStateObj[id] ?
        cb(comments[id]) :
        $http
          .get(`/api/comments/${id}`)
          .then((res) => {
            callStateObj[id] = true;
            comments[id] = res.data;
            cb(comments[id]);
          })
      }
    }
  }
