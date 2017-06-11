var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth:{
		user: 'accidental001@gmail.com',
		pass: 'koqmcmklxdwotgfs'
	}
});

module.exports = transporter;