var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const travelRouter = require('./app_server/routes/travel');
const roomsRouter = require('./app_server/routes/rooms');
const mealsRouter = require('./app_server/routes/meals');
const newsRouter = require('./app_server/routes/news');
const aboutRouter = require('./app_server/routes/about');

var app = express();
var hbs = require('hbs');

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// register handlebars helper function for dynamically selecting nav element
hbs.registerHelper('isSelected', function(value, selectedValue) {
  return value === selectedValue ? true : false;
});

// for debugging
hbs.registerHelper('logger', function(value) {
  return value;
})

// register handlebars partials (https://www.npmjs.com/package/hbs)
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/rooms', roomsRouter);
app.use('/meals', mealsRouter);
app.use('/news', newsRouter);
app.use('/about', aboutRouter);

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

module.exports = app;
