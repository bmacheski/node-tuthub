'use strict'

const User     = require('../models/user.model')
    , Tutorial = require('../models/tutorial.model')

const BookmarkController = {}

BookmarkController.findBookmark = (req, res) => {
  User
    .findOne({ email: req.params.user })
    .populate('bookmarks')
    .exec((err, user) => {
      if (err) throw err
      res.send(user.bookmarks)
    })
}

BookmarkController.saveBookmark = (req, res) => {
  User
    .findOne({ email: req.body.email})
    .exec((err, user) => {
      user.bookmarks.push(req.body.id)
      user.save()
    })
  res.send({ message: 'bookmark saved' })
}

module.exports = BookmarkController
