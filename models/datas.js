var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.createConnection('mongodb://anna:iamanna@ds131878.mlab.com:31878/annabase');
//mongoose.createConnection('mongodb://holis:datalocate367@ds131878.mlab.com:31878/annabase');

var data_schema = new mongoose.Schema({
	'_id': Number,
	'device': String,
	'picname': String,
	'y-name': String,
	'data':[{
		 'value': Number,
		 'd_date': {type: Date, default: Date.now }
	}],
	'build-date': {type: Date, default: Date.now }
});

var datas = mongoose.model('datas',data_schema);

module.exports = datas;

// 'x': Number,
// 'y': Number,
// 'data_date': {type: Date, default: Date.now }
