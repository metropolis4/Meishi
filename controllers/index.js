var request = require('request'),
    User = require('../models/user'),
    callback = 'https://shielded-everglades-7672.herokuapp.com/oauth/linkedin/callback',
    Linkedin = require('node-linkedin')(process.env.key, process.env.secretKey, callback);

//     linkedAPI = require('../config/linkedInAPI.js');
// var Linkedin = require('node-linkedin')(linkedAPI.key, linkedAPI.secretKey, 'https://localhost:6403/oauth/linkedin/callback');
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
            res.render('main', {
                user: user
            });
        });
    },
    getProfile: function(req, res){
            var user = User.findById(req.params._id, function(err, results){
                var linkedin = Linkedin.init(results.linkedin.access_token);
                linkedin.people.me(function(err, $in){
                    res.send($in);
                });
            });
    }
};

module.exports = indexController;