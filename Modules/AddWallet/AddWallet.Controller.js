"use strict";
const Withdarwal = require("./AddWallet.Model");

/* Require JWT */
var jwt = require("jsonwebtoken");
var secret = require("../../Config/secret.config");
var jwtSecret = secret.jwt;

exports.findById = function (req, res) {
  Withdarwal.findById(req.params.id, function (err, Withdarwal) {
    if (err) res.send(err);
    res.json(Withdarwal);
  });
};


exports.findAll = function (req, res) {
  Withdarwal.findAll(function (err, Withdarwal) {
    if (err) res.send(err);
    res.send(Withdarwal);
  });
};

exports.create = function (req, res) {
    const new_witdarwal = new Withdarwal(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
    Withdarwal.create(new_witdarwal, function (err, withdarwal) {
        if (err)
          res.send(err);
        res.json({ error: false, message: "Withdarwal added successfully!", data: withdarwal });
      });
    }
  };
 
// exports.create = function (req, res) {
//   const token = req.headers["x-access-token"];
//   jwt.verify(token, jwtSecret, function (err, decoded) {
//     if (err) {
//       res.status(401).json({ error: true, message: "Authentication Failed" });
//     } else {
//       const new_withdarwal = new withdarwal(req.body);
//       // Handles null error
//       if (Object.keys(req.body).length === 0) {
//         res.status(400).json({ error: true, message: "Please provide all required fields" });
//       } else {
//         Withdarwal.create(new_withdarwal, function (err, Withdarwal) {
//           if (err) {
//             res.status(500).json({ error: true, message: "Failed to add withdarwal" });
//           } else {
//             res.status(201).json({ error: false, message: "Recharge added successfully", data: recharge });
//           }
//         });
//       }
//     }
//   });
// };
