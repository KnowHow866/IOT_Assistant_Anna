
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
			},
	});

	$('#home').on('click',function(){
		location.href = "/";
	});
	$('#register').on('click',function(){
	    //location.href = "/register";
	});

	$('#log-in-vertify').on('click',function(){
		location.href = "/";
	})
});