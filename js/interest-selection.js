var interestsShown = false;

function openInterestSeletion(preSelectedInterests, number, callback) {
	var selectedInterests = [];
	$('#select-interest-modal').css('display', 'block');
	$('#button-close-modal').click(function() {
		closeInterestSeletion();
	});

	if(interestsShown) {
		console.log("alradt shown");
		var checkboxes = $('#interest-list').find(':checkbox');
		checkboxes.each(function(idx) {
			if($( this ).prop('checked')  == true) {
				$( this ).prop('checked', false);
			}
		});
		return;
	}

	var interestList = JSON.parse(sessionStorage.getItem('interestList'))['interests'];
	//var interestList = [{'interest':'Hiking'}, {'interest':'Biking'}, {'interest':'Diving'}];
	var container = $('#interest-list');
	interestList.forEach(function(element) {
		var item = $('<div />', {class: 'interest-item check-container'});
		var label = $('<label />');
		label.attr('for', element.interest);
		var span = $('<span />', {class: 'tag'});
		span.html(element.interest);
		$('<input />', { type: 'checkbox', id: element.interest, value: element.interest, class:'check'}).appendTo(item);
		label.appendTo(item);
		span.appendTo(item);
		item.click(function() {
			var checkBox = $(this).find('#'+element.interest);
			checkBox.attr("checked", !checkBox.attr("checked"));
			if (number == 1) {
				returnInterests();
			}
		});
		item.appendTo(container);

	});

	$('<button />', {text: 'Done', id: 'select-return'}).appendTo(container);
	interestsShown = true;

	$('#select-return').click(returnInterests);


	if(number == 1) {
		$('.check').change(function() {
			console.log("changed");
			returnInterests();
		});

	}




	function returnInterests() {
		selectedInterests = [];
		var checkboxes = container.find(':checkbox');
		checkboxes.each(function(idx) {
			if($( this ).prop('checked')  == true) {
				selectedInterests.push($( this ).val());
				//console.log($( this ).val());
			}
		});

		callback(selectedInterests);
	}

	
}


function closeInterestSeletion() {
	//selectedInterests = [];
	//$('#interest-list').empty();
	$('#select-interest-modal').css('display', 'none');
}



