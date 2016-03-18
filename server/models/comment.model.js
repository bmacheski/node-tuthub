'use strict';

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: String,
  author: String
})

module.exports = mongoose.model('Comment', CommentSchema);
