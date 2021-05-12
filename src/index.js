var express = require('express'),
    async = require('async'),
    pg = require("./models/db"),
    path = require("path"),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    app = express(),
    server = require('http').Server(app),
    passport = require('passport'),
    session = require('express-session')

var auth = require("./routes/localAuth")
var data = require("./routes/data")
var widgets = require("./routes/widgets")

var port = process.env.HTTP_PORT || 8080;

var Logger = function (req, res, next) {
  console.log(req);
  next();
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '../public'));

app.use(session({
  secret: 'omgbiggalopes123',
  resave: false,
  saveUninitialized: false,
}));

function isAuthenticated(req, res, next) {
  console.log(req.session.passport);
  if (typeof req.session.passport == "undefined") {
      console.log("aya");
      res.redirect("/");
  } else {
      return next();
  }
}

app.get('/', function (req, res) {
  res.redirect("/login");
});

app.get('/login', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/views/login.html'));
});

app.get('/signup', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/views/signup.html'));
});

app.use(auth);
app.use(data);
app.use(widgets);

app.get('/board/home', isAuthenticated, function (req, res) {
  res.sendFile(path.resolve(__dirname + '/views/mainPage.html'));
});

server.listen(3000, function () {
  var port = server.address().port;
  console.log('App running on port ' + port);
});
