var request = require('request');
var linkedAPI = require('../config/linkedInAPI.js');
var User = require('../models/user');
var Linkedin = require('node-linkedin')(linkedAPI.key, linkedAPI.secretKey, 'https://shielded-everglades-7672.herokuapp.com/main');
linkedin = Linkedin.init(linkedAPI.token);
// process.env.key
var indexController = {
	index: function(req, res) {
		res.render('index');
	},
    linkedIn: function(req, res) {
        res.redirect('/');
    },
    // getMain: function(req, res){
    //     res.render('main', { user: req.user});
    // },
    oauth: function(req, res){
        Linkedin.auth.authorize(res, ['r_basicprofile']);
    },
    returnAuth: function(req, res){
        Linkedin.auth.getAccessToken(res, req.query.code, function(err, results){
            if(err) throw err;
            console.log("RESULTS???", results);
            return res.redirect('/');
        });
    }
    // authCallback: function(req, res){
    //     console.log("FROM SERVER:: ", req.params);
        
    //     res.redirect('/main');
    // }
};

module.exports = indexController;