'use strict';

const mongoose = require('mongoose');

const TutorialSchema = new mongoose.Schema({
  name: String,
  url: String,
  domain: String,
  voteCount: { type: Number, default: 0 },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
  ],
  haveVoted: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ]
})

module.exports = mongoose.model('Tutorial', TutorialSchema);
