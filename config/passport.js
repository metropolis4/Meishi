var passport = require('passport');
var User = require('../models/user');
var linkedin = require('./linkedInAPI');
var LinkedInStrategy = require('passport-linkedin').Strategy;

passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use(new LinkedInStrategy({
    // Change info here out to heroku config data for production
        consumerKey: linkedin.key,
        consumerSecret: linkedin.secretKey,
        callbackURL: "https://shielded-everglades-7672.herokuapp.com/main",
        profileFields: ['first-name', 'last-name', 'email-address', 'Description', 'Company', 'Title', 'Skills', 'Location', 'Image']
    },
    function(token, tokenSecret, profile, done){
        process.nextTick(function(){
            // associate linkedIn account with user record in DB here...
            console.log("PROFILE::: ", profile)
            return done(null, profile);
        });
    }
));

module.exports = {
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/');
    }
};