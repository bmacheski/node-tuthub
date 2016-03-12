'use strict'

const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
  name: String
  tutorials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutorial'
  }]
})

module.exports = mongoose.model('Topic', TopicSchema)
