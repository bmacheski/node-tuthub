angular
  .module('tutHub')
  .factory('CommentFactory', CommentFactory)

  function CommentFactory($http) {
    let comments = {}

    return {
      saveComment(comment) {
        let topic = comment.topic
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
        $http
          .get(`/api/comments/${id}`)
          .then((res) => {
            comments[id] = res.data
            cb(comments[id])
          })
      }
    }
  }
