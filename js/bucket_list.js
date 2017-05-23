var map;
var markers = [];

$(document).ready(function() {


	var userID = sessionStorage.getItem('userID');

	var bucketList;


	var js_file = document.createElement('script');
	js_file.type = 'text/javascript';
	js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDI1IKGx1lrpkAszfQZQ-NNpyt9Fi0CBNs&callback=initMap';
	document.getElementsByTagName('head')[0].appendChild(js_file);

	Backend.getBucketList("589593bbac48cd73cb0811aa", function(err, data) {
		if(err) {
			window.alert("Could not Fetch Bucket List");
		} else {
			if(data.length == 0) {
				//Empty State
			} else {
				bucketList = data;
				var list = $('#country-list');
				for (var i=0; i<bucketList.length; i++) {
					var country = bucketList[i].name;
					var li = $('<li/>').html(country);
					li.attr('value', i);
					li.addClass('list-element');
					li.appendTo(list);
				}
				addCallbacks();
			}
		}

	});


	function addCallbacks() {
		$('.list-element').click(function() {
			var idx = $(this).attr('value');
			showBucketListOfCountry(bucketList[idx]);

		});
	}

	function showBucketListOfCountry(bucketListElement) {
		console.log(bucketListElement);
		var cards = bucketListElement.cards;
		$('#country-list').css('display', 'none');
		$('#bucket-list-country').css('display', 'block');

		$('#country-name').html(bucketListElement.name);


		google.maps.event.trigger(map, "resize");
		//if(marker)
		  //marker.setMap(null);

		var bounds = new google.maps.LatLngBounds();
		for (var i=0; i<cards.length; i++) {
			markers.push({lat: cards[i].latitude, lng: cards[i].longitude});
			marker = new google.maps.Marker({
		  		position: markers[i],
		  		map: map
			});
			bounds.extend(markers[i]);
			map.setZoom(map.getZoom() - 1);
		}  
		map.fitBounds(bounds);
		

		var pictureCards = $('#picture-cards');
		pictureCards.css('display', 'block');
		var pictureCardsList = $('#picture-cards-list');
		cards.forEach(function(card) {
			if (card.card_type == "photo") {
				var listItem = $('<li/>');
				//var listItem.addClass('pictureItem');
				var img = $('<img/>').attr('src', card.url);
				//img.addClass('image');	
				img.appendTo(listItem);
				img.addClass('img-responsive');
				img.addClass('img-thumbnail');
				listItem.appendTo(pictureCardsList);
			}
		});


		pictureCards.sly({
		    horizontal: 1,
		    itemNav: 'basic',
		    smart: 1,
		    activateOn: 'click',
		    mouseDragging: 1,
		    touchDragging: 1,
		    releaseSwing: 1,
		    startAt: 0,
		    speed: 300,
		    elasticBounds: 1,
		    next: $('#picture-cards-next'),
			prev: $('#picture-cards-prev'),
		  });
		

		var blogCards = $('#blog-cards');
		blogCards.css('display', 'block');
		var blogCardsList = $('#blog-cards-list');
		cards.forEach(function(card) {
			if (card.card_type == "blog") {
				console.log('blog');
				var listItem = $('<li/>');
				//var listItem.addClass('pictureItem');
				var img = $('<img/>').attr('src', card.thumbnail);
				//img.addClass('image');	
				img.appendTo(listItem);
				img.addClass('img-responsive');
				img.addClass('img-thumbnail');
				listItem.appendTo(blogCardsList);
			}
		});

		blogCards.sly({
		   horizontal: 1,
		    itemNav: 'basic',
		    smart: 1,
		    activateOn: 'click',
		    mouseDragging: 1,
		    touchDragging: 1,
		    releaseSwing: 1,
		    startAt: 0,
		    speed: 300,
		    elasticBounds: 1,
		    next: $('#blog-cards-next'),
			prev: $('#blog-cards-prev'),
		 });

		


	}


});




function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 4
  });
}