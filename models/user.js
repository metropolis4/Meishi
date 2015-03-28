var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    linkedin: {}
});

var User = mongoose.model('User', userSchema);
module.exports = User;