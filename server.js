const express = require('express');
const mysql = require('mysql');
const path = require('path');

//create connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'pos'
// });

// connection.connect();

//set up express
const app = express();
app.use(express.static('views'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/download', function (req, res) {
    res.download('README.md');
});

loginRouter = require('./routes/login')
app.use(loginRouter)

app.listen(80, '0.0.0.0');

console.log("server started, visit http://localhost/");