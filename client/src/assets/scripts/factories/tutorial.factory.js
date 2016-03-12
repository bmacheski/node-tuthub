angular
  .module('tutHub')
  .factory('TutorialFactory', TutorialFactory);

  function TutorialFactory($http) {
    let tutorials = {};

    return {
      getTutorials(topic, cb) {
        $http
          .get(`/api/tutorials/${topic}`)
          .then((res) => {
            tutorials[topic] = res.data.tutorials;
            cb(tutorials[topic]);
          });
      },

      addTutorial(tutorial, topic, cb) {
        $http
          .post('/api/tutorials', tutorial)
          .then(() => {
            if (~Object.keys(tutorials).indexOf(topic)) {
              tutorials[topic].push(tutorial);
            } else {
              tutorials[topic] = tutorial;
            }
            Materialize.toast('Tutorial saved!', 3000);
            cb();
          });
      }
    }
  }
