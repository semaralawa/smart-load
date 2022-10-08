const express = require("express");
const sessions = require("express-session");
const dotenv = require("dotenv");

// setup global config
dotenv.config();

//set up express
const app = express();
app.use(express.static("views"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// setup session
app.use(
  sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 }, // expired in one day
    resave: false,
  })
);

// user login checker
function userCheck(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.redirect("login");
    return;
  }
}

// route
app.get("/", function (req, res) {
  if (req.session.username) {
    res.redirect("dashboard");
  } else {
    res.redirect("login");
  }
});

app.get("/dashboard", userCheck, function (req, res) {
  res.render("dashboard", { userData: req.session });
});

authRouter = require("./routes/auth");
app.use(authRouter);

app.listen(process.env.PORT, "0.0.0.0", function () {
  console.log(`server started, visit http://localhost:${process.env.PORT}`);
});
