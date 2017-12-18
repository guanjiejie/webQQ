var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var members = require('./routes/members');
var login = require('./routes/login');
var msg = require('./routes/msg');
var other = require('./routes/other');
var grouping = require('./routes/grouping');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

/*
* 跨域
* */
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(function(req, res, next){
    console.log('');
    console.log("=============================");
    console.log("uu1:"+req.originalUrl);
    next();
});
app.use('/favicon.ico', other);
app.use('/login', login);
/*
* 判断是是否登录
* */
app.use(function (req, res, next) {
    var url = req.originalUrl;
    console.log("------------------------------------");
    console.log("url:" + url);
    if (url.indexOf('/login') < 0 && !req.session.isLogin) {
        console.log("yesyesyes");
        return res.redirect('/login');
    }
    next();
})
app.use('/', index);
app.use('/users', users);
app.use('/members', members);
app.use('/msg', msg);
app.use('/grouping', grouping);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
