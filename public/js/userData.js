
$(document).ready(function(){
	$.ajax({
		url: "/user_data",
		type: "POST",
		dataType: "json",
		data: JSON.stringify({
			msg: "test msg"
		}),
		contentType: "application/json",

		complete: function(){
			console.log("post user data require");
		},
		success:  function(data){
			console.log(data);
			console.log("process success");
		},
		error: function(){
			console.log("process err");
		}

	});
});