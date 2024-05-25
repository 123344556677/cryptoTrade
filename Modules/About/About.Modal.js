'use strict';
var dbConn = require('../../Config/db.config');
//brands object create

var About = function (aboutus) {

  this.question1 = aboutus.question1;
  this.answer1 = aboutus.answer1;

  this.question2 = aboutus.question2;
  this.answer2 = aboutus.answer2;

  this.question3 = aboutus.question3;
  this.answer3 = aboutus.answer3;

  this.question4 = aboutus.question4;
  this.answer4 = aboutus.answer4;

  this.question5 = aboutus.question5;
  this.answer5 = aboutus.answer5;


  this.created_at = new Date();
}; 

About.create = function (aboutus, result) {
    dbConn.query("INSERT INTO about SET question1=?, answer1=?, question2=?, answer2=?, question3=?, answer3=?, question4=?, answer4=?, question5=?, answer5=?",
        [aboutus.question1, aboutus.answer1, aboutus.question2, aboutus.answer2, aboutus.question3, aboutus.answer3, aboutus.question4, aboutus.answer4, aboutus.question5, aboutus.answer5],
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

About.findAll = function (result) {
  dbConn.query("Select * from about", function (err, res) {
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

module.exports = About;
