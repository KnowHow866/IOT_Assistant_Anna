var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended:true}));

var __dirname = "/Users/holis/Documents/academic/專案紀錄/IOT\ Assistant\ Anna/fork_register";

app.get("/",function(req,res){
	res.sendFile( __dirname + "/register.html");
});
app.get("*",function(req,res){
	res.status(404);

	res.send("Cannot Found Page");
});

app.listen(5438,function(req,res){
	console.log("Server init at port 5438");
});

app.post('/regist',function(req,res){
	var user = req.body.user;
	var email = req.body.email;

	var html = 'User:  ' + user +'<br>' +
				'Mail:  ' + email;
	res.send(html);
});