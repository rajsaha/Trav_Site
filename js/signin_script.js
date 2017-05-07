var url = "http://54.169.51.25/api/";


function getUserID(name, userEmail, callback) {
  var req = new XMLHttpRequest();
  req.open('POST', url + "registerUser", true);
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.send(JSON.stringify({name:name, email:userEmail})); 
  req.onreadystatechange = processRequest
 
 function processRequest(e) {
    if (req.readyState == 4 ) {
      console.log(req.statusText);
      if (req.status == 200) {
        console.log(req.response);
        var res = JSON.parse(req.response);
        callback(res.user_id);
      }
    }    
  } 
}



function onLogin (name, email) {
  console.log('Logged in.');
  getUserID(name, email, function(id) {
    console.log(id);
    sessionStorage.setItem('isLogged','true');
    window.location = "/index.html"; 
  });
}


$(document).ready(function() {

  //test 
  /*getUserID("Hassan Ali Askari", "sunny_the_mastermind@hotmail.com", function(id) {
    console.log(id);
  });*/


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '495600770631539',
      xfbml      : true,
      version    : 'v2.9'
    });
    FB.AppEvents.logPageView();

    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        FB.api('/me', {fields: 'name, email'}, function(response) {
            onLogin(response.name, response.email);
        });
      }
      else {
        document.getElementById("fb-login-button").onclick = function () { 
          FB.login(function(response) {
            onLogin(response.name, response.email);
          }, {scope: 'name, email'}); 
        };
      }
    });

  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));



  setTimeout(function() {
    $("#hill1").removeClass("border-no-fill");
  },0);

  setTimeout(function() {
    $("#hill2").removeClass("border-no-fill");
  },500);

  setTimeout(function() {
    $("#mountain").removeClass("border-no-fill");
  },800);

  setTimeout(function() {
    $("#rect-bg").removeClass("border-no-fill");
  },1200);

  setTimeout(function() {
    $("#sun2").removeClass("border-no-fill");
  },1400);

  setTimeout(function() {
    $("#sun1").removeClass("border-no-fill");
  },2000);
});
