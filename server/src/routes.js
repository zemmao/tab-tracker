'use strict';

const AuthenticationControllerPolicy = require('./policies/authenticationControllerPolicy');
const AuthenticationController = require('./controllers/authenticationController');
const SongsController = require('./controllers/songsController');
const BookmarksController = require('./controllers/bookmarksController');
const HistoryController = require('./controllers/historyController');
const isAuthenticated = require('./policies/authenticationChecker');

module.exports = app => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register);

  app.post('/login', AuthenticationController.login);

  app.get('/songs', SongsController.index);
  app.get('/songs/:songId', SongsController.show);
  app.put('/songs/:songId', SongsController.put);
  app.post('/songs', SongsController.post);

  app.get('/bookmarks',
    isAuthenticated,
    BookmarksController.index
  );
  app.post('/bookmarks',
    isAuthenticated,
    BookmarksController.post
  );
  app.delete('/bookmarks/:bookmarkId',
    isAuthenticated,
    BookmarksController.delete
  );

  app.get('/history',
    isAuthenticated,
    HistoryController.index
  );
  app.post('/history',
    isAuthenticated,
    HistoryController.post
  );
};
