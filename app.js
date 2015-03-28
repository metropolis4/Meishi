var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    // linkedAPI = require('./config/linkedInAPI.js'),
    // callback = 'https://shielded-everglades-7672.herokuapp.com/oauth/linkedin/callback',
    // Linkedin = require('node-linkedin')(process.env.key, process.env.secretKey, callback);
    indexController = require('./controllers/index.js');

// var linkedin = Linkedin.init(process.env.token);
mongoose.connect(process.env.MONGOLAB_URI ||'mongodb://localhost/meishi');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.get('/', indexController.index);
app.get('/oauth/linkedin', indexController.linkedInReq);
app.get('/oauth/linkedin/callback', indexController.linkedInCallback);
app.get('/main', indexController.getMain);

var port = process.env.PORT || 6403;
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});