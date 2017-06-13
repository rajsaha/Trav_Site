$(document).ready(function() {


    var token = sessionStorage.getItem('token');
    var userID = sessionStorage.getItem('userID');
    console.log(userID);

    var interest;


    var cropper = new Slim(document.getElementById('myCropper'), {
        ratio: '4:3',
        instantEdit: false,
        label: 'Drop your image here.',
        buttonConfirmLabel: 'Ok',
        didConfirm: updateImage,
    });

    function updateImage(data) {
        var imgURL = cropper.data.output.image.toDataURL("image/png");
        cropper.ratio = 'input';
        cropper.load(imgURL, function(error, data){
            if(error) {
                console.log(error);
            } else {
                console.log('loading done');

            }
        }); 
    }

    function leaveInput(el) {
        console.log("lost focus");
        console.log(el.value);
        if (el.value.length > 0) {
            if (!el.classList.contains('active')) {
                    el.classList.add('active');
            }
        } else {
            if (el.classList.contains('active')) {
                    el.classList.remove('active');
            }
        }
    }

    var inputs = document.getElementsByClassName("m-input");
    for (var i = 0; i < inputs.length; i++) {
        var el = inputs[i];
        el.addEventListener("blur", function() {
            leaveInput(this);
        });
    }
    


    //var appId = '495600770631539';
    //var roleArn = 'arn:aws:iam::327601793296:role/WebApp';
    var roleArn = 'arn:aws:iam::327601793296:role/GoogleLogin';
    var bucketName = 'travnet';
    AWS.config.region = 'ap-southeast-1';

    console.log(token);

    var bucket = new AWS.S3({
        params: {
            Bucket: bucketName
        }
    });

    bucket.config.credentials = new AWS.WebIdentityCredentials({
        //ProviderId: 'graph.facebook.com',
        ProviderId: null,
        RoleArn: roleArn,
        WebIdentityToken: token,
    });



    //Google Autocomplete
    autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('autocomplete')),
            {types: ['geocode']});



    //Interest List
    $('#button-select-interest').click(function() {
        $('#button-select-interest').attr('value', 'Select');   
        openInterestSeletion(null, 1, onInterestSelected);
    });


    function onInterestSelected(selectedInterests) {
        console.log(selectedInterests);
        showSelectedInterest(selectedInterests);
        interest = selectedInterests[0];
        closeInterestSeletion();
    }

   function showSelectedInterest(selectedInterests) {
        if(selectedInterests.length > 0) {
            $('#button-select-interest').val(selectedInterests.join(', '));
            $('#button-select-interest').addClass('active');
        } else {
            $('#button-select-interest').val("");
            $('#button-select-interest').removeClass('active');
        }
    }



    function showLoader() {
        console.log("showing laoder");
        $('#loading-screen').css('display', 'block');
    }

    function hideLoader() {
        $('#loading-screen').css('display', 'none');
    }
    
    //var interestList = ['Hiking', 'Cycling', 'Diving'];
    /*var test = JSON.parse(sessionStorage.getItem('interestList'))['interests'];
    console.log(typeof test);
    console.log(test);
    
    //Interest List
    var selectInterest = document.getElementById('interest-list');
    test.forEach(function(element) {
        var option = document.createElement( 'option' );
        option.value = element.interest;
        option.innerHTML = element.interest;
        selectInterest.appendChild(option);
    });
    selectInterest.selectedIndex = -1;*/
    

    var pictureIdx = -1;



    $('#submit-button').click(function() {
        //console.log(autocomplete.getPlace());

        if (!cropper.data.output.image) {
            window.alert("Image Not Uploaded");
            return;
        }

        var place = autocomplete.getPlace();
        if (!place) {
            window.alert("Location Not Selected");
            return;    
        }

        //if((selectInterest).selectedIndex == -1){
        if(!interest) { 
            window.alert("Interest Not Selected");
            return;
        }

        showLoader();


        //Get Image file
        var binStr = atob( cropper.data.output.image.toDataURL("image/png").split(',')[1] ),
            len = binStr.length,
            arr = new Uint8Array(len);
        for (var i=0; i<len; i++ ) {
            arr[i] = binStr.charCodeAt(i);
        }
        var file = new Blob( [arr], {type: 'image/png'} );    

        if (!file) {
            hideLoader();
            window.alert("Error Reading Image");
            return;
        } 

        Backend.getUserPictureCount(userID, function(err, count) {
            if(err) {
                hideLoader();
                window.alert("Cannot Connect to Server");
                return;
            } else {
                console.log(count);
                pictureIdx = count;
                uploadToS3 (pictureIdx, file, function(err) {
                    if(err) {
                        hideLoader();
                        window.alert("Failed To Upload");
                        return;
                    } else {
                        postPictureCard();
                    }
                });
            }
        });
        
        

    })


    function uploadToS3(idx, imageFile, callback) {
        var objKey = userID + '-' + idx + '.png';
        var params = {
            Key: objKey,
            ContentType: imageFile.type,
            Body: imageFile,
            ACL: 'public-read'
        };
        bucket.putObject(params, function (err, data) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                console.log("Upload to S3 Successful");
                callback();
            }
        });
    }


    function postPictureCard() {
        //var interest = selectInterest.options[selectInterest.selectedIndex].value;
        var description = document.getElementById('description').value;
        var heading = document.getElementById('heading').value;
        var place = autocomplete.getPlace();
        var pictureUrl = "https://travnet.s3.amazonaws.com/" + userID + '-' + pictureIdx + '.png';
        var addrArray = place['formatted_address'].split(',');
        var country = addrArray[addrArray.length-1];
        var locationString = place['name'] + ", " + country;

        console.log(userID + "\n" + pictureUrl + "\n" + heading + "\n" + place.id + "\n" + locationString + "\n" + place.geometry.location.lat() + "\n" + place.geometry.location.lng() + "\n" + interest + "\n" + description);

        Backend.postPictureCard(userID, pictureUrl, heading, place.id, locationString, place.geometry.location.lat(), place.geometry.location.lng(), interest, description, function() {
            hideLoader();
            console.log("Successfully Posted Picture");
            window.location = "/index.html";
        });


    }


   




});