'use strict'

const TopicController    = require('./api/topic.controller')
    , CommentController  = require('./api/comment.controller')
    , TutorialController = require('./api/tutorial.controller')
    , BookmarkController = require('./api/bookmark.controller')
    , AuthController     = require('./auth/auth.controller')
    , passport           = require('passport')

module.exports = app => {

  // topic routes
  app.get('/api/topics', TopicController.findAllTopics)
  app.post('/api/topics', TopicController.saveTopic)

  // tutorial routes
  app.post('/api/tutorials', TutorialController.saveTutorial)
  app.get('/api/tutorials/:tutId', TutorialController.findTutorial)

  // comment routes
  app.post('/api/comments', CommentController.saveComment)
  app.get('/api/comments/:tutId', CommentController.findComment)
  app.delete('/api/comments/:tutId/:commentId', CommentController.deleteComment)

  // bookmark routes
  app.post('/api/bookmarks', BookmarkController.saveBookmark)
  app.get('/api/bookmarks/:user', BookmarkController.findBookmark)
  app.delete('/api/bookmarks/:user/:id', BookmarkController.deleteBookmark)

  // authentication routes
  app.post('/register', AuthController.register)
  app.post('/login', passport.authenticate('local'), AuthController.login)
  app.get('/logout', AuthController.logout)
}
