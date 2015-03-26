var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    indexController = require('./controllers/index.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/meishi');

app.get('/', indexController.index);

var port = process.env.PORT || 6403;
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});