var express = require('express');
var app = express();

app.set('port',(process.env.PORT || 3000));

app.use(express.static('./public'));
 

// 路由
app.get("/test",function(req,res){
	res.send("Hello");
});

app.listen(app.get('port'),function(req,res){
	console.log("Server init at port "+ app.get('port'));
});

