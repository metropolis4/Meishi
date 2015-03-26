var linkedin = require('../config/linkedInAPI.js');
var indexController = {
	index: function(req, res) {
		res.render('index');
	},
    linkedIn: function(req, res) {
        res.redirect('https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=' + linkedin.key + '&redirect_uri=https://shielded-everglades-7672.herokuapp.com/main&state=5150515051505150');
    },
    getMain: function(req, res){
        res.render('main');
    }
};

module.exports = indexController;