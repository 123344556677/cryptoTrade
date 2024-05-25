'use strict';
var dbConn = require('../../Config/db.config');
//brands object create

var Announcement = function (announcements) {

  this.announcement = announcements.announcement;

  this.created_at = new Date();
}; 

Announcement.create = function (announcements, result) {
    dbConn.query("INSERT INTO announcemnets SET announcement=?",
        [announcements.announcement],
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

Announcement.findAll = function (result) {
  dbConn.query("Select * from announcemnets", function (err, res) {
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

module.exports = Announcement;
