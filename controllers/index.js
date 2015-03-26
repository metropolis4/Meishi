var request = require('request');
var linkedin = require('../config/linkedInAPI.js');
// process.env.key
var indexController = {
	index: function(req, res) {
		res.render('index');
	},
    linkedIn: function(req, res) {
        res.redirect('/');
    },
    getMain: function(req, res){
        console.log("FROM SERVER::", req.user);
        res.render('main', { user: req.user});
    }
};

module.exports = indexController;