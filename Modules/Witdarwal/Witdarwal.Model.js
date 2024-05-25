'use strict';
var dbConn = require('../../Config/db.config');
//brands object create

var Witdarwal = function (witdarwalamount) {

  this.authId = witdarwalamount.authId;

  this.witdarwal_amount = witdarwalamount.witdarwal_amount;

  this.created_at = new Date();
}; 

Witdarwal.create = function (witdarwalamount, result) {
    dbConn.query("INSERT INTO witdarwal SET authId=?, witdarwal_amount=?",
        [witdarwalamount.authId, witdarwalamount.witdarwal_amount],
        function (err, res) {
            if (err) {
                // If there's an error during the database query, return the error via the result callback
                result(err, null);
                console.log("error: ", err);
            } else {
                // If the query is successful, return the insertId via the result callback
                result(null, res.insertId);
            }
        }
    );
};

Witdarwal.findByWallet = function (id, result) {
  dbConn.query("Select * from addwallet where authId = ?", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};

Witdarwal.findByWitdarwal = function (id, result) {
  dbConn.query("Select * from witdarwal where authId = ?", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};

Witdarwal.findAll = function (result) {
  dbConn.query("Select * from addwallet", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      console.log('witdarwal : ', res);
      result(null, res);
    }
  });
}; 

module.exports = Witdarwal;
