var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/user');
var dht11Schema = new mongoose.Schema({
    'Temp': Number,
    'Light': Number,
    'Time': { type: Date, default: Date.now }
});
var DHT11 = mongoose.model('ejsData', dht11Schema);
module.exports = DHT11;