'use strict'

const Topic = require('../models/topic.model.js')

module.exports = app => {

  app.get('/topics', (req, res) => {
    Topic
      .find()
      .exec((err, topics) => {
        res.send(topics)
      })
  })

  app.post('/topics', (req, res) => {
    let name = req.body.name
    let topic = new Topic({
      name: name
    })
    topic.save()
    res.send('topic saved!')
  })
}

