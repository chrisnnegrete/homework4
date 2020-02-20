// Classifier Variable
let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/ByxVOJjZ/model.json';

let video;
let flippedVideo;
let label = "";

var empty;
var knife = 0;
var pen = 0;
var headphones = 0;

function preload() {
  classifier = ml5.imageClassifier(imageModelURL);
}

function setup() {
  createCanvas(320, 260);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  classifyVideo();
}

function draw() {
  background(0);
  image(flippedVideo, 0, 0);

  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
  
  fill(255);
  textSize(20);
  text("Knife: " + knife, 40, 25);
  
  fill(255);
  textSize(20);
  text("Pen: " + pen, 150, 25);
  
  fill(255);
  textSize(20);
  text("Phones: " + headphones, 265, 25);

if(label == "Knife") {
  knife++;
  
} else if(label == "Pen") {
  pen++;
  
} else if(label == "Headphones") {
  headphones++;
 }
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(results[0].label);
  label = results[0].label;
  classifyVideo();
}
