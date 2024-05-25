'use strict';
var dbConn = require('../../Config/db.config');
//brands object create

var WhatsApp = function (whatsappno) {

  this.whatsapp = whatsappno.whatsapp;

  this.created_at = new Date();
}; 

WhatsApp.create = function (whatsappno, result) {
    dbConn.query("INSERT INTO whastappno SET whatsapp=?",
        [whatsappno.whatsapp],
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

WhatsApp.findAll = function (result) {
  dbConn.query("Select * from whastappno", function (err, res) {
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

module.exports = WhatsApp;
