var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.createConnection('mongodb://localhost/user');

var apply_schema = new mongoose.Schema({
	'_id': Number,
	'name': String,
	'mail': String,
	'password': String,
	'code': Number,
	'apply_date': {type: Date, default: Date.now }
});

var apply = mongoose.model('apply',apply_schema);

module.exports = apply;


