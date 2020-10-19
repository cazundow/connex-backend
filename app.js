var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const counter = new client.Counter({
  name: 'node_request_operations_total',
  help: 'The total number of processed requests'
});

// const histogram = new client.Histogram({
//   name: 'node_request_duration_seconds',
//   help: 'Histogram for the duration in seconds.',
//   buckets: [1, 2, 5, 6, 10]
// });



app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/metrics', (req, res) => {
  counter.inc();
  res.set('Content-Type', client.register.contentType)
  res.send(client.register.metrics());
})

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
