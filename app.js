var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    indexController = require('./controllers/index.js');

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
app.get('/getProfile/:access_token', indexController.getProfile);

var port = process.env.PORT || 6403;
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});