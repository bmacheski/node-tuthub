'use strict';

angular
  .module('tutHub')
  .factory('TutorialFactory', TutorialFactory);

  function TutorialFactory($http) {
    let tutorials = {};
    let callStateObj = {};

    return {
      getTutorials(topic, cb) {
        return callStateObj[topic] ?
        cb(tutorials[topic]) :
        $http
          .get(`/api/tutorials/${topic}`)
          .then((res) => {
            callStateObj[topic] = true;
            tutorials[topic] = res.data.tutorials;
            cb(tutorials[topic]);
          });
      },

      addTutorial(name, url, topic, cb) {
        let obj = { name: name, url: url, topic: topic}
        $http
          .post('/api/tutorials', obj)
          .then((res) => {
            if (~Object.keys(tutorials).indexOf(topic)) {
              obj = res.data
              tutorials[topic].push();
            } else {
              obj['_id'] = res.data.id
              tutorials[topic] = [obj]
            }
            Materialize.toast('Tutorial saved!', 3000);
            cb();
          });
      }
    }
  }
