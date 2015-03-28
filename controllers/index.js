var request = require('request'),
    User = require('../models/user'),
    callback = 'https://shielded-everglades-7672.herokuapp.com/oauth/linkedin/callback',
    Linkedin = require('node-linkedin')(process.env.key, process.env.secretKey, callback);

var linkedin = Linkedin.init(process.env.token);
//     linkedAPI = require('../config/linkedInAPI.js');
// var Linkedin = require('node-linkedin')(linkedAPI.key, linkedAPI.secretKey, 'https://localhost:6403/oauth/linkedin/callback');
// var linkedin = Linkedin.init(linkedAPI.token);

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
    getMain: function(req, res){
        res.render('main', { user: req.user});
    },
    linkedInReq: function(req, res){
        Linkedin.auth.authorize(res, ['r_basicprofile']);
    },
    linkedInCallback: function(req, res){
        Linkedin.auth.getAccessToken(res, req.query.code, function(err, results){
            if(err) 
                return console.error(err);
            // var user = new User({
            //     username: "test",
            //     password: "test",
            //     linkedin: results.access_token
            // });
            // user.save();

            return res.redirect('/main');
        });
    },
    getProfile: function(req, res){
        linkedin.people.me(function(err, $in){
            if(err) throw err;
            console.log("FROM SERVER??? ", $in);
            res.send($in);
        });
        // User.findById(req._id, function(err, results){
        //     if(err) throw err;
        //     res.send(results);
        // });
    }

};

module.exports = indexController;