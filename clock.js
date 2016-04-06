var modules = modules || {};

modules.Clock = (function() {
  "use strict";

  var dThetaHour = Math.PI/6; // Hour markers every 30 degrees
  var dThetaMin = Math.PI/30; // Minute and second markers every 6 degrees

  var sin = Math.sin;
  var cos = Math.cos;
  var PI = Math.PI;

  function Clock() {
    var self = this;
    window.onload = function () {
      self.paintFace();
      self.paintHands();
      self.paintPendulum();
    };
  }

  Clock.prototype.paintFace = function() {
    var canvas = document.getElementById('face');
    var g = canvas.getContext('2d');

    var x0 = canvas.width / 2.0;
    var y0 = canvas.height / 2.0;
    var R = canvas.width / 2.0;

    var k;
    var dayWindowLocation = 4; // Day of month at 4 o'clock position

    // Paint face plate
    g.beginPath();
    g.translate(x0, y0); // (0,0) is now at the center of the canvas
    g.arc(0, 0, R, 0, 2*PI); // Define a circle of radius R
    g.closePath();
    g.strokeStyle = '#000';
    g.stroke(); // Draw circle
    g.fillStyle = '#557';
    g.fill(); // Fill circle

    // Paint digits
    g.font = '24px arial';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillStyle = 'rgb(255,215,0)';
    var theta;
    for (k = 1; k <= 12; k += 1) {
      theta = PI * (-0.5 + k/6) // 3 o'clock is at 0 rad.
      if (k !== dayWindowLocation) {
        g.fillText(k, (R-28)*cos(theta), (R-28)*sin(theta));
      }
    }

    // Paint hour ticks
    g.beginPath();
    g.lineWidth = 5;
    g.lineCap = 'round';
    for (k = 1; k <= 12; k += 1) {
      g.moveTo(R-10, 0);
      g.lineTo(R-3, 0);
      g.rotate(dThetaHour);
    }
    g.strokeStyle = 'rgb(224,255,176)';
    g.stroke();

    // Paint minute ticks
    g.beginPath();
    g.lineWidth = 1;
    g.lineCap = 'butt';
    for (k = 0; k < 60; k += 1) {
      if (k%5 != 0) {
        g.moveTo(R-8, 0);
        g.lineTo(R, 0);
      }
      g.rotate(dThetaMin);
    }
    g.strokeStyle = '#fff';
    g.stroke();
  };

  Clock.prototype.paintPendulum = function() {
    var canvas = document.getElementById('pendulum');
    var g = canvas.getContext('2d');

    var x0 = canvas.width / 2.0;
    var y0 = canvas.height / 2.0;
    var R = canvas.width / 2.0;

    var T = 2; // Period of oscillation in sec
    var thMax = PI/4; // Range of pendulum oscillation
    var th0 = PI/2; // Nominal pendulum angle below horizontal

    function change() {
      var t = new Date().getTime() % (T * 1000) / 1000;
      var th = th0 + (thMax * sin(2*PI/T*t));

      var gw = canvas.width;
      canvas.width = gw; // Clear and reset the graph element.

      // g.translate(x0 + (R-55) * sin(th), y0 + (R-55) * cos(th));
      g.beginPath();
      g.translate(x0, y0); // (0,0) is now at the center of the canvas
      g.rotate(th);
      g.arc(R-55, 0, 10, 0, 2 * PI);
      g.closePath();
      g.stroke();
      g.fillStyle = 'rgb(255,215,0)';
      g.fill();
    }
    setInterval(change, 25);
  };

  Clock.prototype.paintHands = function() {
    // Draw hour, minute, and second hands
    var canvas = document.getElementById('hands');
    var g = canvas.getContext('2d');

    var x0 = canvas.width / 2.0;
    var y0 = canvas.height / 2.0;
    var R = canvas.width / 2.0;

    function change() {
      var now = new Date();
      var day = now.getDate();
      var hrs = now.getHours();
      var min = now.getMinutes();
      var sec = now.getSeconds();

      var gw = canvas.width;
      canvas.width = gw; // Clear and reset the graph element.

      if (!canvas.getContext) {
        return;
      }

      g.translate(x0, y0);
      g.beginPath();
      g.save();
      g.rotate(PI/6.0);
      g.moveTo(R - 50, -12);
      g.lineTo(R - 20, -12);
      g.lineTo(R - 20, 12);
      g.lineTo(R - 50, 12);
      g.closePath();
      g.restore();
      g.rotate(PI/6.0);
      g.lineWidth = 2;
      g.strokeStyle = 'black';
      g.stroke();
      g.fillStyle = 'white';
      g.fill();
      g.font = '25px arial';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillStyle = 'black';
      g.fillText(day, R - 35, 0);
      g.rotate(-PI / 6.0);

      // Hour hand
      g.beginPath();
      g.save();
      g.rotate(PI * (-0.5 + (hrs + min / 60 + sec / 3600) * 30 / 180));
      g.moveTo(0, -3);
      g.lineTo(R - 100, -11);
      g.lineTo(R - 80, 0);
      g.lineTo(R - 100, 11);
      g.lineTo(0, 3);
      g.closePath();
      g.restore();
      g.lineWidth = 2;
      g.strokeStyle = 'black';
      g.stroke();
      g.fillStyle = 'rgb(224,255,176)';
      g.fill();

      // Minute hand
      g.beginPath();
      g.save();
      g.rotate(PI * (-0.5 + (min + Math.floor(sec / 15) / 4) * 6 / 180));
      g.moveTo(0, -2);
      g.lineTo(R - 55, -10);
      g.lineTo(R - 35, 0);
      g.lineTo(R - 55, 10);
      g.lineTo(0, 2);
      g.closePath();
      g.restore();
      g.lineWidth = 2;
      g.strokeStyle = 'black';
      g.stroke();
      g.fillStyle = 'rgb(224,255,176)';
      g.fill();

      g.beginPath();
      g.arc(0, 0, 8, 0, 2 *PI);
      g.closePath();
      g.fillStyle = 'black';
      g.fill();

      // Second hand
      g.beginPath();
      g.save();
      g.rotate(Math.PI * (-0.5 + sec * 6 / 180));
      g.moveTo(-40, 0);
      g.lineTo(R - 35, 0);
      g.restore();
      g.lineWidth = 1;
      g.strokeStyle = 'red';
      g.stroke();

      g.beginPath();
      g.arc(0, 0, 4, 0, 2 * PI, false);
      g.closePath();
      g.fillStyle = 'red';
      g.fill();

      g.beginPath();
      g.arc(0, 0, 1, 0, 2 * Math.PI, false);
      g.closePath();
      g.fillStyle = 'black';
      g.fill();
      setTimeout(change, 1000);
    }
    change();
  };

  return Clock;
}());

// Start the clock
var Clock = modules.Clock;
var clock = new Clock();
