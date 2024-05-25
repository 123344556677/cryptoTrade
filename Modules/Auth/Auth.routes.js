const express = require("express");
const router = express.Router();


const authController = require('./Auth.controller');

router
  .get("/count", authController.Count)

  .get("/users", authController.AllUsers)

  .post("/login", authController.login)

  .get("/verify-token", (err, res) => { res.json('1') })

  .get("/reset-password", authController.resetPassword) // to reset a user password

  .post("/", authController.create)

  .post("/reset-password", authController.resetPasswordDetails) // to reset a user password
  .post("/reset/password", authController.changePassword)

  .get("/:id", authController.findById)

  .put("/status/suspend/:id", authController.statusUpdate)

  .put("/status/approve/:id", authController.statusApprove)

  .put("/status/level2/:id", authController.level2)

  .delete('/delete/:id', authController.delete);


module.exports = router;