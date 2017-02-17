'use strict';

require('./_landing.scss');

module.exports = ['$log', '$document', '$window', LandingController];

function LandingController($log, $document, $window) {
  $log.debug('init landingCtrl');

  this.onKeyDown = function() {
  };
  this.onKeyUp = function() {
    console.log('keyup');
  };

  // Set up canvas
  var canvas = $document.find('canvas')[0];
  var ctx = canvas.getContext('2d');
  canvas.width = $window.innerWidth;
  canvas.height = $window.innerHeight;
  let centerX = canvas.width/2, centerY = canvas.height/2;
  let startX =0, particles = {}, particleSize = 50;
  let radius = particleSize * (Math.sqrt(2)/2);
  let dy = 1, dx = 1;
  // circumscribed radius
  let C0 = (Math.sqrt(2) / 2)* particleSize;
  ctx.strokeStyle = '#ffffff';

  const Vector3D = function(x,y,z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  };

  // Star Particle Constructor
  const Particle = function(posx, posy, posz) {
    this.rotation = new Vector3D(0,0,0);
    this.position = new Vector3D(posx, posy, posz) || new Vector3D(0,0,0);
    this.vertices = [
      new Vector3D(0.0, 0.0, C0),
      new Vector3D(0.0, 0.0, -C0),
      new Vector3D( C0, 0.0, 0.0),
      new Vector3D(-C0, 0.0, 0.0),
      new Vector3D(0.0, C0, 0.0),
      new Vector3D(0.0, -C0, 0.0),
    ];
    this.faces = [
      { A:0, B:2, C:4 },
      { A:0, B:4, C:3 },
      { A:0, B:3, C:5 },
      { A:0, B:5, C:2 },
      { A:1, B:2, C:5 },
      { A:1, B:5, C:3 },
      { A:1, B:3, C:4 },
      { A:1, B:4, C:2 },
    ];
  };

  function generate(numParticles){
    for(var i = 0; i < numParticles; i++){
      startX += 20;
      particles[i] = new Particle(startX, centerY, 0);
    }
    return particles;
  }
  generate(1);

  function draw(star){
    for(let i = 0; i < star.faces.length; i++) {
      let face = star.faces[i];
      // Create each triangular face using indexes from faces array
      let vertexA = star.vertices[face.A];
      let vertexB = star.vertices[face.B];
      let vertexC = star.vertices[face.C];
      // Project here
      ctx.beginPath();
      ctx.moveTo(vertexA.x + centerX, vertexA.y + centerY);
      ctx.lineTo(vertexB.x + centerX, vertexB.y + centerY);
      ctx.lineTo(vertexC.x + centerX, vertexC.y + centerY);
      ctx.closePath();
      ctx.stroke();
    }
  }


  // Rendering loop handler
  function drawingLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(centerX + dx > canvas.width-radius || centerX + dx < radius) dx = -dx;
    if(centerY + dy > canvas.height-radius || centerY + dy < radius) dy = -dy;
    centerX += dx;
    centerY += dy;
    for(var i in particles){
      console.log(particles[i]);
      draw(particles[i]);
    }
    $window.requestAnimationFrame(drawingLoop);
  }
  drawingLoop();
}
