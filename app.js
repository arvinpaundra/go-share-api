const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./app/api/auth/router');
const contentsRouter = require('./app/api/contents/router');
const pointsRouter = require('./app/api/points/router');
const creatorsRouter = require('./app/api/creators/router');
const vouchersRouter = require('./app/api/vouchers/router');
const transactionsRouter = require('./app/api/transactions/router');

const app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

const URL = '/api/v1';

app.use(`${URL}/auth`, authRouter);
app.use(`${URL}/contents`, contentsRouter);
app.use(`${URL}/points/`, pointsRouter);
app.use(`${URL}/creators`, creatorsRouter);
app.use(`${URL}/vouchers`, vouchersRouter);
app.use(`${URL}/transactions`, transactionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(() => {
  console.log('Server running on http://localhost:5000/');
});

module.exports = app;
