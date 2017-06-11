
$(document).ready(function(){
	$.ajax({
      url: "/autologin",
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({msg: 'login'}),
      error: function(){
        alert("Aotu login post wrong");
      },
      success: function(data){
        if(data.msg == 'deny'){
          //location.href = "/";
        }  
        else
          $('#register').text('Hi ' + data.msg);
          $('#log-in-vertify').text('LOG OUT');
      },
  });

	$('#home').on('click',function(){
		location.href = "/";
	});
	$('#service').on('click',function(){
		//alert("Please register an acount first");
     	location.href = "./service";
  	});

	$('#submit').on('click',function(){
		var user_reg = {
				'User': $('#user').val(),
				'Mail': $('#mail').val(),
				'Password': $('#password').val(),
				'Supervisor': $('#supervisor').val()
			};

		//var count = 0;
		// $.ajax({
		// 	url: "/apply_count",
		// 	type: "POST",
		// 	contentType: "application/json",
		// 	dataType: "json",
		// 	data: JSON.stringify({msg:"ask"}),
		// 	error: function(){
		// 		alert("Post wrong1");
		// 	},
		// 	success: function(data){  
		// 		console.log(data.msg);
		// 	},
		// });

		$.ajax({
			url: "/register_ask",
			type: "POST",
			contentType: "application/json",
			dataType: "json",
			data: JSON.stringify(user_reg),
			error: function(){
				alert("Post wrong2");
			},
			success: function(data){  
				if(data.msg == 'done') alert('We have send vertify email to you\nPlease click the address to vertify');
				else if(data.msg == 'not') alert('Register not success');
				else alert("server error");
			},
		});


	});

});