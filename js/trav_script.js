$(document).ready(function() {

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


  Backend.getCards(function(data) {
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
      var image_id = $(this).attr("value");
      var interest = $("#travel-type." + image_id).text();
      var location = $("."+image_id).text();
      $(this).css("color","red");
      $(this).css("-webkit-text-stroke", "0px");
      $("#"+image_id).css("filter", "grayscale(100%)");
      $("#"+image_id).css("transition", "filter 0.5s ease-in-out");
      $("."+ image_id).addClass("important-display-on");

      setTimeout(function() {
        $("."+ image_id).addClass("important-opacity-1");
      },200);

      setTimeout(function() {
        $("#"+ image_id).css("filter", "grayscale(0%)");
        $("."+ image_id).addClass("important-opacity-0");
      }, 2000);

      setTimeout(function() {
        $("."+ image_id).addClass("important-display-off");
        $("."+ image_id).removeClass("important-opacity-0");
        // $("."+ image_id).removeClass("important-opacity-0");
        // $("."+ image_id).removeClass("important-opacity-1");
      },2500);
    }); //like button (heart) function

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
