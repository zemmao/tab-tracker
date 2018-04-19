'use strict';

const Promise = require('bluebird');

const {
  sequelize,
  User,
  Song,
  Bookmark,
  History
} = require('../src/models');
const users = require('./users');
const songs = require('./songs');
const bookmarks = require('./bookmarks');
const history = require('./history');

sequelize.sync({ force: true })
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user);
      })
    );

    await Promise.all(
      songs.map(song => {
        Song.create(song);
      })
    );

    await Promise.all(
      bookmarks.map(bookmark => {
        Bookmark.create(bookmark);
      })
    );

    await Promise.all(
      history.map(historyEntry => {
        History.create(historyEntry);
      })
    );
  });
