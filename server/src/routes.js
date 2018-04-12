'use strict';

const AuthenticationControllerPolicy = require('./policies/authenticationControllerPolicy');
const AuthenticationController = require('./controllers/authenticationController');
const SongsController = require('./controllers/songsController');

module.exports = app => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register);

  app.post('/login', AuthenticationController.login);

  app.get('/songs', SongsController.index);
  app.post('/songs', SongsController.post);
};
