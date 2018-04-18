'use strict';

const AuthenticationControllerPolicy = require('./policies/authenticationControllerPolicy');
const AuthenticationController = require('./controllers/authenticationController');
const SongsController = require('./controllers/songsController');
const BookmarksController = require('./controllers/BookmarksController');

module.exports = app => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register);

  app.post('/login', AuthenticationController.login);

  app.get('/songs', SongsController.index);
  app.get('/songs/:songId', SongsController.show);
  app.put('/songs/:songId', SongsController.put);
  app.post('/songs', SongsController.post);

  app.get('/bookmarks', BookmarksController.index);
  app.post('/bookmarks', BookmarksController.post);
  app.delete('/bookmarks/:bookmarkId', BookmarksController.delete);
};
