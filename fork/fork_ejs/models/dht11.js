var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/user');

var dhtSchema = new mongoose.Schema({
	'Temp' : Number,
	'Light': Number,
	'Time' : {type: Date, default: Date.now }
});

var DHT11 = mongoose.model('ejsData', dhtSchema);
module.exports = DHT11;

