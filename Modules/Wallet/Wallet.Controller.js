'use strict';

const Wallet = require('./Wallet.Modal');

exports.findAll = function (req, res) {
    Wallet.findAll(function (err, Wallet) {
      if (err)
        res.send(err);
      res.send(Wallet);
    });
  };
  
  exports.create = function (req, res) {
    const new_wallet = new Wallet(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
      Wallet.create(new_wallet, function (err, Wallet) {
        if (err)
          res.send(err);
        res.json({ error: false, message: "Wallet added successfully!", data: Wallet });
      });
    }
  };
   