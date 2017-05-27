$(document).ready(function() {

	var userID = sessionStorage.getItem('userID');
	var blogTitle;
	var blogUrl;
	var thumbnailUrl;
	var blogExtract;


	$('#preview-button').click(function() {

		blogUrl = $('#blog-url').val();
		//console.log(url);
		if(!blogUrl) {
			window.alert("Enter URL");
		} else {
			Backend.getLinkPreview(blogUrl, function(err, info) {
				if(err) {
					console.log(err);
					window.alert("Could not get preview");
				} else {
					//console.log(info);
					blogTitle = info.title;
					thumbnailUrl = info.image;
					blogExtract = info.extract;
					$('#title').html(info.title);
					$('#extract').html(info.extract);
					$('#location-input').css('display', 'block');
					$('#interest-input').css('display', 'block');
					$('#upload-button').css('display', 'block');
					$('#thumbnail').attr('src', info.image);
					$('#thumbnail').css('display', 'block');

					autocomplete = new google.maps.places.Autocomplete(
					        (document.getElementById('autocomplete')),
					        {types: ['geocode']});

					$('#interest-input').click(function() {
						openInterestSeletion(null, onInterestSelected);
					}) 
					
				}
			});
		}


	});



	$('#interest-input').click(function() {
		openInterestSeletion(null, onInterestSelected);
	});



	function closeInterestSeletion() {
		//selectedInterests = [];
		//$('#interest-list').empty();
		$('#select-interest-modal').css('display', 'none');
	}
	

	var interestsShown = false;

	function openInterestSeletion(preSelectedInterests, callback) {
		var selectedInterests = [];
		$('#select-interest-modal').css('display', 'block');
		$('#button-close-modal').click(function() {
			closeInterestSeletion();
		});

		if(interestsShown)
			return;

		var interestList = JSON.parse(sessionStorage.getItem('interestList'))['interests'];
		//var interestList = [{'interest':'Hiking'}, {'interest':'Biking'}, {'interest':'Diving'}];
		var container = $('#interest-list');
		interestList.forEach(function(element) {
			$('<input />', { type: 'checkbox', id: element.interest, value: element.interest }).appendTo(container);
			$('<label />', {text: element.interest }).appendTo(container);
			$('<br>').appendTo(container);
		});

		$('<button />', {text: 'Done', id: 'select-return'}).appendTo(container);
		interestsShown = true;

		$('#select-return').click(function() {
			selectedInterests = [];
			var checkboxes = container.find(':checkbox');
			checkboxes.each(function(idx) {
				if($( this ).prop('checked')  == true) {
					selectedInterests.push($( this ).val());
					//console.log($( this ).val());
				}
			});

			callback(selectedInterests);
			
			
		});
			
		
	}

	function onInterestSelected(selectedInterests) {
		console.log(selectedInterests);
		showSelectedInterest(selectedInterests);
		closeInterestSeletion();
	}


	function showSelectedInterest(selectedInterests) {
		//var container = $('#interest-input');
		$('#button-select-interest').val(selectedInterests.toString());
	}



	$('#upload-button').click(function() {
		var place = autocomplete.getPlace();
        if (!place) {
            window.alert("Location Not Selected");
            return;    
        }

        if((selectedInterests).length == 0){
            window.alert("Interest Not Selected");
            return;
        }

        var place = autocomplete.getPlace();
        var addrArray = place['formatted_address'].split(',');
        var country = addrArray[addrArray.length-1];
        var locationString = place['name'] + ", " + country;
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();

        console.log(blogUrl);
        Backend.postBlogCard(userID, blogUrl, blogTitle, blogExtract, thumbnailUrl, selectedInterests, place.id, locationString, lat, lng, function() {
        	window.location = "/index.html";
        })

	});


	/*function initializeInterestList() {
		var selectInterest = document.getElementById('button-select-interest');
		var interestList = JSON.parse(sessionStorage.getItem('interestList'))['interests'];
		
		interestList.forEach(function(element) {
		    var option = document.createElement( 'option' );
		    option.value = element.interest;
		    option.innerHTML = element.interest;
		    selectInterest.appendChild(option);
		});

		selectInterest.selectedIndex = -1;

	}*/


});