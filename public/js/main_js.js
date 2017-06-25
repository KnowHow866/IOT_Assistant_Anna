var theUser = "NULL";
var thePassword = "NULL";
var login = 0;


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
        console.log(data);
        if(data.msg == 'deny'){
          //location.href = "/";
        }  
        else{
          $('#register').text('Hi ' + data.msg);
          $('#user,#password').hide();
          $('#log-in-vertify').text('LOG OUT');
          theUser = data.msg;
          login = 1;
        }
      },
  });


  $('#log-in-vertify').on('click',function(){
    console.log('log');
    var username = $('#user').val();
    var password = $('#password').val();

    if(login == 0){
      //執行登入
      $.ajax({
        url: "/login",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            User: username,
            Password: password
        }),
        error: function(){
          alert("login Post Wrong");
        },
        success: function(data){  
          if(data.msg == 'done'){
            // alert('log in success');
            login = 1;
            theUser = username;
            thePassword = password;
            $('.input-group-addon').hide();
            $('#user,#password').hide();
            $('#log-in-vertify').text('LOG OUT');
            $('#register').text('HI '+ theUser);
          }
          else if(data.msg == 'not'){
            alert('login fail');
          }
          else alert("server error");
        },
      });
    }
    else if(login == 1){
      login = 0;
      theUser = "NULL";
      thePassword = "NULL";

      $.ajax({
          url: "/logout",
          type: "POST",
          contentType: "application/json",
          dataType: "json",
          data: JSON.stringify({msg: 'logout'}),
          error: function(){
            alert("Aotu logout post wrong");
          },
          success: function(data){
            alert('You have log out');
            theUser = "NULL";
          },
      });

      $('#log-in-vertify').text('SIGN IN');
      $('#register').text('REGISTER');
      $('.input-group-addon').show();
      $('#user,#password').show();
      $('#user,#password').val('');
    }

    // if(username == 'holis' &&
    //   password == '123' && login == 0){
    //   login = 1;
    //   $('.input-group-addon').hide();
    //   $('#user,#password').hide();
    //   $('#log-in-vertify').text('LOG OUT');
    //   $('#register').text('HI Supervisor');
    // }
    // else if(login == 1){
    //   login = 0;
    //   $('#log-in-vertify').text('SIGN IN');
    //   $('#register').text('REGISTER');
    //   $('.input-group-addon').show();
    //   $('#user,#password').show();
    //   $('#user,#password').val('');
    // }
    // else
    //   alert('Wrong username or password.');
  });


  $('#register').on('click',function(){
    location.href = "./register";
  });

  $('#service').on('click',function(){
    if(login == 0) alert("Please login first");
    // else location.href = "./service";
    location.href = "./service";
  });
  $('#demo').on('click',function(){
    if(login == 0) alert("Please login first");
    // else location.href = "./service";
    location.href = "/demo";
  });
});





