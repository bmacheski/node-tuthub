'use strict';

angular
  .module('tutHub')
  .factory('TutorialFactory', TutorialFactory);

  function TutorialFactory($http) {
    let tutorials = {};
    let callStateObj = {};
    let createdTutorials;

    return {
      getTutorials(topic, cb) {
        return callStateObj[topic]
        ? cb(tutorials[topic]) :
        $http
          .get(`/api/tutorials/${topic}`)
          .then((res) => {
            callStateObj[topic] = true;
            tutorials[topic] = res.data;
            cb(tutorials[topic]);
          });
      },

      addTutorial(name, url, topic, domain, username, cb) {
        let tutorialObj = {
          name: name,
          url: url,
          topic: topic,
          domain: domain,
          postedBy: username
        };
        $http
          .post('/api/tutorials', tutorialObj)
          .then((res) => {
            if (~Object.keys(tutorials).indexOf(topic)) {
              tutorialObj['_id'] = res.data.id;
              tutorialObj.voteCount = 0;
              tutorials[topic].push(tutorialObj);
            } else {
              tutorialObj['_id'] = res.data.id;
              tutorials[topic] = [tutorialObj];
            }
            Materialize.toast('Tutorial saved!', 3000);
            cb();
          });
      },

      upVoteTutorial(id, topic, cb) {
        let obj = { id: id, topic: topic }
        $http
          .post('/api/tutorials/vote', obj)
          .then((res) => {
            let t = tutorials[topic].map((tut) => { return tut._id });
            let idx = t.indexOf(id);
            tutorials[topic][idx]['voteCount'] = res.data.voteCount;
            cb(tutorials[topic]);
          })
      },

      findCreatedTutorials(username, cb) {
        createdTutorials
        ? cb(createdTutorials) :
        $http
          .get(`/api/tutorials/find/${username}`)
          .then((res) => {
            createdTutorials = res.data;
            cb(createdTutorials);
          })
      },

      deleteTutorial(tutId, cb) {
        let id = { tutId: tutId };
        $http
          .post('/api/tutorials/remove', id)
          .then((res) => {
            let topic = res.data.name;

            if (tutorials[topic]) {
              let tuts = tutorials[topic].map((t) => { return t._id });
              let idx = tuts.indexOf(tutId);
              let ctuts = createdTutorials.map((t) => { return t._id });
              let cidx = ctuts.indexOf(tutId);

              createdTutorials = [...createdTutorials.slice(0, cidx), ...createdTutorials.slice(cidx + 1)];

              if (~~idx) {
                tutorials[topic] = [...tutorials[topic].slice(0, idx), ...tutorials[topic].slice(idx + 1)];
                cb(createdTutorials);
              }
            } else {
              cb(createdTutorials);
            }
          })
      }
    }
  }
