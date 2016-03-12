'use strict'

const TopicController = require('./api/topic.controller')

module.exports = app => {

  app.get('/api/topics', TopicController.findAllTopics)
  app.post('/api/topics', TopicController.saveTopic)
}
