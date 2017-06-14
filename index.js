var express = require('express');
var app = express();

app.set('port',(process.env.PORT || 3000));

app.use(express.static('./public'));
 

// 路由
app.get("/",function(req,res){
	res.send("Hello");
});

app.listen(5438,function(req,res){
	console.log("Server init at port "+ app.get('port'));
});

