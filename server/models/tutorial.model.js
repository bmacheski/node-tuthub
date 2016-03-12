'use strict'

const mongoose = require('mongoose')

const TutorialSchema = new mongoose.Schema({
  title: String,
  url: String,
  author: String
})

module.exports = mongoose.model('Tutorial', TutorialSchema)
