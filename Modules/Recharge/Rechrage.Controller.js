"use strict";
const Recharge = require("./Recharge.Model");

/* Require JWT */
var jwt = require("jsonwebtoken");
var secret = require("../../Config/secret.config");
var jwtSecret = secret.jwt;

exports.findById = function (req, res) {
  Recharge.findById(req.params.id, function (err, Recharge) {
    if (err) res.send(err);
    res.json(Recharge);
  });
};


exports.findAll = function (req, res) {
  Recharge.findAll(function (err, Recharge) {
    if (err) res.send(err);
    res.send(Recharge);
  });
};
 
exports.create = function (req, res) {
  const token = req.headers["x-access-token"];
  jwt.verify(token, jwtSecret, function (err, decoded) {
    if (err) {
      res.status(401).json({ error: true, message: "Authentication Failed" });
    } else {
      const new_Recharge = new Recharge(req.body);
      // Handles null error
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: true, message: "Please provide all required fields" });
      } else {
        Recharge.create(new_Recharge, function (err, recharge) {
          if (err) {
            res.status(500).json({ error: true, message: "Failed to add recharge" });
          } else {
            res.status(201).json({ error: false, message: "Recharge added successfully", data: recharge });
          }
        });
      }
    }
  });
};
