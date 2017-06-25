var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.createConnection('mongodb://anna:iamanna@ds131878.mlab.com:31878/annabase');
//mongoose.createConnection('mongodb://holis:datalocate367@ds131878.mlab.com:31878/annabase');

var data_schema = new mongoose.Schema({
	//'_id': Number,
	'value': Number,
	'd_date': {type: Date, default: Date.now },
	'u_date': String
});

var demo_data = mongoose.model('demo_data',data_schema);

module.exports = demo_data;