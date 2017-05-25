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


  function getCards(userID, lat, lng, callback) {
    var req = new XMLHttpRequest();
    req.open('POST', url + "getCards", true);
     req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify({user_id:userID, latitude:lat, longitude:lng}));
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


function getInterests(callback) {
    var req = new XMLHttpRequest();
    req.open('GET', url + "getInterests", true);
    req.send();
    req.onreadystatechange = processRequest

    function processRequest(e) {
      if (req.readyState == 4 ) {
        console.log(req.statusText);
        if (req.status == 200) {
          //var res = JSON.parse(req.response);
          //var interestList = res['interests'];
          //console.log(interestList[0]);
          callback(req.response);          
        }
      }    
    } 
  }



  function getUserPictureCount(userID, callback) {
      var req = new XMLHttpRequest();
      req.open('POST', url + "getUserPhotoCount", true);
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      req.send(JSON.stringify({user_id:userID})); 
      req.onreadystatechange = processRequest

      function processRequest(e) {
        if (req.readyState == 4 ) {
          console.log(req.statusText);
          if (req.status == 200) {
            var res = JSON.parse(req.response);
            var count = res['count'];
            if(count) {
              callback(null, count);          
            } else {
              callback("Cannot get picture count", null);
            }
          }
        }    
      } 
    }


    function postPictureCard(userID, pictureUrl, heading, locationID, location, latitude, longitude, interest, description, callback) {
    var req = new XMLHttpRequest();
    req.open('POST', url + "registerCard", true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var param = {
      user_id:userID,
      card_type:"photo",
      url:pictureUrl,
      title:heading,
      location_id:locationID,
      location:location,
      latitude:latitude,
      longitude:longitude,
      interests:[interest],
      description:description
    };
    req.send(JSON.stringify(param)); 
    req.onreadystatechange = processRequest
    
     function processRequest(e) {
        if (req.readyState == 4 ) {
          console.log(req.statusText);
          if (req.status == 200) {
            //console.log(req.response);
            var res = JSON.parse(req.response);
            callback();
          }
        }    
      } 
    }


    function getLinkPreview(link, callback) {
      var req = new XMLHttpRequest();
      req.open('POST', url + "getLinkPreview", true);
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      req.send(JSON.stringify({link:link})); 
      req.onreadystatechange = processRequest

      function processRequest(e) {
        if (req.readyState == 4 ) {
          console.log(req.statusText);
          if (req.status == 200) {
            var res = JSON.parse(req.response);
            callback(null, res);
          } else {
            callback("err");
          } 
        }    
      } 
    }



    function postBlogCard(userID, blogUrl, blogTitle, blogExtract, thumbnailUrl, selectedInterests, locationID, locationString, latitude, longitude, callback) {
    var req = new XMLHttpRequest();
    req.open('POST', url + "registerCard", true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var param = {
      user_id:userID,
      card_type:"blog",
      url:blogUrl,
      title:blogTitle,
      thumbnail:thumbnailUrl,
      description:blogExtract,
      interests:selectedInterests,
      location_id:locationID,
      location:locationString,
      latitude:latitude,
      longitude:longitude,
    };
    req.send(JSON.stringify(param)); 
    req.onreadystatechange = processRequest
    
     function processRequest(e) {
        if (req.readyState == 4 ) {
          console.log(req.statusText);
          if (req.status == 200) {
            //console.log(req.response);
            var res = JSON.parse(req.response);
            callback();
          }
        }    
      } 
    }



    function getBucketList(userID, callback) {
      var req = new XMLHttpRequest();
      req.open('POST', url + "getBucketList", true);
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      req.send(JSON.stringify({user_id:userID})); 
      req.onreadystatechange = processRequest

      function processRequest(e) {
        if (req.readyState == 4 ) {
          console.log(req.statusText);
          if (req.status == 200) {
            var res = JSON.parse(req.response);
            callback(null, res.bucket_list);
          } else {
            callback("err");
          } 
        }    
      } 
    }


    function getUserPictures(userID, callback) {
      var req = new XMLHttpRequest();
      req.open('POST', url + "getUserCards", true);
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      req.send(JSON.stringify({user_id:userID})); 
      req.onreadystatechange = processRequest

      function processRequest(e) {
        if (req.readyState == 4 ) {
          console.log(req.statusText);
          if (req.status == 200) {
            var res = JSON.parse(req.response);
            var pictureCards = [];
            res.cards.forEach(function(card) {
              if (card.card_type =='photo') {
                pictureCards.push(card);
              }
            });

            callback(null, pictureCards);
          } else {
            callback("err");
          } 
        }    
      } 
    }



  return {
    getUserID: getUserID,
    getCards: getCards,
    getInterests: getInterests,
    getUserPictureCount: getUserPictureCount,
    postPictureCard: postPictureCard,
    getLinkPreview: getLinkPreview,
    postBlogCard:postBlogCard,
    getBucketList:getBucketList,
    getUserPictures:getUserPictures,
  }

   
})();