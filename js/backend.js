var Backend = (function() {

  var url = "http://54.169.51.25/api/";

  function getUserID(name, userEmail, type, id, ppURL, callback) {
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


  function getCards(callback) {
    var req = new XMLHttpRequest();
    req.open('GET', url + "getCards", true);
    req.send();
    req.onreadystatechange = processRequest

    function processRequest(e) {
      if (req.readyState == 4 ) {
        console.log(req.statusText);
        if (req.status == 200) {
          //console.log(req.response);
          var res = JSON.parse(req.response);
          callback(res);          
        }
      }    
    } 
  }







  return {
    getUserID: getUserID,
    getCards: getCards
  }

   
})();