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

  // convert angle from degrees to radians
  let toRadians = Math.PI/180,
    boundsXmin = 10,
    boundsXmax = canvas.width,
    boundsYmin = 10,
    boundsYmax = canvas.height;
  // Get random range of anything
  function randomRange(min, max){
    return ((Math.random()*(max-min)) + min);
  }
  let rotAmt = randomRange(.01, .1);

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

  // Star Particle!
  const Particle = function(posx, posy, posz, pSize) {
    // Circumscribed radius
    this.cR = pSize *(Math.sqrt(2) / 2);
    // position refers to placement of shape on canvas
    this.position = new Vector3D(posx, posy, posz) || new Vector3D(0,0,0);
    // Random velocity in X and Y direction between -2 and 2
    this.velocity = new Vector3D(Math.random() * 4 -2, Math.random() *4-2, 0);
    // origin is in reference to center of shape
    this.vertices = [
      new Vector3D(0, 0, this.cR),
      new Vector3D(0, 0, -this.cR),
      new Vector3D(this.cR, 0, 0),
      new Vector3D(-this.cR, 0, 0),
      new Vector3D(0, this.cR, 0),
      new Vector3D(0, -this.cR, 0),
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
  Particle.prototype.move = function() {
    // Check bounds
    if(this.position.x + this.velocity.x > boundsXmax - this.cR || this.position.x  + this.velocity.x < this.cR) this.velocity.x = -this.velocity.x;
    if(this.position.y + this.velocity.y > boundsYmax - this.cR || this.position.y + this.velocity.y < this.cR) this.velocity.y = -this.velocity.y;
    // Otherwise increase the position of x and y
    this.position.add(this.velocity);
  };
  Particle.prototype.draw = function(){
    for(let i = 0; i < this.faces.length; i++) {
      let face = this.faces[i], X = this.position.x, Y = this.position.y;
      // Create each triangular face using indexes from faces array
      let vertexA = this.vertices[face.A];
      let vertexB = this.vertices[face.B];
      let vertexC = this.vertices[face.C];
      // Rotate each point
      vertexA.rotateX(rotAmt);
      vertexB.rotateX(rotAmt);
      vertexC.rotateX(rotAmt);
      vertexA.rotateY(rotAmt);
      vertexB.rotateY(rotAmt);
      vertexC.rotateY(rotAmt);
      // Draw Triangles
      ctx.beginPath();
      ctx.moveTo(vertexA.x + X, vertexA.y + Y);
      ctx.lineTo(vertexB.x + X, vertexB.y + Y);
      ctx.lineTo(vertexC.x + X, vertexC.y + Y);
      ctx.closePath();
      ctx.stroke();
    }
  };

  const starSystem = function(numParticles, fov){
    this.particles = {};
    this.fov = fov;
    this.center = new Vector3D(0,0,0);
    this.numParticles = numParticles;
  };

  starSystem.prototype.project = function(point){
    let scale = this.fov * (this.fov + point.z);
    let x2D = point.x * scale;
    let y2D = point.y * scale;
    return new Vector3D(x2D, y2D, point.z);
  };

  starSystem.prototype.generate = function(){
    for(var i = 0; i < this.numParticles; i++){
      this.particles[i] = new Particle(randomRange(boundsXmin, boundsXmax), randomRange(boundsYmin, boundsYmax), 0, randomRange(10,70));
    }
    return this.particles;
  };

  // Create a new particle system with 5 stars and fov of .78
  let system = new starSystem(100, .78);
  system.generate();

  // Renders particle system
  function render() {
    for(var i in system.particles){
      let currentParticle = system.particles[i];
      // Rotate and draw
      currentParticle.draw();
      // Moves particles every frame based on their random velocity and initial position
      currentParticle.move();
    }
  }

  // Rendering loop handler
  function drawingLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Every frame, particle bucket is looped through, rotated, drawn, and moved
    render();
    $window.requestAnimationFrame(drawingLoop);
  }
  drawingLoop();
}
