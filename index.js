var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

 

// 路由
app.get("/",function(req,res){
	res.send("Hello");
});

app.listen(5438,function(req,res){
	console.log("Server init at port 5438");
});

