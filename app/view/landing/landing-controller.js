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
  ctx.strokeStyle = '#ffffff';

  // Variables
  let centerY = canvas.height/2,
    toRadians = Math.PI/180, // convert angle from degrees to radians
    particles = {}, // star bucket object
    pSize = 50, // particle size
    fov = .7, // field of view for projecting
    radius = pSize * (Math.sqrt(2)/2), // octahedron radius for bouncing
    cR = pSize *(Math.sqrt(2) / 2); // circumscribed radius

  // Vector operations
  const Vector3D = function(x,y,z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  };
  Vector3D.prototype.add = function(v2) {
    this.x = this.x + v2.x;
    this.y = this.y + v2.y;
    this.z = this.z + v2.z;
  };
  Vector3D.prototype.rotateY = function(angle){
    let cosRY = Math.cos(angle * toRadians);
    let sinRY = Math.sin(angle * toRadians);
    let tempz = this.z, tempx = this.x;
    this.x= (tempx*cosRY)+(tempz*sinRY);
    this.z= (tempx*-sinRY)+(tempz*cosRY);
  };
  Vector3D.prototype.rotateX = function(angle){
    let cosRY = Math.cos(angle * toRadians);
    let sinRY = Math.sin(angle * toRadians);
    var tempz = this.z, tempy = this.y;
    this.y= (tempy*cosRY)+(tempz*sinRY);
    this.z= (tempy*-sinRY)+(tempz*cosRY);
  };

  // Star Particle Constructor
  const Particle = function(posx, posy, posz) {
    // rotation refers to axis of rotation of individual shape
    this.rotation = new Vector3D(0,0,0);
    // position refers to placement of shape on canvas
    this.position = new Vector3D(posx, posy, posz) || new Vector3D(0,0,0);
    // Random velocity in X and Y direction between -2 and 2
    this.velocity = new Vector3D(Math.random() * 4 -2, Math.random() *4-2, 0);
    // origin is in reference to center of shape
    this.vertices = [
      new Vector3D(0, 0, cR),
      new Vector3D(0, 0, -cR),
      new Vector3D(cR, 0, 0),
      new Vector3D(-cR, 0, 0),
      new Vector3D(0, cR, 0),
      new Vector3D(0, -cR, 0),
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
  function move(star) {
    // Check bounds
    if(star.position.x + star.velocity.x > canvas.width - radius || star.position.x  + star.velocity.x < radius) star.velocity.x = -star.velocity.x;
    if(star.position.y + star.velocity.y > canvas.height - radius || star.position.y + star.velocity.y < radius) star.velocity.y = -star.velocity.y;
    // Otherwise increase the position of x and y
    star.position.add(star.velocity);
  }

  function project(point){
    let scale = fov * (fov + point.z);
    let x2D = point.x * scale;
    let y2D = point.y * scale;
    return new Vector3D(x2D, y2D, point.z);
  }

  function draw(star){
    for(let i = 0; i < star.faces.length; i++) {
      let face = star.faces[i], X = star.position.x, Y = star.position.y;
      // Create each triangular face using indexes from faces array
      let vertexA = star.vertices[face.A];
      let vertexB = star.vertices[face.B];
      let vertexC = star.vertices[face.C];
      // Rotate each point
      vertexA.rotateX(.1);
      vertexB.rotateX(.1);
      vertexC.rotateX(.1);
      vertexA.rotateY(.1);
      vertexB.rotateY(.1);
      vertexC.rotateY(.1);
      // Draw Triangles
      ctx.beginPath();
      ctx.moveTo(vertexA.x + X, vertexA.y + Y);
      ctx.lineTo(vertexB.x + X, vertexB.y + Y);
      ctx.lineTo(vertexC.x + X, vertexC.y + Y);
      ctx.closePath();
      ctx.stroke();
    }
  }

  // Generate desired number of particles
  function generate(numParticles){
    let startX = 0;
    for(var i = 0; i < numParticles; i++){
      startX += canvas.width/10;
      particles[i] = new Particle(startX, centerY, 0);
    }
    return particles;
  }
  generate(9);

  // Renders particle system
  function render() {
    for(var i in particles){
      let currentParticle = particles[i];
      draw(currentParticle);
      // Moves particles every frame based on their random velocity and initial position
      move(currentParticle);
    }
  }

  // Rendering loop handler
  function drawingLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    render();
    $window.requestAnimationFrame(drawingLoop);
  }
  drawingLoop();
}
