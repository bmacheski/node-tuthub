'use strict'

const mongoose = require('mongoose')

const TutorialSchema = new mongoose.Schema({
  name: String,
  url: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
})

module.exports = mongoose.model('Tutorial', TutorialSchema)
