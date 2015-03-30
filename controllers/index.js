var request = require('request'),
    User = require('../models/user'),
    callback = 'https://shielded-everglades-7672.herokuapp.com/oauth/linkedin/callback',
    Linkedin = require('node-linkedin')(process.env.key, process.env.secretKey, callback);

//     linkedAPI = require('../config/linkedInAPI.js');
// var Linkedin = require('node-linkedin')(linkedAPI.key, linkedAPI.secretKey, 'https://localhost:6403/oauth/linkedin/callback');
var theToken;
var indexController = {
	index: function(req, res) {
		res.render('index');
	},
    getMain: function(req, res){
        res.render('main'); 
    },
    linkedInReq: function(req, res){
        Linkedin.auth.authorize(res, ['r_basicprofile']);
    },
    linkedInCallback: function(req, res){
        Linkedin.auth.getAccessToken(res, req.query.code, function(err, results){
            if(err) throw err;
            var user = new User({
                linkedin: JSON.parse(results)
            });
            user.save();
            theToken = user.linkedin;
            res.redirect('/main');
        });
    },
    getProfile: function(req, res){
            User.findById(req.params.id, function(err, results){
                res.send(results);
            });
            // var linkedin = Linkedin.init(theToken);
            // linkedin.people.me(function(err, $in){
            //     res.send($in);
            // });
    }

};

module.exports = indexController;