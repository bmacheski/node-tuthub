'use strict'

const User     = require('../models/user.model')
    , Tutorial = require('../models/tutorial.model')

const BookmarkController = {}

BookmarkController.findBookmark = (req, res) => {
  User
    .findOne({ username: req.params.user })
    .populate('bookmarks')
    .exec((err, user) => {
      if (err) throw err
      if (user && user.bookmarks) {
        res.send(user.bookmarks)
      } else {
        res.send('no bookmarks')
      }
    })
}

BookmarkController.saveBookmark = (req, res) => {
  User
    .findOne({ username: req.body.username })
    .exec((err, user) => {
      if (user && user.bookmarks) {
        user.bookmarks.push(req.body.id)
        user.save()
        res.send({ message: 'bookmark saved' })
      } else {
        res.send('woops')
      }
    })

}

BookmarkController.deleteBookmark = (req, res) => {
  User
    .findOne({ email: req.params.user })
    .populate('bookmarks')
    .exec((err, user) => {
      if (err) throw err
      if (user && user.bookmarks) {
        let ids = user.bookmarks.map((bookmark) => bookmark._id.toString())
        let idx = ids.indexOf(req.params.id)
        user.bookmarks.remove(user.bookmarks[idx])
        user.save()
        res.send('deleted.')
      } else {
        res.send('nope')
      }
    })
}

module.exports = BookmarkController
