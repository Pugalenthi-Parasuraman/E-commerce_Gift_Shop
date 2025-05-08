var createError = require('http-errors');
var express = require('express');
const errorMiddleware = require("./middlewares/error")
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var productsRouter = require("./routes/productsRoute")
var authRouter = require("./routes/authRoute");
var orderRouter = require("./routes/orderRoute");
var paymentRouter = require("./routes/payment");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname,"uploads")))
app.use(express.static(path.join(__dirname, 'public')));

// Serve the Assets folder
// app.use('/Assets', express.static(path.join(__dirname, 'Assets')));


app.use("/api/v1",productsRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", paymentRouter);

app.use(errorMiddleware);
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
