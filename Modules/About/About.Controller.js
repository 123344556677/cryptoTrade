'use strict';

const About = require('./About.Modal');

exports.findAll = function (req, res) {
    About.findAll(function (err, About) {
      if (err)
        res.send(err);
      res.send(About);
    });
  };
  
  exports.create = function (req, res) {
    const new_about = new About(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
      About.create(new_about, function (err, About) {
        if (err)
          res.send(err);
        res.json({ error: false, message: "About added successfully!", data: About });
      });
    }
  };
   