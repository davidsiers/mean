/*jshint esversion: 8 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bluebird = require('bluebird');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// var index = require('./routes/index.route');
// var users = require('./routes/users.route');

var api = require('./routes/api.route');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Use the API routes for all routes matching /api
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// mongoose setup
var mongoose = require('mongoose');
mongoose.Promise = bluebird;
mongoose.connect('mongodb+srv://dsiers:kjv1611@sermon-app-s3dr2.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb+srv://dsiers:kjv1611@sermon-app-s3dr2.mongodb.net/test?retryWrites=true&w=majority`); })
    .catch(e => {
        console.log(e);
        console.log(`Error Connecting to the Mongodb Database at URL : mongodb+srv://dsiers:kjv1611@sermon-app-s3dr2.mongodb.net/test?retryWrites=true&w=majority`);
    });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

module.exports = app;