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
          .then((res) => {
            let obj = { _id: res.data}
            let o = Object.assign({}, comment, obj)
            if (~Object.keys(comments).indexOf(topic)) {
              comments[topic].push(o);
            } else {
              comments[topic] = o;
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
      },

      deleteComment(id, topic, cb) {
        $http
          .delete(`/api/comments/${topic}/${id}`)
          .then(() => {
            let cIds = comments[topic].map((comment) => { return comment._id });
            let idx = cIds.indexOf(id);
            comments[topic] = [...comments[topic].slice(0, idx), ...comments[topic].slice(idx + 1)];
            cb(comments[topic]);
          })
      }
    }
  }
