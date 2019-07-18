var ripples = []

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas=createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
}

function draw() {
  background(51);

  if (random(0,1)>.95){
    var newrip = new Ripple(createVector(random(0,windowWidth), random(0,windowHeight)), random(4,10));
  }
  ripples.push(newrip);
  for (var i=0; i<ripples.length;i++){
    try{
      if (ripples[i].opacity<=0){
        ripples.splice(i,1);
        continue;
      }

      ripples[i].update();
      ripples[i].render();
    }catch(Exception){
      continue;
    }
  }
	
  console.log(ripples.length);
}

function Ripple(pos, rate){
  this.pos = pos;

  this.opacity = 255;
  this.rate = rate;
  this.rad = 0;

  this.update = function(){
    this.opacity-=rate;
    this.rad+=4;
  }

  this.render = function(){
    noFill();
    stroke(255,255,255,this.opacity);
    strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, this.rad);
  }
}

function mousePressed(){
  var newrip = new Ripple(createVector(mouseX, mouseY), random(4,10));
  ripples.push(newrip);
}
