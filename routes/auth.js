const express = require("express");

const router = express.Router();

router
  .route("/login")
  .get(function (req, res) {
    res.render("login");
  })
  .post(function (req, res) {
    res.send(req.body);
  })
  .put(function (req, res) {
    res.send("puted");
  });

router
  .route("/register")
  .get(function (req, res) {
    res.render("register");
  })
  .post(function (req, res) {
    res.send(req.body);
  })
  .put(function (req, res) {
    res.send("puted");
  });
module.exports = router;
