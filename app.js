var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var devRouter = require('./routes/dev');
var login = require('./routes/login');
var register = require('./routes/register');

var app = express();
var cors = require('cors');
const corsOptions = {
  // origin: ['https://www.example.com', 'https://localhost:3000', 'http://localhost:3000','https://168money-line.local/backend/','https://demo.168money.com.tw/','https://localhost'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  origin: '*',
  allowedHeaders: ['Content-Type', '*'],
  preflightContinue: false,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

/*********** swagger UI Develop ***********/
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
var doc = YAML.load('./src/logisticsAPI_doc.yml');

app.use('/devAPI', swaggerUi.serve, swaggerUi.setup(doc));
/*********** swagger UI Develop ***********/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/dev', devRouter);
app.use('/login', login);
app.use('/register', register);
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
