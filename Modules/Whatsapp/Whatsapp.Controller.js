'use strict';

const Whatsapp = require('./Whatsapp.Modal');

exports.findAll = function (req, res) {
    Whatsapp.findAll(function (err, Whatsapp) {
      if (err)
        res.send(err);
      res.send(Whatsapp);
    });
  };
  
  exports.create = function (req, res) {
    const new_whatsapp = new Whatsapp(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
      Whatsapp.create(new_whatsapp, function (err, Whatsapp) {
        if (err)
          res.send(err);
        res.json({ error: false, message: "Whatsapp added successfully!", data: Whatsapp });
      });
    }
  };
   