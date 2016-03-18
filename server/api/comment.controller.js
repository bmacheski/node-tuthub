'use strict';

const Comment  = require('../models/comment.model')
    , Tutorial = require('../models/tutorial.model');

const CommentController = {};

CommentController.findComment = (req, res, next) => {
  Tutorial
    .findById(req.params.tutId)
    .populate('comments')
    .exec((err, tutorials) => {
      if (err) return next(err);

      if (tutorials.comments) {
        res.status(200).send(tutorials.comments);
      } else {
        res.send('No comments found.');
      }
    })
}

CommentController.saveComment = (req, res, next) => {
  Tutorial
    .findById(req.body.topic)
    .exec((err, tutorial) => {
      if (err) return next(err);

      let comment = new Comment({
        comment: req.body.comment,
        author: req.body.author
      })

      comment.save();
      tutorial.comments.push(comment._id);
      tutorial.save();
      res.status(200).send(comment._id);
    })
}

CommentController.deleteComment = (req, res, next) => {
  Tutorial
    .findById(req.params.tutId)
    .populate('comments')
    .exec((err, tutorials) => {
      if (err) return next(err);

      tutorials.comments.remove(req.params.commentId);
      tutorials.save();

      Comment.findByIdAndRemove(req.params.commentId,
        (err, comment) => {
          if (err) return next(err);
        })
    })
    res.sendStatus(200);
}

module.exports = CommentController;
