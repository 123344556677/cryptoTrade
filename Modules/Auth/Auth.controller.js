"use strict";
const Auth = require("./Auth.model.js");


/* Require JWT */
var jwt = require("jsonwebtoken");
var secret = require("../../Config/secret.config.js");
var jwtSecret = secret.jwt;

exports.create = function (req, res) {
  const new_auth = new Auth(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Auth.create(new_auth, function (err, auth) {
      if (err)
        res.send(err);
      res.json({ error: false, message: "Auth added successfully!", data: auth });
    });
  }
};

exports.findAllUser = function (req, res) {
  Auth.findAllUser(function (err, auth) {
    if (err) res.send(err);
    res.send(auth);
  }); 
}; 

exports.findAllStaff = function (req, res) {
  Auth.findAllStaff(function (err, auth) {
    if (err) res.send(err);
    res.send(auth);
  }); 
}; 

 
exports.findAllShop = function (req, res) {
  Auth.findAllShop(function (err, auth) {
    if (err) res.send(err);
    res.send(auth);
  });  
}; 

exports.findById = function(req, res) {
  Auth.findById(req.params.id, function(err, auth) {
    console.log(auth);
    if (err) res.send(err);
    res.json(auth);
  });
};

// Login a user 
exports.login = function (req, res) {
  const data = new Auth(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Auth.login(data, function (err, error, token, user) {
      if (err) res.send(err);
      res.json({ error: error, token: token, user:user })
    })
  }
}; 

exports.socialLogin = function (req, res, next) {
  try {
    
    // handles null error for token
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, config.tokenSecret, function (err, decoded) {
      if (err) {
        console.error('Error: ', err);
        return res.status(401).json({ message: "Unauthorized" });
      }

      // If you need to do additional checks or processing, you can do it here

      // Pass the decoded information to the next middleware or route handler
      req.user = decoded;

      return next();
    });
  } catch (err) {
    console.error('Error: ', err);
    res.status(401).json({ message: "Unauthorized" });
  }
};


// exports.create = function (req, res) {
//   const new_auth = new Auth(req.body);
//   const banner_image = (typeof req.file === 'undefined') ? '' : req.file.key;
//   //handles null error
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res.status(400).send({ error: true, message: 'Please provide all required field' });
//   } else {
//     Auth.create(new_auth, banner_image, function (err, Auth) {
//       if (err)
//         res.send(err);
//       res.json({ error: false, message: "Super Category added successfully!", data: Auth });
//     });
//   }
// };

  
exports.statusUpdate = function (req, res) {
  Auth.statusUpdate(req.params.id, function (err, auth) {
    if (err) res.send(err);
    res.json({ error: false, message: "Auth Status Approve" });
  });
};

exports.statusApprove = function (req, res) {
  Auth.statusApprove(req.params.id, function (err, auth) {
    if (err) res.send(err);
    res.json({ error: false, message: "Auth Status Approve" });
  });
};

exports.level2 = function (req, res) {
  Auth.level2(req.params.id, function (err, auth) {
    if (err) res.send(err);
    res.json({ error: false, message: "Level Change" });
  });
};

exports.update = function (req, res) {
  const token = req.headers["x-access-token"];
  jwt.verify(token, jwtSecret, function (err, decoded) {
    if (decoded) {
      const new_auth = new Auth(req.body);
      const image = typeof req.file === "undefined" ? "" : req.file.key;

      //handles null error
      Auth.update(decoded.id, new_auth, image, function (err, image) {
        if (err) res.send(err);
        res.json({
          error: false,
          message: "User updated successfully!",
          data: image,
        });
      });
    } else {
      res.json({ error: false, message: "Authentication Failed" });
    }
  });
};


exports.delete = function (req, res) {
  Auth.delete(req.params.id, function (err, staff) {
    if (err)
      res.send(err);
    res.json({ error: false, message: 'User successfully deleted' });
  });
};

exports.AllUsers = function (req, res) {
  Auth.AllUsers(function (err, auth) {
    if (err) res.send(err);
    res.send(auth);
  });
};

exports.Count = function (req, res) {
  Auth.Count(function (err, auth) {
    if (err) res.send(err);
    res.send(auth);
  });
};

exports.CountStaff = function (req, res) {
  Auth.CountStaff(function (err, auth) {
    if (err) res.send(err);
    res.send(auth);
  });
};


exports.resetPassword = function (req, res) {
  Auth.resetPassword(req.query.email, function (err, response) {
    if (err) res.send(false);
    else res.json({ error: 0 });
  });
};

exports.resetPasswordDetails = function (req, res) {
  jwt.verify(req.body.id, jwtSecret, (err, decoded) => {
    if (decoded) {
      Auth.resetPasswordDetails(decoded.id, function (err, response) {
        if (err) res.send({ error: 1, msg: "system error" });
        else res.json(response);
      });
    } else {
      res.send({ error: 1, msg: "token not valid" });
    }
  });
};

exports.changePassword = function (req, res) {
  jwt.verify(req.body.id, jwtSecret, (err, decoded) => {
    if (decoded) {
      Auth.changePassword(decoded.id, req.body.password, function (
        err,
        response
      ) {
        if (err) res.send({ error: 1, msg: "system error" });
        else res.json(response);
      });
    } else {
      res.send({ error: 1, msg: "token not valid" });
    }
  });
};