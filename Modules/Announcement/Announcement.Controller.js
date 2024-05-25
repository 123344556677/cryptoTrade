'use strict';

const Announcement = require('./Announcement.Modal');

exports.findAll = function (req, res) {
    Announcement.findAll(function (err, Announcement) {
      if (err)
        res.send(err);
      res.send(Announcement);
    });
  };
  
  exports.create = function (req, res) {
    const new_announcement = new Announcement(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
      Announcement.create(new_announcement, function (err, Announcement) {
        if (err)
          res.send(err);
        res.json({ error: false, message: "Announcement added successfully!", data: Announcement });
      });
    }
  };
   