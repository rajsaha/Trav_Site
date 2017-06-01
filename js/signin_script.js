function onLogin (name, email, type, id, ppURL) {
  console.log('Logged in.' + ' name ' + name + ' email ' + email, + ' type ' + type + ' id ' + id + ' ppurl ' + ppURL);

  Backend.getUser(name, email, type, id, ppURL, function(user) {
    //console.log(user);
    var id = user._id;
    sessionStorage.setItem('isLogged','true');
    sessionStorage.setItem('userID', id);
    sessionStorage.setItem("user", JSON.stringify(user));
    getMasterInterestList();
  });
}


function getMasterInterestList() {
  Backend.getInterests(function(interestListString) {
    sessionStorage.setItem('interestList', interestListString); //String
    window.location = "/index.html"; 
  })
}


function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}



$(document).ready(function() {

  //test 
  /*getUserID("Hassan Ali Askari", "sunny_the_mastermind@hotmail.com", function(id) {
    console.log(id);
  });*/


  var qParams = getUrlVars();
  console.log(qParams['state']);

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=495600770631539";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '495600770631539',
      xfbml      : true,
      version    : 'v2.9'
    });
    FB.AppEvents.logPageView();

    FB.getLoginStatus(function(response) {
      console.log(response);
      if (response.status === 'connected') {
        if (qParams['state'] == 'logout') {
          console.log('logging out');
          FB.logout(function(response) {
            console.log('logged out');
          });
        } else {
          sessionStorage.setItem('token', response.authResponse.accessToken);
          FB.api('/me', {fields: 'name, email, id, picture'}, function(response) {
              console.log(response);
              onLogin(response.name, response.email, "fb", response.id, response.picture.data.url);
          });
        }
      }
      //else {
      $('#fb-login-button').click(function() {
        console.log('login clicked');
        FB.login(function(response){
          console.log(response);  
          sessionStorage.setItem('token', response.authResponse.accessToken);
          FB.api('/me', {fields: 'name, email, id, picture'}, function(response) {
              console.log(response);
              onLogin(response.name, response.email, "fb", response.id, response.picture.data.url);
          });
        }, {scope: 'public_profile,email'});
      });
      /*$("#fb-login-button").click(function () { 
        FB.login(function(response) {
          console.log(response);
          sessionStorage.setItem('token', response.authResponse.accessToken);
          onLogin(response.name, response.email);
        }, {scope: 'name, email, id, picture'}); 
      });*/
      //}
    
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
