(function() {
  'use strict';

  angular
    .module('services')
    .factory('TutorialFactory', TutorialFactory);

    function TutorialFactory($http) {
      let TutorialFactoryObj = {};

      let tutorials = {};
      let callStateObj = {};
      let createdTutorials;
      let createdCall = false;

      TutorialFactoryObj.getTutorials = function(topic, cb) {
        return callStateObj[topic]
        ? cb(tutorials[topic]) :
        $http
          .get(`/api/tutorials/${topic}`)
          .then((res) => {
            callStateObj[topic] = true;
            tutorials[topic] = res.data;

            cb(tutorials[topic]);
          });
      }

      TutorialFactoryObj.addTutorial = function(name, url, topic, domain, username, cb) {
        let tutorialObj = {
          name: name, url: url, topic: { name: topic }, domain: domain, postedBy: { username: username }
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

            Array.isArray(createdTutorials) ? createdTutorials = createdTutorials : createdTutorials = []
            createdTutorials.push(tutorialObj);

            Materialize.toast('Tutorial saved!', 3000);
            cb();
          });
      },

      TutorialFactoryObj.upVoteTutorial = function(id, topic, cb) {
        let obj = { id: id, topic: topic };
        $http
          .post('/api/tutorials/vote', obj)
          .then((res) => {
            let t = tutorials[topic].map((tut) => { return tut._id });
            let idx = t.indexOf(id);

            tutorials[topic][idx]['voteCount'] = res.data.voteCount;

            cb(tutorials[topic]);
          })
      }

      TutorialFactoryObj.findCreatedTutorials = function(username, cb) {
        createdCall
        ? cb(createdTutorials) :
        $http
          .get(`/api/tutorials/find/${username}`)
          .then((res) => {
            createdTutorials = res.data ? res.data : [];
            createdCall = true;
            cb(createdTutorials);
          })
      }

      TutorialFactoryObj.deleteTutorial = function(tutId, cb) {
        $http
          .post('/api/tutorials/remove', { tutId: tutId })
          .then((res) => {
            let topic = res.data.name;
            let ctuts = createdTutorials.map((t) => { return t._id });
            let cidx = ctuts.indexOf(tutId);

            createdTutorials = [...createdTutorials.slice(0, cidx), ...createdTutorials.slice(cidx + 1)];

            if (tutorials[topic]) {
              let tuts = tutorials[topic].map((t) => { return t._id });
              let idx = tuts.indexOf(tutId);

              if (~~idx) {
                tutorials[topic] = [...tutorials[topic].slice(0, idx), ...tutorials[topic].slice(idx + 1)];
                cb(createdTutorials);
              }
            } else { cb(createdTutorials); }
          })
      }

      TutorialFactoryObj.updateTut = function(obj, cb) {
        $http
          .put('/api/tutorials/edit', obj)
          .then((res) => {
            let objId = obj._id;
            let idx = createdTutorials.map((tut) => { return tut._id }).indexOf(objId);
            let topicName = obj.topic.name;

            createdTutorials[idx] = obj;

            if (tutorials[topicName]) {
              let index = tutorials[topicName].map((tut) => { return tut._id }).indexOf(objId);

              tutorials[topicName][index] = obj;
            }

            cb();
          })
      }

      return TutorialFactoryObj;
    }
})();
