'use strict';

const extend = require('lodash/extend');
const uniqBy = require('lodash/uniqBy');

const { History, Song } = require('../models');

module.exports = {
  async index (req, res) {
    try {
      const userId = (await req.user).id;
      const history = await History.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Song
          }
        ]
      })
        .map(history => history.toJSON())
        .map(history => extend(
          {},
          history.Song,
          history
        ));

      res.send(uniqBy(history, historyEntry => historyEntry.SongId));
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to fetch the history.'
      });
    }
  },
  async post (req, res) {
    try {
      const userId = (await req.user).id;
      const { songId } = req.body;

      const history = await History.create({
        SongId: songId,
        UserId: userId
      });

      res.send(history);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to create the history entry.'
      });
    }
  }
};
