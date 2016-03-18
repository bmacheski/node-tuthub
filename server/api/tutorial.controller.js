'use strict';

const Tutorial  = require('../models/tutorial.model')
    , Topic     = require('../models/topic.model')
    , User      = require('../models/user.model');

const TutorialController = {};

TutorialController.saveTutorial = (req, res, next) => {
  User
    .findOne({ username: req.body.postedBy })
    .exec((err, user) => {
      if (err) return next(err);

      Topic
        .findOne({ 'name': req.body.topic })
        .exec((err, topic) => {
          if (err) throw err;

          if (topic) {
            let tut = new Tutorial({
              name: req.body.name,
              url: req.body.url,
              domain: req.body.domain,
              postedBy: user._id,
              topic: topic._id
            })

            tut.save();
            res.status(200).send({ id: tut._id });
          } else {
            let newTopic = new Topic({ name: req.body.topic });
            newTopic.save();
          }
        })
    })
}

TutorialController.findTutorial = (req, res, next) => {
  // TODO: currently getting name of tutorial -- need to use only ID
  // to eliminate unnecessary topic query
  Topic
    .findOne({ name: req.params.tutId })
    .exec((err, topic) => {
      if (err) return next(err);

      Tutorial
        .find({ topic: topic._id })
        .populate('postedBy', 'username')
        .populate('comments')
        .exec((err, tuts) => {
          if (err) return next(err);

          res.status(200).send(tuts);
        })
    })
}

TutorialController.upvoteTutorial = (req, res, next) => {
  Tutorial
    .findById(req.body.id)
    .exec((err, tutorial) => {
      if (err) return next(err);

      tutorial.voteCount++;
      tutorial.save();
      res.status(200).send(tutorial);
    })
}

TutorialController.findCreatedTutorial = (req, res, next) => {
  User
    .findOne({ username: req.params.userId })
    .exec((err, user) => {
      if (err) return next(err);

      Tutorial
        .find({ postedBy: user._id })
        .exec((err, tutorial) => {
          res.send(tutorial);
        })
    })
}

module.exports = TutorialController;
