'use strict'

const mongoose = require('mongoose')

const TutorialSchema = new mongoose.Schema({
  name: String,
  url: String
})

module.exports = mongoose.model('Tutorial', TutorialSchema)
