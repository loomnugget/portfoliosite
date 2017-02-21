'use strict';

require('./_landing.scss');

module.exports = ['$log', '$document', '$window', LandingController];

function LandingController($log, $document, $window) {
  $log.debug('init landingCtrl');

  // Set up canvas
  var canvas = $document.find('canvas')[0];
  var ctx = canvas.getContext('2d');
  canvas.width = $window.innerWidth;
  canvas.height = $window.innerHeight;
  ctx.strokeStyle = '#ffffff';
  var centerY = canvas.height/2, centerX = canvas.width/2;
  // Move origin to center of canvas
  ctx.translate(centerX, centerY);
  ctx.strokeStyle = 'rgba(255, 255, 255, .7)';
  ctx.fillStyle = 'rgba(255, 255, 255, .5)';
  // convert angle from degrees to radians
  var toRadians = Math.PI/180;
  // Field of view - how much of the scene you can see
  var fov = 400;

  // Get random range of anything
  function randomRange(min, max){
    return ((Math.random()*(max-min)) + min);
  }
  // Vector operations
  const Vector3D = function(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
  };
  Vector3D.prototype.add = function(v2) {
    this.x = this.x + v2.x;
    this.y = this.y + v2.y;
    this.z = this.z + v2.z;
  };
  Vector3D.prototype.project = function(){
    this.scale = fov/(fov + this.z);
    this.posX2d = (this.x * this.scale);
    this.posY2d = (this.y * this.scale);
  };
  Vector3D.prototype.rotateX = function(angle){
    var cosRY = Math.cos(angle * toRadians);
    var sinRY = Math.sin(angle * toRadians);
    var tempz = this.z, tempy = this.y;
    this.y= (tempy*cosRY)+(tempz*sinRY);
    this.z= (tempy*-sinRY)+(tempz*cosRY);
  };
  Vector3D.prototype.rotateY = function(angle){
    var cosRY = Math.cos(angle * toRadians);
    var sinRY = Math.sin(angle * toRadians);
    var tempz = this.z, tempx = this.x;
    this.x = (tempx*cosRY)+(tempz*sinRY);
    this.z = (tempx*-sinRY)+(tempz*cosRY);
  };

  // Star Particle!
  const Particle = function(posx, posy, posz, pSize) {
    this.cR = pSize *(Math.sqrt(2) / 2); // radius
    this.position = new Vector3D(posx, posy, posz);
    //this.velocity = new Vector3D(randomRange(-1,1), randomRange(-1,1), randomRange(-1,1));
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

  Particle.prototype.move = function(boundsX, boundsY, boundsZ) {
    // Check bounds
    if(this.position.x + this.velocity.x > boundsX - this.cR || this.position.x  + this.velocity.x < this.cR) this.velocity.x = -this.velocity.x;
    if(this.position.y + this.velocity.y > boundsY - this.cR || this.position.y + this.velocity.y < this.cR) this.velocity.y = -this.velocity.y;
    if(this.position.z + this.velocity.z > boundsZ - this.cR || this.position.z + this.velocity.z < this.cR) this.velocity.z = -this.velocity.z;
    // Otherwise increase the position of x and y
    this.position.add(this.velocity);
  };
  // Project position
  function render(particle) {
    var centerPoint = particle.position;
    centerPoint.project();
    var posX2d = centerPoint.posX2d;
    var posY2d = centerPoint.posY2d;

    for(var i = 0; i < particle.faces.length; i++) {
      var face = particle.faces[i];
      var vertexA = particle.vertices[face.A];
      var vertexB = particle.vertices[face.B];
      var vertexC = particle.vertices[face.C];
      vertexA.rotateY(.1);
      vertexB.rotateY(.1);
      vertexC.rotateY(.1);

      vertexA.project();
      vertexB.project();
      vertexC.project();
      ctx.beginPath();
      ctx.moveTo(vertexA.posX2d + posX2d, vertexA.posY2d + posY2d);
      ctx.lineTo(vertexB.posX2d + posX2d, vertexB.posY2d + posY2d);
      ctx.lineTo(vertexC.posX2d + posX2d, vertexC.posY2d + posY2d);
      ctx.closePath();
      ctx.stroke();
    }
  }

  // Star Particle System
  const starSystem = function(){
    this.particles = {};
  };
  starSystem.prototype.generate = function(numParticles){
    for(var i = 0; i < numParticles; i++){
      this.particles[i] = new Particle(
        randomRange(-100, 100), // x-position
        randomRange(-100, 100),  // y-position
        randomRange(-100, 100), // z-position
        randomRange(2, 20)); //pSize - particle Size
    }
  };

  var system = new starSystem();
  system.generate(200);

  var point1 = new Vector3D(100,-100,0);
  var point2 = new Vector3D(100,100,0);
  var point3 = new Vector3D(-100,100,0);
  var point4 = new Vector3D(-100,-100,0);
  function drawXZplane(){
    point1.project();
    point2.project();
    point3.project();
    point4.project();
    ctx.beginPath();
    ctx.moveTo(point1.posX2d, point1.posY2d);
    ctx.lineTo(point2.posX2d, point2.posY2d);
    ctx.lineTo(point3.posX2d, point3.posY2d);
    ctx.lineTo(point4.posX2d, point4.posY2d);
    ctx.closePath();
    ctx.fill();
  }



  // Rendering loop handler
  function drawingLoop() {
    ctx.clearRect(-centerX, -centerY, canvas.width, canvas.height);
    point1.rotateY(.3);
    point2.rotateY(.3);
    point3.rotateY(.3);
    point4.rotateY(.3);
    drawXZplane();
    for(var i in system.particles){
      var currentParticle = system.particles[i];
      currentParticle.position.rotateY(.3);
      render(currentParticle);
    }
    $window.requestAnimationFrame(drawingLoop);
  }
  drawingLoop();
}
