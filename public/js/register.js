
$(document).ready(function(){
	$('#home').on('click',function(){
		location.href = "./index.html";
	});

	$('#submit').on('click',function(){
		var user_reg = {
				'User': $('#user').val(),
				'Mail': $('#mail').val(),
				'Password': $('#password').val(),
				'Supervisor': $('#supervisor').val()
			};


		$.ajax({
			url: "/register_ask",
			type: "POST",
			contentType: "application/json",
			dataType: "json",
			data: JSON.stringify(user_reg),
			error: function(){
				alert("Post wrong");
			},
			success: function(data){  
				if(data.msg == 'done') alert('done');
				else if(data.msg == 'not') alert('Register not success\nYou are not supervisor');
				else alert("server error");
			},
		});

		code = "code is: " + $('#supervisor').val();
		alert(code);

		// $.post('http://localhost:5348/register_ask',
		// {
		// 	'User': $('#user').val(),
		// 	'Mail': $('#mail').val(),
		// 	'Password': $('#password').val(),
		// 	'supervisor': $('#supervisor').val()
		// },
		// function(res){
		// 	if(res.num == 'done') alert('done');
		// });
	});

});