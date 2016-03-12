'use strict'

const Topic = require('../models/topic.model.js')

const TopicController = {}

TopicController.findAllTopics = (req, res) => {
  Topic
    .find({}, (err, topics) => {
      res.send(topics)
    })
}

TopicController.saveTopic = (req, res) => {
  let name = req.body.name
  let topic = new Topic({ name: name })
  topic.save()
  res.send('topic saved!')
}

module.exports = TopicController
