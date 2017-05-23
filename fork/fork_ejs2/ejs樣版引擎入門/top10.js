var DHT11 = require('./models/dht11');
var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  DHT11.find().sort({'Time': -1})
       .limit(5)
       .exec(function(err, data) {
         res.render('table', {docs:Data});
         console.log("found-------");
         console.log(data);
       });
});

app.listen(5438,function(req,res){
	console.log("server init at 5438");
});