'use strict'

const Tutorial  = require('../models/tutorial.model')
    , Topic     = require('../models/topic.model')
    , User      = require('../models/user.model')

const TutorialController = {}

TutorialController.saveTutorial = (req, res) => {
  User
    .findOne({ username: req.body.postedBy })
    .exec((err, user) => {
      Topic
        .findOne({ 'name': req.body.topic })
        .exec((err, topic) => {
          if (err) throw err
          if (topic) {
            let tut = new Tutorial({
              name: req.body.name,
              url: req.body.url,
              domain: req.body.domain,
              postedBy: user._id,
              topic: topic._id
            })
            tut.save()
            topic.tutorials.push(tut._id)
            topic.save()
            // user.tutorialsCreated.push(tut._id)
            // user.save()
            res.status(200).send({ id: tut._id })
          } else {
            let newTopic = new Topic({ name: req.body.topic })
            newTopic.save()
          }
        })
    })
}

TutorialController.findTutorial = (req, res) => {
  Topic
    .findOne({ name: req.params.tutId })
    .populate({
      path: 'tutorials',
      populate: {
        path: 'postedBy',
        model: 'User',
        select: 'username'
      }
    })
    .exec((err, posts) => {
      if (err) throw err
      if (posts) {
        let t = posts.tutorials.map((p) => {
         return {
          _id : p._id,
          categoryName: posts.name,
          comments : p.comments,
          domain: p.domain,
          name: p.name,
          postedBy: p.postedBy,
          url: p.url,
          voteCount: p.voteCount
         }
        })
        res.status(200).send(t)
      }
    })
}

TutorialController.upvoteTutorial = (req, res) => {
  Tutorial
    .findById(req.body.id)
    .exec((err, tutorial) => {
      tutorial.voteCount++
      tutorial.save()
      res.status(200).send(tutorial)
    })
}

TutorialController.findCreatedTutorial = (req, res) => {
  User
    .findOne({ username: req.params.userId })
    .exec((err, user) => {
      Tutorial
        .find({ postedBy: user._id })
        .exec((err, tutorial) => {
          res.send(tutorial)
        })
    })
}

module.exports = TutorialController
