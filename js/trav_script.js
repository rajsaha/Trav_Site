var map;
var destination = {lat: 0, lng: 0};
var marker;

$(document).ready(function() {


  var userID = sessionStorage.getItem('userID');
  var user = JSON.parse(sessionStorage.getItem('user'));
  var interestList = JSON.parse(sessionStorage.getItem('interestList'));
  var links = [
    {
      "bgcolor":"red",
      "icon":"+"
    },
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
  ];
  var cardsArray = [];
  var interestsShown = false;

    
  /*console.log(user);
  console.log(interestList);




  if (user.interests.length == 0) {
    console.log("Requesting interest");
    openInterestSelection(null, function(selectedInterests) {
      console.log("User has selected: ", selectedInterests);
      user.interests = selectedInterests;
      updateUserInterests(selectedInterests);
      setupHomePage();
    });    
  } else {
    setupHomePage();
  }*/

  //Test in Local
  setupHomePage();



  function setupAutoComplete() {
    autocomplete = new google.maps.places.Autocomplete(
          (document.getElementById('autocomplete')),
          {types: ['geocode']});
  }


  
  function updateUserInterests(selectedInterests) {
    Backend.updateUserInterests(userID, selectedInterests, function(err) {
      if(err) {
        window.alert('Failed to Update Interest');
      } else {

      }
    })
  }



  function closeInterestSeletion() {
    //selectedInterests = [];
    //$('#interest-list').empty();
    $('#select-interest-modal').css('display', 'none');
  }


  function openInterestSelection(preSelectedInterests, callback) {
    $('#select-interest-modal').css('display', 'block');
    $('#button-close-modal').click(function() {
      closeInterestSeletion();
    });

    if(interestsShown)
      return;

    var interestList = JSON.parse(sessionStorage.getItem('interestList'))['interests'];
    //var interestList = [{'interest':'Hiking'}, {'interest':'Biking'}, {'interest':'Diving'}];
    var container = $('#interest-list');
    interestList.forEach(function(element, idx) {
      $('<input />', { type: 'checkbox', id: idx, value: element.interest }).appendTo(container);
      $('<label />', {text: element.interest }).appendTo(container);
      $('<br>').appendTo(container);
    });

    $('<button />', {text: 'Done', id: 'select-return'}).appendTo(container);
    interestsShown = true;

    console.log(preSelectedInterests);
    if(preSelectedInterests) {
      preSelectedInterests.forEach(function(element) {
        var selectedIdx = interestList.findIndex(function(interestObj) {
          return (interestObj.interest==element)
        })
        console.log(typeof selectedIdx + " " + selectedIdx + " " +  $("#"+selectedIdx));
        $("#"+selectedIdx).prop('checked', true);
      });
    }

    $('#select-return').click(function() {
      selectedInterests = [];
      var checkboxes = container.find(':checkbox');
      checkboxes.each(function(idx) {
        if($( this ).prop('checked')  == true) {
          selectedInterests.push($( this ).val());
          //console.log($( this ).val());
        }
      });
      
      closeInterestSeletion();
      callback(selectedInterests);
    });
      
    
  }


 

  function populateCards(refresh, newCardIdx) {
    if(refresh == true) {
      $('#update').empty();
    }

    var start = 0;
    if(newCardIdx) {
      start = newCardIdx;
    }

    var output = '';
    for (var i=start; i<cardsArray.length;i++) {
      var v = cardsArray[i];
    //$.each(cardsArray, function(k, v) {
      console.log(v);
      
      if (v.card_type == 'photo') {
        output =   '<div class="row">';
        output +=   '<div class="col-md-4" >';
        output +=   '</div>'
        output +=   '<div class="col-md-4 travscapade">';
        output +=     '<div class="user-content">';
        output +=       '<img src="' + v.url + '" id="'+ v._id + '" class="travimage center-block" data-name="travimage" />';
        output +=       '<div id="overlay_' + v._id + '" class="overlay-picture"></div>';
        output +=       '<div id="location_' + v._id + '" value="' + v._id + '" class="location-text-picture"><p class="'+ v._id +'">'+ v.location +'</p></div>';
        output +=     '</div>';
        output +=     '<div class="buttons-div">'; 
        output +=       '<p class="text-center">';
        output +=         '<button id="like_button_' + v._id + '" class="glyphicon glyphicon-heart heart button-override" aria-hidden="true" value="'+ v._id +'"></button>';
        output +=         '<span class="likes" id="likes_' + v._id + '">' + v.likes + '</span>';
        output +=         '<button id="bucket_button_' + v._id + '" class="glyphicon glyphicon-plus button-override" aria-hidden="true" value="'+ v._id +'"></button>';
        output +=         '<span id="bucket_count_' + v._id + '">' + v.bucket_count + '</span>';
        output +=       '</p><br />';
        output +=     '</div>';
        output +=     '<div id="details" class="text-center">';
        output +=       '<a id="travel-type">' + v.interests + '</a>';
        output +=       '<a>' + v.user_name + '</a>';
        output +=       '<a><img src="' + v.user_profile_pic + '"/></a>';
        output +=     '</div>';
        output +=     '<div id="description_' + v._id + '" class="picture-description"><p class="'+ v._id +'">'+ v.description +'</p></div>';
        output +=   '</div>';
        output +=   '<div class="col-md-4" >';
        output +=   '</div>'
        output +=  '</div>';

        
      } else if (v.card_type == "blog") {
        output =  '<div class="row">';
        output +=   '<div class="col-md-4" >';
        output +=   '</div>'
        output +=   '<div class="col-md-4 travscapade" >';
        output +=     '<div class="blog-title"><p>' + v.title + '</p></div>';
        output +=     '<div class="user-content">';
        output +=       '<img src="' + v.thumbnail + '" id="'+ v._id + '" class="travimage" data-name="travimage" />';
        output +=       '<div class="overlay-blog"></div>';
        output +=       '<div class="blog-extract"><p>' + v.description + '</p></div>';
        output +=     '</div>';
        output +=     '<div id="location_' + v._id + '" class="location-text-blog"><p class="'+ v._id +'">'+ v.location +'</p></div>';
        output +=     '<div class="buttons-div">'; 
        output +=       '<p class="text-center">';
        output +=         '<button id="like_button_' + v._id + '" class="glyphicon glyphicon-heart heart button-override" aria-hidden="true" value="'+ v._id +'"></button>';
        output +=         '<span class="likes" id="likes_' + v._id + '">' + v.likes + '</span>';
        output +=         '<button id="bucket_button_' + v._id + '" class="glyphicon glyphicon-plus button-override" aria-hidden="true" value="'+ v._id +'"></button>';
        output +=         '<span id="bucket_count_' + v._id + '">' + v.bucket_count + '</span>';
        output +=       '</p><br />';
        output +=     '</div>';
        output +=     '<div id="details">';
        output +=       '<a id="travel-type-blog">' + v.interests + '</a><br>';
        output +=       '<a>' + v.user_name + '</a>';
        output +=       '<a><img src="' + v.user_profile_pic + '"/></a>';
        output +=     '</div>';
        output +=   '</div>';
        output +=   '<div class="col-md-4" >';
        output +=   '</div>'
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

    }
  }







  function setupHomePage() {
    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDI1IKGx1lrpkAszfQZQ-NNpyt9Fi0CBNs&callback=initMap';
    document.getElementsByTagName('head')[0].appendChild(js_file);

    setupAutoComplete();

    
    $('.kc_fab_wrapper').kc_fab(links);


    Backend.getCards(cardsArray.length, "589593bbac48cd73cb0811aa", 500, 500, function(data) {
    //Backend.getCards(cardsArray.length, userID, 500, 500, function(data) {
      cardsArray = data.cards;
      populateCards(true);

    //Backend.getCards(userID, 500, 500, function(data) {
      /*var output = '';
      cardsArray = data.cards;
      $.each(data.cards, function(k, v) {
        console.log(v);
        
        if (v.card_type == 'photo') {
          output =   '<div class="row">';
          output +=   '<div class="col-md-4" >';
          output +=   '</div>'
          output +=   '<div class="col-md-4 travscapade">';
          output +=     '<div class="user-content">';
          output +=       '<img src="' + v.url + '" id="'+ v._id + '" class="travimage center-block" data-name="travimage" />';
          output +=       '<div id="overlay_' + v._id + '" class="overlay-picture"></div>';
          output +=       '<div id="location_' + v._id + '" value="' + v._id + '" class="location-text-picture"><p class="'+ v._id +'">'+ v.location +'</p></div>';
          output +=     '</div>';
          output +=     '<div class="buttons-div">'; 
          output +=       '<p class="text-center">';
          output +=         '<button id="like_button_' + v._id + '" class="glyphicon glyphicon-heart heart button-override" aria-hidden="true" value="'+ v._id +'"></button>';
          output +=         '<span class="likes" id="likes_' + v._id + '">' + v.likes + '</span>';
          output +=         '<button id="bucket_button_' + v._id + '" class="glyphicon glyphicon-plus button-override" aria-hidden="true" value="'+ v._id +'"></button>';
          output +=         '<span id="bucket_count_' + v._id + '">' + v.bucket_count + '</span>';
          output +=       '</p><br />';
          output +=     '</div>';
          output +=     '<div id="details" class="text-center">';
          output +=       '<a id="travel-type">' + v.interests + '</a>';
          output +=       '<a>' + v.user_name + '</a>';
          output +=       '<a><img src="' + v.user_profile_pic + '"/></a>';
          output +=     '</div>';
          output +=     '<div id="description_' + v._id + '" class="picture-description"><p class="'+ v._id +'">'+ v.description +'</p></div>';
          output +=   '</div>';
          output +=   '<div class="col-md-4" >';
          output +=   '</div>'
          output +=  '</div>';

          
        } else if (v.card_type == "blog") {
          output =  '<div class="row">';
          output +=   '<div class="col-md-4" >';
          output +=   '</div>'
          output +=   '<div class="col-md-4 travscapade" >';
          output +=     '<div class="blog-title"><p>' + v.title + '</p></div>';
          output +=     '<div class="user-content">';
          output +=       '<img src="' + v.thumbnail + '" id="'+ v._id + '" class="travimage" data-name="travimage" />';
          output +=       '<div class="overlay-blog"></div>';
          output +=       '<div class="blog-extract"><p>' + v.description + '</p></div>';
          output +=     '</div>';
          output +=     '<div id="location_' + v._id + '" class="location-text-blog"><p class="'+ v._id +'">'+ v.location +'</p></div>';
          output +=     '<div class="buttons-div">'; 
          output +=       '<p class="text-center">';
          output +=         '<button id="like_button_' + v._id + '" class="glyphicon glyphicon-heart heart button-override" aria-hidden="true" value="'+ v._id +'"></button>';
          output +=         '<span class="likes" id="likes_' + v._id + '">' + v.likes + '</span>';
          output +=         '<button id="bucket_button_' + v._id + '" class="glyphicon glyphicon-plus button-override" aria-hidden="true" value="'+ v._id +'"></button>';
          output +=         '<span id="bucket_count_' + v._id + '">' + v.bucket_count + '</span>';
          output +=       '</p><br />';
          output +=     '</div>';
          output +=     '<div id="details">';
          output +=       '<a id="travel-type-blog">' + v.interests + '</a><br>';
          output +=       '<a>' + v.user_name + '</a>';
          output +=       '<a><img src="' + v.user_profile_pic + '"/></a>';
          output +=     '</div>';
          output +=   '</div>';
          output +=   '<div class="col-md-4" >';
          output +=   '</div>'
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

      });*/
    });
  }




  $(document).on("click", ".heart" , function() {
    //$(this).css("color","red");
    //$(this).css("-webkit-text-stroke", "0px");
    var cardID = $(this).attr("value");
    var cardIdx = getCardIdx(cardID);
    cardsArray[cardIdx].likes++;
    Backend.registerLikeCard(userID, cardID);
    onLike(cardID);
  }); //like button (heart) function



  $(document).on("click", ".glyphicon-plus" , function() {
    var cardID = $(this).attr("value");
    var cardIdx = getCardIdx(cardID);
    cardsArray[cardIdx].bucket_count++;
    Backend.registerBucketCard(userID, cardID);
    onBucketList(cardID);
  });


  $(document).on("click", ".location-text-picture" , function() {
    openLocationInfoModal($(this).attr("value"));
  });


  $('#button-close-modal').click(function() {
    closeLocationInfoModal();
  });

  $('#button-user-interests').click(function() {
    openInterestSelection(user.interests, function(selectedInterests) {
      user.interests = selectedInterests;
      updateUserInterests(selectedInterests);
    })
  });


  $('#button-logout').click(function() {
    window.location = "/signin.html?state=logout"; 
  });


  function onLike(cardID) {
    $('#like_button_'+cardID).css("color","red");
    $('#like_button_'+cardID).css("-webkit-text-stroke", "0px");
    $('#like_button_'+cardID).prop('disabled', true);
    $('#overlay_'+cardID).css("display", "block");
    $('#location_'+cardID).css("display", "block");
    $('#description_'+cardID).css("display", "block");
    $('#likes_'+cardID).html(cardsArray[getCardIdx(cardID)].likes);
  }

  function onBucketList(cardID) {
    $('#bucket_button_'+cardID).css("color","red");
    $('#bucket_button_'+cardID).css("-webkit-text-stroke", "0px");
    $('#bucket_button_'+cardID).prop('disabled', true);
    $('#bucket_count_'+cardID).html(cardsArray[getCardIdx(cardID)].bucket_count); 

  }



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




  $('#button-close-search').click(function() {
    $('#autocomplete').css('display', 'none');
    $('#button-close-search').css('display', 'none');
    Backend.getCards(cardsArray.length, userID, 500, 500, function(data) {
      cardsArray = data.cards;
      populateCards(true);
    });
  }); 


  //Search 
  $('#search-button').click(function() {
    if ($('#autocomplete').css('display') == 'none') {
      $('#autocomplete').css('display', 'inline-block');
      $('#button-close-search').css('display', 'inline-block');
    } else {
      var place = autocomplete.getPlace();
      if (!place) {

      } else {
        console.log(place['formatted_address']);
        var locationString = place['formatted_address'];
        Backend.search(userID, locationString, function(err, data) {
          console.log(data);
          cardsArray = data.cards;
          populateCards(true);
        });
        
      }
    }


  }); 



  //Infinite Scroll
  var loading = false;
  $(window).scroll(loadMore);

  function loadMore () {
    if(loading == true) {
      return;
    }

    if($(window).scrollTop() > $(document).height()*0.8) {
      loading = true;
      console.log("Loading More");
      Backend.getCards(cardsArray.length, "589593bbac48cd73cb0811aa", 500, 500, function(data) {
      //Backend.getCards(cardsArray.length, userID, 500, 500, function(data) {
        if(data.cards.length == 0) {
          $(window).scroll(null);
          $('.loader').css('display', 'none');
          return;
        }
        console.log("New Cards");
        var newIdx = cardsArray.length;
        cardsArray = cardsArray.concat(data.cards);
        populateCards(false, newIdx);
        loading = false;
      });

    }
  }



  

  function getCard(cardID) {
    for (var i=0; i<cardsArray.length;i++) {
      if (cardsArray[i]._id == cardID) {
        return cardsArray[i];
      }
    }
  }


  function getCardIdx(cardID) {
    for (var i=0; i<cardsArray.length;i++) {
      if (cardsArray[i]._id == cardID) {
        return i;
      }
    }
  }
    
}); //document ready





function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: destination,
    zoom: 4
  });
}