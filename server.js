const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");

// setup global config
dotenv.config();

//create connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
connection.connect();

//set up express
const app = express();
app.use(express.static("views"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// route
app.get("/", function (req, res) {
  res.render("dashboard");
});

authRouter = require("./routes/auth");
app.use(authRouter);

app.listen(process.env.PORT, "0.0.0.0");

console.log(`server started, visit http://localhost:${process.env.PORT}`);
