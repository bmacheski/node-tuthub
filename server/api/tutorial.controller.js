'use strict'

const Tutorial = require('../models/tutorial.model')
  , Topic      = require('../models/topic.model')

const TutorialController = {}

TutorialController.saveTutorial = (req, res) => {
  Topic
    .findOne({ 'name': req.body.topic })
    .exec((err, topic) => {
      if (err) throw err
      if (topic) {
        let tut = new Tutorial({ name: req.body.name, url: req.body.url })
        tut.save()
        topic.tutorials.push(tut._id)
        topic.save()
      } else {
        let newTopic = new Topic({ name: req.body.topic })
        newTopic.save()
      }
    })
  res.send('ok!')
}

TutorialController.findTutorial = (req, res) => {
  Topic
    .findOne({ name: req.params.tutId })
    .populate('tutorials')
    .exec((err, tutorials) => {
      if (err) throw err
      if (tutorials) {
        res.send(tutorials)
      }
    })
}

module.exports = TutorialController
