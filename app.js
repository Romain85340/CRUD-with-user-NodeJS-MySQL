var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require("mysql");
const util = require('util');
const bcrypt = require('bcrypt');
var session = require('express-session');
var methodOverride = require('method-override');
require('dotenv').config()



var app = express();

// Mysql
const db = mysql.createConnection ({    
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) { throw err;}
  console.log('Connecté à la base MySQL');
});

// Express-session
app.use(session({
  secret: 'shhuuuuut',
  resave: false,
  saveUninitialized: true,
  name: 'biscuit',
  cookie: {   maxAge: 24 * 60 * 60 * 7 * 1000 }
}))

const query = util.promisify(db.query).bind(db)

global.db = db;
global.query = query;

// methode override
app.use(methodOverride('_method'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter)
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
 