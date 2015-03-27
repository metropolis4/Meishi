var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    // cookieParser = require('cookie-parser'),
    // flash = require('connect-flash'),
    // passport = require('passport'),
    // passportConfig = require('./config/passport'),
    // linkedAPI = require('./config/linkedInAPI.js'),
    callback = 'https://shielded-everglades-7672.herokuapp.com/main',
    Linkedin = require('node-linkedin')(process.env.key, process.env.secretKey, callback);
    indexController = require('./controllers/index.js');

var linkedin = Linkedin.init(process.env.token);
mongoose.connect('mongodb://localhost/meishi');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());
// app.use(flash());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
// app.use(passport.initialize());
// app.use(passport.session());

app.get('/', indexController.index);
app.get('/oauth/linkedin', function(req, res){
    Linkedin.auth.authorize(res, ['r_basicprofile']);
});
app.get('/oauth/linkedin/callback', function(req, res){
    Linkedin.auth.getAccessToken(res, req,query.code, function(err, results){
        if(err) 
            return console.error(err);
        console.log("RESULTS??", results);
        return res.redirect('/');
    });
});
// app.get('/auth', passport.authenticate('linkedin'), function(req, res){});
// app.get('/auth/callback', passport.authenticate('linkedin', {failureRedirect: '/'}),
//     indexController.authCallback);

// app.use(passportConfig.ensureAuthenticated);

// app.get('/main', indexController.getMain);

var port = process.env.PORT || 6403;
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});