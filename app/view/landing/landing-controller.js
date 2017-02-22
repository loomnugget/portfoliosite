'use strict';

require('./_landing.scss');

module.exports = ['$log', '$document', '$window', LandingController];

function LandingController($log, $document, $window) {
  $log.debug('init landingCtrl');

  var appWindow = angular.element($window);

  // Detect resize and adjust canvas properties
  appWindow.bind('resize', function () {
    canvas.width = $window.innerWidth;
    canvas.height = $window.innerHeight;
    centerY = canvas.height/2, centerX = canvas.width/2;
    ctx.translate(centerX, centerY);
    ctx.strokeStyle = 'rgba(255, 255, 255, .3)';
  });

  // Set up canvas
  var canvas = $document.find('canvas')[0];
  var ctx = canvas.getContext('2d');
  canvas.width = $window.innerWidth;
  canvas.height = $window.innerHeight;
  var centerY = canvas.height/2, centerX = canvas.width/2;
  ctx.translate(centerX, centerY); // Move origin to center of canvas
  ctx.strokeStyle = 'rgba(255, 255, 255, .3)';

  // convert angle from degrees to radians, Field of view
  var toRadians = Math.PI/180, fov = 800;
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
    this.velocity = new Vector3D(0,randomRange(.5, 2),0); // fall down!
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
  const starSystem = function(size){
    this.particles = {};
    this.size = size;
  };
  starSystem.prototype.generate = function(numParticles){
    for(var i = 0; i < numParticles; i++){
      this.particles[i] = new Particle(
        randomRange(-this.size, this.size), // x-position
        randomRange(-this.size, this.size),  // y-position
        randomRange(-this.size, this.size), // z-position
        randomRange(2, 10)); //pSize - particle Size
    }
  };

  var system = new starSystem(400);
  system.generate(160);

  function drawingLoop() {
    ctx.clearRect(-centerX, -centerY, canvas.width, canvas.height);
    for(var i in system.particles){
      var currentParticle = system.particles[i];
      currentParticle.position.rotateY(.3);
      render(currentParticle);
    }
    $window.requestAnimationFrame(drawingLoop);
  }
  drawingLoop();
}
