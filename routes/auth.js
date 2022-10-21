const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");

// setup global config
dotenv.config();

const router = express.Router();

//create connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
connection.connect();

router
  .route("/login")
  .get(function (req, res) {
    res.render("login");
  })
  .post(function (req, res) {
    const user = req.body.username;
    connection.query(
      "SELECT * FROM user WHERE username = ?",
      [user],
      (err, results) => {
        if (results == 0) {
          res.render("login", {
            userError: "username tidak terdaftar",
          });
          return;
        }
        if (req.body.password != results[0].password) {
          console.log("wrong password");
          res.render("login", { passwordError: "Password salah" });
          return;
        }

        req.session.username = results[0].username;
        res.redirect("/dashboard");
      }
    );
  });

// add new user
// TODO: ADD PASSWORD ENCRYPTION AND MAKE DB FOR IOT DEVICE
router
  .route("/register")
  .get(function (req, res) {
    res.render("register");
  })
  .post(function (req, res) {
    let data = req.body;

    // check password and repeated password
    if (data["password"] != data["repeatPassword"]) {
      res.render("register", { passwordError: "Password tidak sama" });
      return;
    }
    delete data.repeatPassword;

    // insert user data to database
    connection.query("INSERT INTO user SET ?", [data], (err, results) => {
      if (err) {
        console.log(err);
        // throw err;
        res.render("register", { passwordError: "username telah ada" });
        return;
      }
      req.session.username = results[0].username;
      console.log("new user added");
      res.redirect("/dashboard");
    });
  });

router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("login");
});

module.exports = router;
