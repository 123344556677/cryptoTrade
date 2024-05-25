'use strict';
var dbConn = require('../../Config/db.config');
//brands object create

var Witdarwal = function (witdarwal_amount) {

  this.authId = witdarwal_amount.authId;

  this.agreement = witdarwal_amount.agreement;
  this.wallet_address = witdarwal_amount.wallet_address;

  this.created_at = new Date();
}; 

Witdarwal.create = function (witdarwal_amount, result) {
    dbConn.query("INSERT INTO addwallet SET authId=?, agreement=?, wallet_address=?",
        [witdarwal_amount.authId, witdarwal_amount.agreement, witdarwal_amount.wallet_address],
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

Witdarwal.findById = function (id, result) {
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
