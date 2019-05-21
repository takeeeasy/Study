var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs')
var admin = require('firebase-admin');
var firebase = require('firebase');


var refreshToken = '762544477250-nqq6pkcnaipch1b7t59fr2d8g57amksq.apps.googleusercontent.com';
// var serviceAccount = require('C:/Users/giant/Desktop/approval-project-231703-firebase-adminsdk-arv33-ee638dcef6.json');

admin.initializeApp({
  credential: admin.credential.refreshToken(refreshToken),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function(){
	console.log("Express server has started on port 3000")
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
	secret: '@#@$MYSIGN#@$#$',
	resave: false,
	saveUninitialized: true
}));

var router = require('./router/main')(app, fs);

