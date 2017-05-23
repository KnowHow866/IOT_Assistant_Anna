var express = require('express');
var bodyParser = require("body-parser");
var userDB = require('./models/user');
//var multer = require('multer'); 
var app = express();

// 專案所在絕對路徑
var __dirname = "/Users/holis/Documents/academic/專案紀錄/IOT\ Assistant\ Anna";

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); // for parsing application/json
//app.use(multer()); // for parsing multipart/form-data


app.use(express.static(__dirname + '/public'));
//我可以用ajax直接與資料庫溝通，那個個middleware價值在哪裡
// app.use(function(req,res,next){
// 	res.setHeader("Access-Control-Allow-Origin","*");
// 	next();
// });

// 路由
app.get("/",function(req,res){
	res.sendFile( __dirname + "/public/index.html");
});
app.get("/register/:pass?",function(req,res){
	var pass = req.params.pass;
	if(pass == 3077) res.sendFile( __dirname + "/public/user_data.html"); //為何沒有include到css
	else res.sendFile( __dirname + "/public/register.html");
});
app.get("/user",function(req,res){
	res.sendFile( __dirname + "/public/user_data.html");
});
app.get("*",function(req,res){
	res.status(404);
	res.send("Cannot Found Page");
});

app.listen(5438,function(req,res){
	console.log("Server init at port 5438");
});

app.post('/register_ask',function(req,res){
	var User = req.body.User;
	var Mail = req.body.Mail;
	var Password = req.body.Password;
	var Supervisor = req.body.Supervisor;

	var user_data = new userDB({
		'_id' : 2,
		'name' : User,
		'mail' : Mail,
		'password' : Password
	});
	
	var user_req = "user_req is: " + User;
	var code = "code is: " + Supervisor;
	console.log(user_req);
	console.log(code);

	if(Supervisor == '30987pop'){
		user_data.save(function(err){
			if(err) console.log('save err');
			else console.log("save success");
		});
		var data ={
			msg : 'done'
		}
		res.send(JSON.stringify(data));
	}
	else{
		console.log('not Supervisor');
		var data ={
			msg : 'not'
		}
		res.send(JSON.stringify(data));
	}
});

app.post("/user_data",function(req,res){
	console.log(req.body.msg);
	var count = 0;


	userDB.find(function(err,docs){
		if(err || !docs){
			console.log("No user data found");
		}
		else{
			res.send(JSON.stringify(docs));
			docs.forEach(function(d){
				var data = new userDB(d);
				// console.log(data);
				var user = {
					name: data.name,
					mail: data.mail,
					password: data.password
				};
				//data.user[count] = user;
				//count ++;
				console.log(user);
				//res.send(JSON.stringify(user));
			});
		}
	});

	// var msg ={
	// 		msg : 'done'
	// }
	//res.send(JSON.stringify(data));
});



