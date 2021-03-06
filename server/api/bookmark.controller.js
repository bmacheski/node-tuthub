'use strict';

const User     = require('../models/user.model')
    , Tutorial = require('../models/tutorial.model');

const BookmarkController = {};

BookmarkController.findBookmark = (req, res, next) => {
  User
    .findOne({ username: req.params.user })
    .populate('bookmarks')
    .exec((err, user) => {
      if (err) return next(err);

      if (user && user.bookmarks) {
        res.status(200).send(user.bookmarks);
      } else {
        res.send({ message: 'No bookmarks found' });
      }
    })
}

BookmarkController.saveBookmark = (req, res) => {
  User
    .findOne({ username: req.body.username })
    .exec((err, user) => {
      if (err) return next(err);

      if (user && user.bookmarks) {
        user.bookmarks.push(req.body.id);
        user.save((err) => {
          if (err) return next(err);

          res.status(200).send({ message: 'bookmark saved' });
        });
      } else {
        console.log('something went wrong');
      }
    })
}

BookmarkController.deleteBookmark = (req, res) => {
  User
    .findOne({ username: req.params.user })
    .populate('bookmarks')
    .exec((err, user) => {
      if (err) return next(err);

      if (user && user.bookmarks) {
        let ids = user.bookmarks.map((bookmark) => bookmark._id.toString());
        let idx = ids.indexOf(req.params.id);

        user.bookmarks.remove(user.bookmarks[idx]);
        user.save((err) => {
          if (err) return next(err);

          res.status(200).send('Bookmark deleted successfully.');
        });

      } else {
        console.log('Something went wrong');
      }
    })
}

module.exports = BookmarkController;
