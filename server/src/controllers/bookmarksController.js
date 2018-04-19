'use strict';

const extend = require('lodash/extend');

const { Bookmark, Song } = require('../models');

module.exports = {
  async index (req, res) {
    try {
      const userId = (await req.user).id;
      const { songId } = req.query;

      const where = {
        UserId: userId
      };
      if (songId) where.SongId = songId;

      const bookmarks = await Bookmark.findAll({
        where,
        include: [
          {
            model: Song
          }
        ]
      })
        .map(bookmark => bookmark.toJSON())
        .map(bookmark => extend(
          {},
          bookmark.Song,
          bookmark
        ));

      res.send(bookmarks);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to fetch the bookmark.'
      });
    }
  },
  async post (req, res) {
    try {
      const userId = (await req.user).id;
      const { songId} = req.body.params;
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      });

      if (bookmark) {
        return res.status(400).send({
          error: 'You already have this set as a bookmark'
        });
      }

      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      });
      res.send(newBookmark);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to create the bookmark.'
      });
    }
  },
  async delete (req, res) {
    try {
      const userId = (await req.user).id;
      const { bookmarkId } = req.params;
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: userId
        }
      });
      if (!bookmark) {
        res.status(403).send({
          error: 'You do not have an access to this bookmark.'
        });
      }

      await bookmark.destroy();
      res.send(bookmark);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to delete the bookmark.'
      });
    }
  }
};
