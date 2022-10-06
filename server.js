const express = require("express");

//set up express
const app = express();
app.use(express.static("views"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// route
app.get("/", function (req, res) {
  res.render("index");
});

app.get("/dashboard", function (req, res) {
  res.render("dashboard");
});

authRouter = require("./routes/auth");
app.use(authRouter);

app.listen(process.env.PORT, "0.0.0.0");

console.log(`server started, visit http://localhost:${process.env.PORT}`);
