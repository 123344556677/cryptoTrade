"use strict";
var dbConn = require("../../Config/db.config");

var bcrypt = require("bcrypt");
const saltRounds = 10;

/* Require JWT */
var jwt = require("jsonwebtoken");
var secret = require("../../Config/secret.config");
var jwtSecret = secret.jwt;


var Auth = function (auth) {
  this.firstname = auth.firstname;
  this.lastname = auth.lastname;
  this.email = auth.email;
  this.password = auth.password;
  this.referralcode = auth.referralcode;


  this.created_at = new Date();
}; 

Auth.create = function (auth, result) {
  bcrypt.hash(auth.password, saltRounds, function (err, hash) {
    if (err) {
      // If there's an error during hashing, return the error via the result callback
      result(err, null);
      console.log("error: ", err);
    } else {
      // If hashing is successful, proceed with the database query
      dbConn.query("INSERT INTO auth set firstname=?, lastname=?, email=?, password=?, referralcode=?",
        [auth.firstname, auth.lastname, auth.email, hash, auth.referralcode],
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
    }
  });
};

/*
  Error 0 means no error
  Error 1 means no Account
  Error 2 means invalid Password
*/

Auth.login = function (auth, result) {
  dbConn.query(
    `SELECT id, auth.id as authId, firstname, lastname, email, password, CONCAT(auth.firstname, auth.lastname) AS name, role FROM auth
    WHERE email = ? and status='Approve'`,
    [auth.email, auth.role],
    (err, res) => {
      console.log("error", err);
      if (res?.length != 0) {
        bcrypt.compare(auth.password, res[0].password, (err, hash) => {
          if (hash == true) {
            let id = res[0].id;
            var token = "";
            if (auth.remember === 1) {
              token = jwt.sign({ id }, jwtSecret, { expiresIn: 60 * 60 * 12 });
            } else {
              token = jwt.sign({ id }, jwtSecret, { expiresIn: 60 * 60 * 12 });
            }
            delete res[0].id;
            delete res[0].password;
            result(null, 0, token, res[0]);
          } else {
            result(null, 2);
          }
        });
      } else {
        result(null, { message: 'not approved!', approved: false });
      }
      
    }
  );
};

Auth.update = function (id, auth, image, result) {
  dbConn.query(
    `UPDATE user set firstname=?, lastname=?, email=?, phone=?, address=?, image=?, description=? WHERE id=?`,
    [auth.firstname, auth.lastname, auth.email, auth.phone, auth.address, image, auth.description, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Auth.findById = function (id, result) {
  dbConn.query("Select * from user where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  });
}; 
 
Auth.statusUpdate = function (id, result) {
  dbConn.query(
    `UPDATE user SET status=2 WHERE id = ?`, [id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("city : ", res);
        result(null, res);
      }
    }
  );
};

Auth.statusApprove = function (id, result) {
  dbConn.query(
    `UPDATE user SET status=1 WHERE id = ?`, [id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("city : ", res);
        result(null, res);
      }
    }
  );
};


Auth.level2 = function (id, result) {
  dbConn.query(
    `UPDATE user SET levels=2 WHERE id = ?`, [id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("city : ", res);
        result(null, res);
      }
    }
  );
};


Auth.delete = function (id, result) {
  dbConn.query("DELETE from user  WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Auth.Count = function (result) {
  dbConn.query(
    `SELECT COUNT(id) as id FROM user`,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("user : ", res);
        result(null, res);
      }
    }
  );
};

Auth.AllUsers = function (result) {
  dbConn.query(
    `SELECT * FROM auth `, 
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("user : ", res);
        result(null, res);
      }
    }
  );
};

Auth.resetPassword = function (email, result) {
  dbConn.query(
    `SELECT count(*) as total FROM users WHERE email = ?`,
    [email],
    (err, res) => {
      if (err) console.log(err);
      else {
        if (res[0].total >= 1) {
          dbConn.query(
            "INSERT INTO `reset-password`(email, status) VALUES (?, ?)",
            [email, 1],
            (err, response) => {
              const link = jwt.sign({ id: response.insertId }, jwtSecret, {
                expiresIn: 60 * 60 * 72,
              });

              ForgetEmail.forgot(email, link);
              result(null, res.insertId);
            }
          );
        }
      }
    }
  );
};

Auth.resetPasswordDetails = function (id, result) {
  dbConn.query(
    "SELECT * FROM `reset-password` WHERE id = ?",
    [id],
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        if (res[0] && res[0].status == 1) {
          dbConn.query("UPDATE `reset-password` SET status = 2", (err, res) => {
            result(null, {});
          });
        } else {
          result({ error: 1, msg: "wrong token" }, null);
        }
      }
    }
  );
};

Auth.changePassword = function (id, password, result) {
  dbConn.query(
    "SELECT * FROM `reset-password` WHERE id = ?",
    [id],
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        if (res[0] && res[0].email) {
          bcrypt.hash(password, saltRounds, (err, hash) => {
            dbConn.query(
              "UPDATE `users` SET password = ? WHERE email = ?",
              [hash, res[0].email],
              (err, res) => {
                result(null, {});
              }
            );
          });
        } else {
          result({ error: 1, msg: "wrong token" }, null);
        }
      }
    }
  );
};

module.exports = Auth;
