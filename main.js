objects = [];
status = "";
alarm = "";
video = "";

function preload(){
   song = loadSound('alarm.wav');
 }

function setup(){
   canvas = createCanvas(640, 420);
   canvas.center();

   video = createCapture(VIDEO);
   video.hide();

   objectDetector = ml5.objectDetector('cocossd', modelLoaded);
   document.getElementById("status").innerHTML = "Status: Detecting Objects";
 }


function draw(){
   image(video, 0, 0, 640, 420);

   if (status != "") {
      for (let i = 0; i < objects.length; i++) {
         if (objects[i].label == "person") {
         document.getElementById("status").innerHTML = "Status : Object Detected.....";
         fill("#FF0000");
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + "" + percent +  "%", objects[0].x + 15, objects[i] + 15);
         noFill();
         stroke('#FF0000');
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         }
         if ((object[i] != "person") || (objects.length < 0.2)) {
            document.getElementById("status").innerHTML = "Status : Object Not Detected.....";
            song.play();
            song.setVolume();
         }
         
      }
    
   }
}

function modelLoaded(){
   console.log("Model Loaded!");
   status = true;

   objectDetector.detect(video, gotResults);
}

function gotResults(error, results) {
   if (error) {
      console.log(error);
   }
   console.log(results);
   objects = results;
    
}