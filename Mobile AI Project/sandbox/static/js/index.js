


const video = document.getElementById('webcam');

const liveStream = document.getElementById('live_stream');

const enable_cam = document.getElementById('cam_button');


var canvas = document.getElementById("canvas");

const category_list = [];

var model = undefined;

var cur_class = undefined;

//const canvas = document.querySelector('canvas');
//canvas.width = 480;
//canvas.height = 360;


var model = undefined;


cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;

  liveStreamn.classList.remove('hide');
});


  if (!!(navigator.mediaDevices.getUserMedia && navigator.mediaDevices)) {
    enable_cam.addEventListener('click', enableCam);
  } else {
    console.warn("webcam usage not supported in current browser");
  }
  

function enableCam(event) {

    if (!model) {
      return;
    }
    
 
    event.target.classList.add('removed');  
    

    const constraints = {
      video: true
    };
  

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      video.srcObject = stream;
      video.addEventListener('loadeddata', capture_object);
    });
  }


  

  function capture_object() {


      model.detect(video).then(function (predictions) {

      
      for (let n = 0; n < predictions.length; n++) {
 

            
          if (predictions[n].score>.9 && !category_list.includes(predictions[n].class)){
          
          
            cur_class = predictions[n].class;
           
            category_list.push(predictions[n].class);
            
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;


            canvas.getContext("2d").drawImage(video, 30, 50, video.videoWidth, video.videoHeight);



            var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

            
            var coord_0 = predictions[n].bbox[0];
            var coord_1 = predictions[n].bbox[1];
            var coord_2 = predictions[n].bbox[2];
            var coord_3 = predictions[n].bbox[3];

            fetch('/display', {
              headers : {
                  'Content-Type' : 'application/json'
              },
              method : 'POST',
              body : JSON.stringify( {
                  image , cur_class, coord_0, coord_1, coord_2, coord_3
              })
          })
          .then(function (response){
      
              if(response.ok) {
                  response.json()
                  .then(function(response) {
                      console.log(response);
                  });
              }
              else {
                  throw Error('Something went wrong');
              }
          })
          .catch(function(error) {
              console.log(error);
          });



            console.log(image)
          }
        
      }
      
    
      window.requestAnimationFrame(capture_object);
    });
  }




