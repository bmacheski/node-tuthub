'use strict';

const TopicController    = require('./api/topic.controller')
    , CommentController  = require('./api/comment.controller')
    , TutorialController = require('./api/tutorial.controller')
    , BookmarkController = require('./api/bookmark.controller')
    , AuthController     = require('./auth/auth.controller')
    , passport           = require('passport');

module.exports = app => {

  // topics
  app.get('/api/topics', TopicController.findAllTopics);
  app.post('/api/topics', TopicController.saveTopic);

  // tutorials
  app.post('/api/tutorials', TutorialController.saveTutorial);
  app.post('/api/tutorials/vote', TutorialController.upvoteTutorial);
  app.post('/api/tutorials/remove', TutorialController.removeTutorial);
  app.get('/api/tutorials/:tutId', TutorialController.findTutorial);
  app.get('/api/tutorials/find/:userId', TutorialController.findCreatedTutorial);

  // comments
  app.post('/api/comments', CommentController.saveComment);
  app.get('/api/comments/:tutId', CommentController.findComment);
  app.delete('/api/comments/:tutId/:commentId', CommentController.deleteComment);

  // bookmarks
  app.post('/api/bookmarks', BookmarkController.saveBookmark);
  app.get('/api/bookmarks/:user', BookmarkController.findBookmark);
  app.delete('/api/bookmarks/:user/:id', BookmarkController.deleteBookmark);

  // authentication
  app.post('/register', AuthController.register);
  app.post('/login', passport.authenticate('local'), AuthController.login);
  app.get('/logout', AuthController.logout);
}
