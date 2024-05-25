'use strict';
var dbConn = require('../../Config/db.config');
//brands object create

var Recharge = function (recharge_amount) {

  this.authId = recharge_amount.authId;

  this.deposit = recharge_amount.deposit;
  this.total = recharge_amount.total;

  this.created_at = new Date();
}; 

Recharge.create = function (recharge_amount, result) {
    dbConn.query("INSERT INTO recharge SET authId=?, deposit=?, total=?",
        [recharge_amount.authId, recharge_amount.deposit, recharge_amount.total],
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

Recharge.findById = function (id, result) {
  dbConn.query("Select * from recharge where authId = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
};

Recharge.findAll = function (result) {
  dbConn.query("Select * from recharge", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    }
    else {
      console.log('recharge : ', res);
      result(null, res);
    }
  });
}; 

module.exports = Recharge;
