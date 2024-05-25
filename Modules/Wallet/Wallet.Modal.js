'use strict';
var dbConn = require('../../Config/db.config');
//brands object create

var Wallet = function (walletadd) {

  this.wallet = walletadd.wallet;

  this.created_at = new Date();
}; 

Wallet.create = function (walletadd, result) {
    dbConn.query("INSERT INTO walletaddress SET wallet=?",
        [walletadd.wallet],
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

Wallet.findAll = function (result) {
  dbConn.query("Select * from walletaddress", function (err, res) {
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

module.exports = Wallet;
