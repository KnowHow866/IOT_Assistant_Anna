//var DHT11 = require('./models/dht11');
var express = require('express');
var app = express();
app.set('view engine','ejs');

app.get('/',function(req,res){
	// DHT11.find().sort({'Time':-1})
	// 	.limit(5)
	// 	.exec(function(err,data){
	// 		res.render('index',{docs : {
 //         	'Temp':20,
 //         	'Light': 21,
 //         	'Date':111
 //         }});
	// 		console.log("found-------");
 //         	console.log(data);
	// });
	res.render('index',{docs : [{
         	'Temp':20,
         	'Light': 21,
         	'Date':111
         }]});
});

app.listen(6666,function(req,res){
	console.log("Server init at port 6666");
});

