'use strict';

const AuthenticationController = require('./controllers/authenticationController');
const AuthenticationControllerPolicy = require('./policies/authenticationControllerPolicy');

module.exports = app => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register);
};
