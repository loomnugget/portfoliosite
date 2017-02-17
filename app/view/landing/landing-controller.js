'use strict';

require('./_landing.scss');

module.exports = ['$log', '$document', '$window', LandingController];

function LandingController($log, $document, $window) {
  $log.debug('init landingCtrl');
  var canvas = $document.find('canvas')[0];
  var ctx = canvas.getContext('2d');
  canvas.width = $window.innerWidth;
  canvas.height = $window.innerHeight;

  // const particle = function() {
  //   this.posx = canvas.width/2;
  //   this.posy = canvas.height/2;
  // }
  let dx = canvas.width/2;
  let dy = canvas.height/2;
  function draw() {
    ctx.beginPath();
    ctx.fillstyle = '#fff';
    ctx.arc(dx,dy,4,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
  }

  // Rendering loop handler
  function drawingLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    dy+=1;
    dx+=1;
    $window.requestAnimationFrame(drawingLoop);
  }
  drawingLoop();
}
