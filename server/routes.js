'use strict'

const TopicController  = require('./api/topic.controller')
  , TutorialController = require('./api/tutorial.controller')

module.exports = app => {

  // topic routes
  app.get('/api/topics', TopicController.findAllTopics)
  app.post('/api/topics', TopicController.saveTopic)

  // tutorial routes
  app.post('/api/tutorials', TutorialController.saveTutorial)
  app.get('/api/tutorials/:tutId', TutorialController.findTutorial)
}
