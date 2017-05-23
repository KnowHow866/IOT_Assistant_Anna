var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user');

var user_schema = new mongoose.Schema({
	'_id': Number,
	'name': String,
	'mail': String,
	'password': String,
	'reg_date': {type: Date, default: Date.now }
});

var userDB = mongoose.model('users', user_schema);

module.exports = userDB;

