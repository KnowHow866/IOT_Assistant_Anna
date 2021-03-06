var express = require('express');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
var userDB = require('./models/user');
var apply = require('./models/registerApply');
var datas = require('./models/demo_data');
var transporter = require('./models/mail');
var io = require("socket.io");
//var multer = require('multer'); 
var app = express();

app.set('port',(process.env.PORT || 3000));

// 專案所在絕對路徑
//var __dirname = "/Users/holis/Documents/academic/專案紀錄/IOT\ Assistant\ Anna";
//var __dirname = "";
var __webAddress = "NULL";

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); // for parsing application/json
app.use(cookieParser());
app.use(cookieSession({
	key : 'node',
	secret : 'IOT_Anna_SECRET'
}));
//app.use(multer()); // for parsing multipart/form-data


app.use(express.static(__dirname + '/public'));
//我可以用ajax直接與資料庫溝通，那個個middleware價值在哪裡
// app.use(function(req,res,next){
// 	res.setHeader("Access-Control-Allow-Origin","*");
// 	next();
// });

//變數們
var USER = "NULL";
var PASSWORD = "NULL"; 
var update = 0;
var globalvalue = 0;
var globaltime = 0;
// 路由
app.get("/",function(req,res){
	res.sendFile( __dirname + "/public/index.html");
});



//------------------------------------------------------------------------
app.get("/register",function(req,res){
	res.sendFile( __dirname + "/public/register.html");
});
app.get("/user",function(req,res){
	res.sendFile( __dirname + "/public/user_data.html");
});
app.get("/service",function(req,res){
	if(req.session.login)
		res.sendFile( __dirname + "/public/demo.html");
	else res.redirect("/");
});
app.get("/demo",function(req,res){
	if(req.session.login)
		res.sendFile( __dirname + "/public/service.html");
	else res.redirect("/");
});
//認證帳號
app.get("/vertify/:User/:Pass",function(req,res){
	var user = req.params.User;
	var pass = req.params.Pass;
	var password;
	var mail;
	console.log("User: "+user);
	console.log("Pass: "+pass);
	//找尋認證資料
	apply.find({name:user},function(err,data){

		//認證通過
		if(data[0].code == pass){
			password = data[0].password;
			mail = data[0].mail;

			var count = 1;
			//為新帳號產生 _id
			userDB.count().exec(function(err,theCount){
				if(err || !theCount) console.log("userDB count err:  "+err);
				else{
					console.log("userDB count:  "+theCount);
					count = theCount+3;
					var user_data = new userDB({
						'_id' : count,
						'name' : user,
						'mail' : mail,
						'password' : password
					});
					user_data.save(function(err){
						if(err) console.log('new user err'+err);
						else console.log("new user success");
					});
					res.sendFile( __dirname + "/public/register.html");
				}
			});
			
		}
		else{
			console.log("apply find err");
			res.sendFile( __dirname + "/public/index.html");
		}
	});
});
app.get("*",function(req,res){
	res.status(404);
	res.send("Cannot Found Page");
});

//啟動伺服器聆聽
var server = app.listen(app.get('port'),function(req,res){
	console.log("Server init at port "+app.get('port'));
});
var sio = io.listen(server);

app.post('/register_ask',function(req,res){
	var User = req.body.User;
	var Mail = req.body.Mail;
	var Password = req.body.Password;
	var Supervisor = req.body.Supervisor;
	var Code = Math.floor((Math.random()*10000)+1); //隨機產生4位驗證碼
	var count = 1;

	//計算有多少位apply，為了加上新的apply _id
	apply.count().exec(function(err,theCount){
		if(err || !count);
		else{
			count = theCount+3;
		}
		var applyData = new apply({
			'_id' : count,
			'name': User,
			'mail': Mail,
			'password': Password,
			'code': Code
		});

		var mail = {
			from: "IOT_Assistant_Anna accidental001@gmail.com",
			to: "Dear_applyer "+ Mail,
			subject: "Account Vertify",
			text: "Please click the link to vertify"
				  +'\nmurmuring-woodland-'+app.get('port')+'.herokuapp.com/vertify/' + User +'/' + Code
		};

		//儲存apply資料
		applyData.save(function(err){
			if(err) console.log('apply saved err'+ err);
			else console.log("apply saved");
		});

		//繼認證信
		transporter.sendMail(mail,function(err,info){
			if(err) return console.log(err);
			console.log('Mail is deliveried: '+ info.response);
		});
	});


	//回覆完成
	var data = {
		msg: 'done'
	};
	res.send(JSON.stringify(data));

});

app.post("/user_data",function(req,res){
	//console.log(req.body.msg);
	var count = 0;

	userDB.find(function(err,docs){
		if(err || !docs){
			console.log("No user data found");
		}
		else{
			res.send(JSON.stringify(docs));
		}
	});

});

app.post("/apply_count",function(req,res){
	apply.count().exec(function(err,count){
		if(err || !count){
			console.log("No user data found");
			res.send(JSON.stringify({msg: 0}));
		}
		else{
			console.log("num of apply "+ count);
	
			res.send(JSON.stringify({msg:count}));
		}
	});
});

app.post("/login",function(req,res){
	var user = req.body.User;
	var password = req.body.Password;

	userDB.find({name:user},function(err,data){
		if(err){
			console.log("user login find err "+err);
		}
		else if(data.length == 0){
			res.send(JSON.stringify({msg:'not'}));
		}
		else{
			//發回登入成功訊息
			if(data[0].password == password){
				//使用session紀錄使用者登入狀態
				req.session.login = user;
				
				res.send(JSON.stringify({msg:'done'}));
			}
			else res.send(JSON.stringify({msg:'not'}));
		}
	})
});


app.post('/autologin',function(req,res){
	if(req.session.login){
		res.send(JSON.stringify({msg: req.session.login}));
	}
	else res.send(JSON.stringify({msg: 'deny'}));
});

app.post('/logout',function(req,res){
	req.session.login = false;
	res.send({msg: 'done'});
});

app.post('/data_log',function(req,res){
	datas.find().sort({'d_date':-1}).limit(20).exec(function(err,data){
		if(err) console.log('data search err: '+err);
		else{
			res.send((JSON.stringify(data)));
		}
	});
});

sio.on('connection',function(socket){
	socket.on('test',function(data){
		console.log('用戶:'+data.msg);
	});

	socket.on('update',function(data){
		console.log('server get data: '+ data.data);
		console.log('server get time: '+ data.u_date);

		var coined_data = new datas({
			'value': data.data,
			'u_date': data.u_date
		});

		coined_data.save(function(err){
			if(err) console.log('save err'+ err);
			else{
				console.log('save success');
				console.log('server give localupdate');
				socket.emit('localupdate',{
			        'value': data.data,
			        'time': data.u_date
	      		});
			}
		});

		// console.log('server give localupdate');
		// 	socket.emit('localupdate',{
		//         'value': globalvalue,
		//         'time': globaltime
	 //      	});

		// globalvalue = data.data;
		// globaltime = data.u_date;
		// update ++;
	});


	// setInterval(function(){
	// 	if(update > 0){
	// 		console.log('server give localupdate');
	// 		socket.emit('localupdate',{
	// 	        'value': globalvalue,
	// 	        'time': globaltime
	//       	});

	//       	update == 0;
	// 	}
	// },500);
	

});


