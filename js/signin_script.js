function onLogin (name, email, type, id, ppURL) {
  console.log('Logged in.' + ' name ' + name + ' email ' + email, + ' type ' + type + ' id ' + id + ' ppurl ' + ppURL);

  Backend.getUserID(name, email, type, id, ppURL, function(id) {
    console.log(id);
    sessionStorage.setItem('isLogged','true');
    sessionStorage.setItem('userID', id);
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
        sessionStorage.setItem('token', response.authResponse.accessToken);
        FB.api('/me', {fields: 'name, email, id, picture'}, function(response) {
            console.log(response);
            onLogin(response.name, response.email, "fb", response.id, response.picture.data.url);
        });
      }
      else {
        document.getElementById("fb-login-button").onclick = function () { 
          FB.login(function(response) {
            sessionStorage.setItem('token', response.authResponse.accessToken);
            onLogin(response.name, response.email);
          }, {scope: 'name, email, id, picture'}); 
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
