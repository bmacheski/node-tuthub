'use strict';

const Topic = require('../models/topic.model.js');

const TopicController = {};

TopicController.findAllTopics = (req, res) => {
  Topic
    .find({}, (err, topics) => {
      if (err) return next(err);

      res.status(200).send(topics);
    })
}

TopicController.saveTopic = (req, res) => {
  let name = req.body.name;
  let topic = new Topic({ name: name });

  topic.save((err) => {
    if (err) return next(err);

    res.sendStatus(200);
  });
}

module.exports = TopicController;
