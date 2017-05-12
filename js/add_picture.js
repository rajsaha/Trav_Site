$(document).ready(function() {



    var token = sessionStorage.getItem('token');
    var userID = sessionStorage.getItem('userID');



    var cropper = new Slim(document.getElementById('myCropper'), {
        ratio: '1:1',
        instantEdit: false,
        label: 'Drop your image here.',
        buttonConfirmLabel: 'Ok',
    });




    /*var albumBucketName = 'travnet';
    var bucketRegion = 'ap-southeast-1';

    AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      })
    });

    var s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: albumBucketName}
    });*/


    var appId = '495600770631539';
    var roleArn = 'arn:aws:iam::327601793296:role/WebApp';
    var bucketName = 'travnet';
    AWS.config.region = 'ap-southeast-1';

    console.log(token);

    var bucket = new AWS.S3({
        params: {
            Bucket: bucketName
        }
    });

    bucket.config.credentials = new AWS.WebIdentityCredentials({
        ProviderId: 'graph.facebook.com',
        RoleArn: roleArn,
        WebIdentityToken: token
    });



    $('#submit-button').click(function() {
        console.log("upload button clicked")
        //var image = cropper.data.output.image.getContext("2d").getImageData(0,0,50,50).data;
        /*var image = cropper.data.output.image.toDataURL("image/png");
        var png = image.split(',')[1];
        var file = new Blob([window.atob(png)],  {type: 'image/png', encoding: 'utf-8'}); */

        var binStr = atob( cropper.data.output.image.toDataURL("image/png").split(',')[1] ),
            len = binStr.length,
            arr = new Uint8Array(len);

        for (var i=0; i<len; i++ ) {
            arr[i] = binStr.charCodeAt(i);
        }

        var file = new Blob( [arr], {type: 'image/png'} );          
        
        console.log(typeof file);
        console.log(file);
        
        if (file) {
            console.log("file found");
            uploadToS3(file);
        } else {
            window.alert("Image Not Selected");
        }

    })


    function uploadToS3(image) {
        var objKey = userID + '-test4.png';
        var params = {
            Key: objKey,
            ContentType: image.type,
            Body: image,
            ACL: 'public-read'
        };
        bucket.putObject(params, function (err, data) {
            if (err) {
                console.log(err);
                window.alert("Failed To Upload");
            } else {
                console.log("Upload to S3 Successful");
            }
        });
    }





   




});