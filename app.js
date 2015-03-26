var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),
    passport = require('passport'),
    passportConfig = require('./config/passport'),
    indexController = require('./controllers/index.js');

mongoose.connect('mongodb://localhost/meishi');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(flash());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', indexController.index);
app.get('/auth', passport.authenticate('linkedin'), function(req, res){});
app.get('/auth/callback', passport.authenticate('linkedin', {failureRedirect: '/'}),
    function(req, res){
        res.redirect('/main');
    });

// app.use(passportConfig.ensureAuthenticated);

app.get('/main', indexController.getMain);

var port = process.env.PORT || 6403;
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});