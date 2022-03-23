var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var devRouter = require('./routes/dev');


var app = express();
var cors = require('cors');
const corsOptions = {
  origin: ['https://www.example.com', 'https://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', '*'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

/*********** swagger UI Develop ***********/
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
var doc = YAML.load('./src/logisticsAPI_doc.yml')

// app.use('/dev', swaggerUi.serve,swaggerUi.setup(doc));
/*********** swagger UI Develop ***********/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/dev', devRouter);

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

module.exports = app;
