var json_data = "js/data.json";

$.getJSON(json_data, function(data) {
  var output = '';

  $.each(data.cards, function(k,v){
      output = '<div class="row"><div class="col-md-12 text-center travscapade"><div>';
      output += '<img src="' + v.url + '"/>';
      output += '</div><div><p class="text-center"><span class="glyphicon glyphicon-heart" aria-hidden="true" id="heart"></span><span class="glyphicon glyphicon-plus" aria-hidden="true" id="plus"></span><br /></p></div><div id="details">';
      output += '<span id="travel-type">' + v.interests + '</span>';
      output += '<span id="user-photo">' + v.user_name + '</span>';
      output += '<span><img src="' + v.user_profile_pic + '"/></span>';
      output += '</div></div></div>';
      $('#update').append(output);
  });
}); //get json data from URL
