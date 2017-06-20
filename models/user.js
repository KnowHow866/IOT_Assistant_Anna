var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://anna:iamanna@ds131878.mlab.com:31878/annabase'); 
//mongoose.connect('mongodb://holis:datalocate367@ds131878.mlab.com:31878/annabase');

var user_schema = new mongoose.Schema({
	'_id': Number,
	'name': String,
	'mail': String,
	'password': String,
	'reg_date': {type: Date, default: Date.now }
});

var userDB = mongoose.model('users', user_schema);

module.exports = userDB;

