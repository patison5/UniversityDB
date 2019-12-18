const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);


const { db, checkConn } = require('./db');

const routes = require('./routes')

// сессии
const sessionStore = new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'fuckDB'
});

var app = express();

app.use(session({
    key: 'user_cookie',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: false
}));



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('*/public', express.static(__dirname + '/public'));

app.use(bodyParser.json());


app.use('/api/auth', routes.auth)
app.use('/api/students', routes.students)
app.use('/api/teachers', routes.teachers)


app.get("/", (req, res) => {
  res.render("index", {
    user: {
      id:       req.session.userId,
      login:    req.session.userLogin,
      authLvl:  req.session.userAuthLvl,
    }
  });
});



checkConn(function (err) {
  if (err) 
    return console.log(err);

  app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
  })
});