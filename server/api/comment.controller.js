'use strict'

const Comment  = require('../models/comment.model')
    , Tutorial = require('../models/tutorial.model')

const CommentController = {}

CommentController.findComment = (req, res) => {
  Tutorial
    .findById(req.params.tutId)
    .populate('comments')
    .exec((err, tutorials) => {
      if (err) throw err
      if (tutorials.comments) {
        res.send(tutorials.comments)
      }
      else res.send('There arent any comments')
    })
}

CommentController.saveComment = (req, res) => {
  Tutorial
    .findById(req.body.topic)
    .exec((err, tutorial) => {
      let comment = new Comment({
        comment: req.body.comment,
        author: req.body.author
      })
      comment.save()
      tutorial.comments.push(comment._id)
      tutorial.save()
      res.send(comment._id)
    })
}

CommentController.deleteComment = (req, res) => {
  Tutorial
    .findById(req.params.tutId)
    .populate('comments')
    .exec((err, tutorials) => {
      tutorials.comments.remove(req.params.commentId)
      tutorials.save()

      Comment.findById(req.params.commentId,
        (err, comment) => {
          if (err) throw err
        })
    })
  res.send('done')
}

module.exports = CommentController
