$(document).ready(function() {

	var userID = sessionStorage.getItem('userID');
	var pictureCards =[];

	Backend.getUserPictures("589593bbac48cd73cb0811aa", function(err, cards) {
		if(err) {
			wondow.alert("Could not fetch pictures");
		} else {
			pictureCards = cards;
			console.log(pictureCards);
			populateGallery();
		}
	});


	function populateGallery() {
		var count = pictureCards.length;
		var nRows = Math.ceil(count/3);
		var container = $('#gallery');
		for (var i=0; i<nRows; i++) {
			var row = $('<div/>', {id:'row' + i});
			row.addClass('row');
			row.appendTo(container);
		}

	

		pictureCards.forEach(function(card, idx) {
			var col = $('<div/>', {class:'col-md-4'});
			//col.css('background', '#AAAAAA');
			var square = $('<div/>', {class:'square'});
			var item = $('<img/>', {src:card.url});
			item.addClass('img-thumbnail');
			item.appendTo(square);
			square.appendTo(col);
			col.appendTo($('#row'+Math.floor(idx/3)));
		});

	}





});


