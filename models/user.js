var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    linkedin: Schema.Types.Mixed
});

userSchema.pre('save', function(next){
    if(!this.isModified('password')) return next();

    var user = this;

    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
            user.password = hash;
            return next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, next){
    bcrypt.compare(candidatePasswrd, this.password, function(err, isMatch){
        if(err) return next(err);
        return next(null, isMatch);
    });
};
var User = mongoose.model('user', userSchema);
module.exports = User;