var map;
var destination = {lat: 0, lng: 0};
var marker;

$(document).ready(function() {

  var userID = sessionStorage.getItem('userID');

  //Get Interest List
  Backend.getInterests(function(interstList) {
    sessionStorage.setItem('interestList', interstList);
    console.log(typeof interstList);
    console.log(interstList);
  })


  var js_file = document.createElement('script');
  js_file.type = 'text/javascript';
  js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDI1IKGx1lrpkAszfQZQ-NNpyt9Fi0CBNs&callback=initMap';
  document.getElementsByTagName('head')[0].appendChild(js_file);




  var links = [
                {   /* The first object will be the main button */
                    "bgcolor":"red",
                    "icon":"+"
                },
                /* Following are the hidden button list */
                {
                    "url":"/add_picture.html",
                    "bgcolor":"red",
                    "color":"#fffff",
                    "icon":"<img src='images/icon_add_picture.svg' style='width: 100%;'/>",
                    "title":"Add Photo"
                    
                },
                {
                    "url":"/add_blog.html",
                    "bgcolor":"red",
                    "color":"#fffff",
                    "icon":"<img src='images/icon_add_blog.svg' style='width: 60%;'/>",
                    "title":"Add Blog"
                }
            ]
  $('.kc_fab_wrapper').kc_fab(links);

  var cardsArray;


  //Backend.getCards("589593bbac48cd73cb0811aa", 500, 500, function(data) {
  Backend.getCards(userID, 500, 500, function(data) {
    var output = '';
    cardsArray = data.cards;
    $.each(data.cards, function(k, v) {
      //console.log(v);
      
      if (v.card_type == 'photo') {
        output =  '<div class="row">';
        output +=   '<div class="col-md-12 text-center travscapade" >';
        output +=     '<div class="user-content">';
        output +=       '<img src="' + v.url + '" id="'+ v._id + '" class="travimage" data-name="travimage" />';
        output +=       '<div id="overlay_' + v._id + '" class="overlay-picture"></div>';
        output +=       '<div id="location_' + v._id + '" value="' + v._id + '" class="location-text-picture"><p class="'+ v._id +'">'+ v.location +'</p></div>';
        output +=     '</div>';
        output +=     '<div>'; 
        output +=       '<p class="text-center">';
        output +=         '<button id="like_button_' + v._id + '" class="glyphicon glyphicon-heart heart button-override" aria-hidden="true" value="'+ v._id +'"></button>';
        output +=         '<span class="likes">' + v.likes + '</span>';
        output +=         '<button id="bucket_button_' + v._id + '" class="glyphicon glyphicon-plus button-override" aria-hidden="true" value="'+ v._id +'"></button>';
        output +=         '<span>' + v.bucket_count + '</span>';
        output +=       '</p><br />';
        output +=     '</div>';
        output +=     '<div id="details">';
        output +=       '<a id="travel-type">' + v.interests + '</a>';
        output +=       '<a id="user-photo">' + v.user_name + '</a>';
        output +=       '<a><img src="' + v.user_profile_pic + '"/></a>';
        output +=     '</div>';
        output +=       '<div id="description_' + v._id + '" class="picture-description"><p class="'+ v._id +'">'+ v.description +'</p></div>';
        output +=   '</div>';
        output +=  '</div>';
      } else if (v.card_type == "blog") {
        output =  '<div class="row">';
        output +=   '<div class="col-md-12 text-center travscapade" >';
        output +=     '<div class="blog-title"><p>' + v.title + '</p></div>';
        output +=     '<div class="user-content">';
        output +=       '<img src="' + v.thumbnail + '" id="'+ v._id + '" class="travimage" data-name="travimage" />';
        output +=       '<div class="overlay-blog"></div>';
        output +=       '<div class="blog-extract"><p>' + v.description + '</p></div>';
        output +=     '</div>';
        output +=     '<div id="location_' + v._id + '" class="location-text-blog"><p class="'+ v._id +'">'+ v.location +'</p></div>';
        output +=     '<div>'; 
        output +=       '<p class="text-center">';
        output +=         '<button id="like_button_' + v._id + '" class="glyphicon glyphicon-heart heart button-override" aria-hidden="true" value="'+ v._id +'"></button>';
        //output +=         '<button class="glyphicon glyphicon-heart heart button-override" aria-hidden="true" value="'+ v._id +'"></button>';
        output +=         '<span class="likes">' + v.likes + '</span>';
        output +=         '<button id="bucket_button_' + v._id + '" class="glyphicon glyphicon-plus button-override" aria-hidden="true" value="'+ v._id +'"></button>';
        //output +=         '<button class="glyphicon glyphicon-plus button-override" aria-hidden="true" id="plus"></button>';
        output +=         '<span>' + v.bucket_count + '</span>';
        output +=       '</p><br />';
        output +=     '</div>';
        output +=     '<div id="details">';
        output +=       '<a id="travel-type">' + v.interests + '</a>';
        output +=       '<a id="user-photo">' + v.user_name + '</a>';
        output +=       '<a><img src="' + v.user_profile_pic + '"/></a>';
        output +=     '</div>';
        output +=   '</div>';
        output +=  '</div>';
      }

      $('#update').append(output);

      if(v.is_liked == true){
        onLike(v._id);
      } 

      if(v.is_bucket_listed == true){
        console.log(v._id);
        onBucketList(v._id);
      }

    });
  });
  


  /*var test = new XMLHttpRequest();
  test.open('GET', "http://54.169.51.25/api/getCards", true);
  //test.open('GET', "http://localhost:8080/api/getCards", true);
  test.send();
  test.onreadystatechange = processRequest

  function processRequest(e) {
    if (test.readyState == 4 ) {
      console.log(test.statusText);
      if (test.status == 200) {
        var data = JSON.parse(test.response);
        console.log(typeof data);
        var output = '';
        $.each(data.cards, function(k, v) {
          console.log("card");
          output = '<div class="row"><div class="col-md-12 text-center travscapade"><div class="user-content">';
          output += '<img src="' + v.url + '" id="'+ v._id + '" class="travimage" data-name="travimage"/>';
          output += '<div class="location-text"><p class="'+ v._id +'">'+ v.location +'</p></div>';
          output += '</div><div><p class="text-center">';
          output += '<button class="glyphicon glyphicon-heart heart button-override" aria-hidden="true" value="'+ v._id +'"></button>';
          output += '<button class="glyphicon glyphicon-plus button-override" aria-hidden="true" id="plus"></button><br /></p></div><div id="details">';
          output += '<a id="travel-type">' + v.interests + '</a>';
          output += '<a id="user-photo">' + v.user_name + '</a>';
          output += '<a><img src="' + v.user_profile_pic + '"/></a>';
          output += '</div></div></div>';
          $('#update').append(output);
        });

      }
    }    
  } */




   
    /*var json_data = "js/data.json";

    $.getJSON(json_data, function(data) {
        var output = '';

        $.each(data.cards, function(k, v) {
            output = '<div class="row"><div class="col-md-12 text-center travscapade"><div class="user-content">';
            output += '<img src="' + v.url + '" id="'+ v._id + '" class="travimage" data-name="travimage"/>';
            output += '<div class="location-text"><p class="'+ v._id +'">'+ v.location +'</p></div>';
            output += '</div><div><p class="text-center">';
            output += '<button class="glyphicon glyphicon-heart heart button-override" aria-hidden="true" value="'+ v._id +'"></button>';
            output += '<button class="glyphicon glyphicon-plus button-override" aria-hidden="true" id="plus"></button><br /></p></div><div id="details">';
            output += '<a id="travel-type">' + v.interests + '</a>';
            output += '<a id="user-photo">' + v.user_name + '</a>';
            output += '<a><img src="' + v.user_profile_pic + '"/></a>';
            output += '</div></div></div>';
            $('#update').append(output);
        });
    }); //get json data from URL*/

    $(document).on("click", ".heart" , function() {
      //$(this).css("color","red");
      //$(this).css("-webkit-text-stroke", "0px");
      var imageID = $(this).attr("value");
      onLike(imageID);
      /*$('#overlay_'+image_id).css("display", "block");
      $('#location_'+image_id).css("display", "block");
      $('#description_'+image_id).css("display", "block");

      //$("#"+image_id).css("transition", "filter 0.5s ease-in-out");
      //$("."+ image_id).addClass("important-display-on");

      /*setTimeout(function() {
        $("."+ image_id).addClass("important-opacity-1");
      },200);

      setTimeout(function() {
        $("#"+ image_id).css("filter", "grayscale(0%)");
        $("."+ image_id).addClass("important-opacity-0");
      }, 2000);*/

      /*setTimeout(function() {
        $("."+ image_id).addClass("important-display-off");
        $("."+ image_id).removeClass("important-opacity-0");
        // $("."+ image_id).removeClass("important-opacity-0");
        // $("."+ image_id).removeClass("important-opacity-1");
      },2500);*/

    }); //like button (heart) function



    $(document).on("click", ".glyphicon-plus" , function() {
      var imageID = $(this).attr("value");
      onBucketList(imageID);
    });


    function onLike(imageID) {
      $('#like_button_'+imageID).css("color","red");
      $('#like_button_'+imageID).css("-webkit-text-stroke", "0px");
      $('#overlay_'+imageID).css("display", "block");
      $('#location_'+imageID).css("display", "block");
      $('#description_'+imageID).css("display", "block");
    }

    function onBucketList(imageID) {
      $('#bucket_button_'+imageID).css("color","red");
      $('#bucket_button_'+imageID).css("-webkit-text-stroke", "0px");
    }


    $(document).on("click", ".location-text-picture" , function() {
      openLocationInfoModal($(this).attr("value"));
    });


    $('#button-close-modal').click(function() {
      closeLocationInfoModal();
    });


    function openLocationInfoModal(cardID) {
      $('#location-info-modal').css("display", "block");
      var card = getCard(cardID);
      console.log(card);

      google.maps.event.trigger(map, "resize");
      if(marker)
        marker.setMap(null);
      //map.clearOverlays();
      destination = {lat: card.latitude, lng: card.longitude};
      marker = new google.maps.Marker({
        position: destination,
        map: map
      });
      map.panTo(destination);
     




      $('#location-info-name').html(card.location_info_name);
      $('#location-info-summary').html(card.location_info_summary);
      $('#location-info-link').attr("href", card.location_info_link);

      var monthNames = ['Jan', 'Feb', 'Mar', "Apr", "May", "Jun", 'Jul', 'Aug', 'Sep', "Oct", 'Nov', 'Dec'];
      var scoreBar = $('#score-bar');
      scoreBar.empty();
      for (var i=0; i<12; i++) {
        var mon = $('<span/>', {'text':monthNames[i]});
        mon.css('display', 'inline-block');
        mon.css('width', '8.3%');
        if(i==0) {
          mon.css('margin-left', '0.2%');
        }
        var score = Math.floor(card.location_score[i]);
        if (score == 3)
          score =2;
        var nxtScore = -1;
        if(i<11) {
          nxtScore = Math.floor(card.location_score[i+1]);
        } else {
          nxtScore = Math.floor(card.location_score[0]);
        }
        if(nxtScore == 3)
          nxtScore=2;
        
        if (score == nxtScore || i == 11) {
          if(score == 0) {
            mon.css('background', 'red');
          } else if (score == 1) {
            mon.css('background', 'yellow');
          } else {
            mon.css('background', 'green');
          }
        }

        if(score == 0 && nxtScore == 1) {
          mon.css('background', 'linear-gradient(to right, red, yellow)');
        } else if (score == 1 && nxtScore == 0) {
          mon.css('background', 'linear-gradient(to right, yellow, red)');
        } else if (score == 1 && nxtScore == 2) {
          mon.css('background', 'linear-gradient(to right, yellow, green)');
        } else if (score == 2 && nxtScore == 1) {
          mon.css('background', 'linear-gradient(to right, green, yellow)');
        } else if (score == 0 && nxtScore == 2) {
          mon.css('background', 'linear-gradient(to right, red, green)');
        } else if (score == 2 && nxtScore == 0) {
          mon.css('background', 'linear-gradient(to right, green, red)');
        }

        mon.appendTo(scoreBar);
      }
      
    }


    function closeLocationInfoModal() {
      $('#location-info-modal').css("display", "none");
    }



  

    function getCard(cardID) {
      for (var i=0; i<cardsArray.length;i++) {
        if (cardsArray[i]._id == cardID) {
          return cardsArray[i];
        }
      }
    }


    $(document).on("dblclick",".travimage", function() {
      var image_id = $(this).attr("id");
      console.log(image_id);
      $("input[value=" + image_id + "]").css("color","red");
      $("input[value=" + image_id + "]").css("-webkit-text-stroke", "0px");
      $(this).css("filter", "grayscale(100%)");
      $(this).css("transition", "filter 0.5s ease-in-out");
      $("."+ image_id).addClass("important-display-on");

      setTimeout(function() {
        $("."+ image_id).addClass("important-opacity-1");
      },200);

      setTimeout(function() {
        $("#"+image_id).css("filter", "grayscale(0%)");
        $("."+ image_id).addClass("important-opacity-0");
      }, 2000);

      setTimeout(function() {
        $("."+ image_id).addClass("important-display-off");
        $("."+ image_id).removeClass("important-opacity-0");
        // $("."+ image_id).removeClass("important-opacity-0");
        // $("."+ image_id).removeClass("important-opacity-1");
      },2500);
    }); //double-click on image to like function
}); //document ready





function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: destination,
    zoom: 4
  });
}