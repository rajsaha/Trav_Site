$(document).ready(function() {
    var json_data = "js/data.json";

    $.getJSON(json_data, function(data) {
        var output = '';

        $.each(data.cards, function(k, v) {
            output = '<div class="row"><div class="col-md-12 text-center travscapade"><div class="user-content">';
            output += '<img src="' + v.url + '" id="'+ v._id + '" class="travimage"/>';
            output += '<div class="location-text"><p class="'+ v._id +'">'+ v.location +'</p></div>';
            output += '</div><div><p class="text-center"><button class="glyphicon glyphicon-heart heart" aria-hidden="true" value="'+ v._id +'"></button><button class="glyphicon glyphicon-plus" aria-hidden="true" id="plus"></button><br /></p></div><div id="details">';
            output += '<a id="travel-type">' + v.interests + '</a>';
            output += '<a id="user-photo">' + v.user_name + '</a>';
            output += '<a><img src="' + v.user_profile_pic + '"/></a>';
            output += '</div></div></div>';
            $('#update').append(output);
        });
    }); //get json data from URL

    $(document).on("click", ".heart" , function() {
      var image_id = $(this).attr("value");
      var interest = $("#travel-type." + image_id).text();
      var location = $("."+image_id).text();
      console.log(location);
      $(this).css("color","red");
      $(this).css("-webkit-text-stroke", "0px");
      $("#"+image_id).css("filter", "grayscale(100%)");
      $("#"+image_id).css("transition", "filter 0.5s ease-in-out");
      $("."+ image_id).addClass("important-opacity-1");
      //$("#travel-type." + image_id).text(interest + " in " + location);
      console.log(image_id);
      var output_css = $("."+ image_id).css("opacity","0.0");
      //console.log(output_css);

      setTimeout(function() {
        $("#"+ image_id).css("filter", "grayscale(0%)");
        $("."+ image_id).addClass("important-opacity-0");
      }, 2000);
    });

    $(document).on("dblclick", ".travimage" , function() {
      var image_id = $(this).attr("id");
      console.log(image_id);
      $("input[value=" + image_id + "]").css("color","red");
      $("input[value=" + image_id + "]").css("-webkit-text-stroke", "0px");
      $(this).css("filter", "grayscale(100%)");
      $(this).css("transition", "filter 0.5s ease-in-out");
      $("."+ image_id).addClass("important-opacity-1");

      setTimeout(function() {
        $("#"+image_id).css("filter", "grayscale(0%)");
        $("."+ image_id).addClass("important-opacity-0");
      }, 2000);
    });
}); //document ready
