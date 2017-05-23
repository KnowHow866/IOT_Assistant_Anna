var login = 0;

$(document).ready(function(){
  $('#log-in-vertify').on('click',function(){
    console.log('log in');
    var username = $('#user').val();
    var password = $('#password').val();
    if(username == 'holis' &&
      password == '123' && login == 0){
      login = 1;
      $('.input-group-addon').hide();
      $('#user,#password').hide();
      $('#log-in-vertify').text('LOG OUT');
      $('#register').text('HI Supervisor');
    }
    else if(login == 1){
      login = 0;
      $('#log-in-vertify').text('SIGN IN');
      $('#register').text('REGISTER');
      $('.input-group-addon').show();
      $('#user,#password').show();
      $('#user,#password').val('');
    }
    else
      alert('Wrong username or password.');
    
  });

  $('#register').on('click',function(){
    location.href = "./register";
  });
});





