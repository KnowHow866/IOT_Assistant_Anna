var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.createConnection('mongodb://anna:iamanna@ds131878.mlab.com:31878/annabase');
//mongoose.createConnection('mongodb://holis:datalocate367@ds131878.mlab.com:31878/annabase');

var data_schema = new mongoose.Schema({
	'_id': Number,
	'device': String,
	'collection': String,
	'y-name': String,
	'data':{
		type: Array,
		'dafault': []
	},
	'build-date': {type: Date, default: Date.now }
});

var apply = mongoose.model('datas',apply_schema);

module.exports = apply;

// 'x': Number,
// 'y': Number,
// 'data_date': {type: Date, default: Date.now }
