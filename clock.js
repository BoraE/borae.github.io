function pendulum() {
    "use strict";
    var sin = Math.sin;
    var cos = Math.cos;

    var T = 2; // Period of oscillation
    var thMax = Math.PI / 4; // 45 deg
    var x0 = 210, y0 = 210, R = 150;

    function change() {
        var t = new Date().getTime() % (T * 1000) / 1000;
        var th = (thMax * sin(2 * Math.PI / T * t));

        var canvas = document.getElementById('pendulum');
        var context = canvas.getContext('2d');

        var gw = canvas.width;
        canvas.width = gw; // Clear and reset the graph element.

        context.translate(x0 + R * sin(th), y0 + R * cos(th));
        context.beginPath();
        context.arc(0, 0, 10, 0, 2 * Math.PI, false);
        context.closePath();
        context.stroke();
        context.fillStyle = 'rgb(255,215,0)';
        context.fill();

        setTimeout(change, 25);
    }

    setTimeout(change, 25);
}

function paintClockHands() {
    "use strict";
    // Draw hour, minute, and second hands
    var R = 200;

    var now = new Date();
    var day = now.getDate();
    var hrs = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();

    var graph = document.getElementById('hands');
    var g = graph.getContext('2d');
    var gw = graph.width;
    graph.width = gw; // Clear and reset the graph element.

    if (!graph.getContext) {
        return;
    }

    g.beginPath();
    g.translate(R + 10, R + 10);

    g.beginPath();
    g.save();
    g.rotate(Math.PI / 6.0);
    g.moveTo(R - 50, -12);
    g.lineTo(R - 20, -12);
    g.lineTo(R - 20, 12);
    g.lineTo(R - 50, 12);
    g.closePath();
    g.restore();
    g.rotate(Math.PI / 6.0);
    g.lineWidth = 2;
    g.strokeStyle = 'black';
    g.stroke();
    g.fillStyle = 'white';
    g.fill();
    g.font = '25px arial';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillStyle = 'black';
    g.fillText(String(day), R - 35, 0);
    g.rotate(-Math.PI / 6.0);

    // Hour hand
    g.beginPath();
    g.save();
    g.rotate(Math.PI * (-0.5 + (hrs + min / 60 + sec / 3600) * 30 / 180));
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
    g.rotate(Math.PI * (-0.5 + (min + Math.floor(sec / 15) / 4) * 6 / 180));
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
    g.arc(0, 0, 8, 0, 2 * Math.PI, false);
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
    g.arc(0, 0, 4, 0, 2 * Math.PI, false);
    g.closePath();
    g.fillStyle = 'red';
    g.fill();

    g.beginPath();
    g.arc(0, 0, 1, 0, 2 * Math.PI, false);
    g.closePath();
    g.fillStyle = 'black';
    g.fill();
}

function paintClockFace() {
    "use strict";
    var x0 = 210;
    var y0 = 210;
    var R = 200;
    var k;

    var graph = document.getElementById('face');
    var g = graph.getContext('2d');

    // Paint face plate
    g.beginPath();
    g.arc(x0, y0, R, 0, 2 * Math.PI, false);
    g.closePath();
    g.stroke();
    g.fillStyle = '#555';
    g.fill();

    // Paint digits
    g.font = '25px arial';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillStyle = 'rgb(255,215,0)';
    for (k = 0; k < 12; k += 1) {
        if (k !== 3) {
            g.fillText(String(k + 1), x0 + (R - 25)
                * Math.cos(Math.PI * (-0.5 + k / 6 + 1 / 6)), x0 + (R - 25)
                * Math.sin(Math.PI * (-0.5 + k / 6 + 1 / 6)));
        }
    }

    // Paint hour ticks
    g.beginPath();
    g.translate(x0, y0);
    g.lineWidth = 5;
    g.lineCap = 'butt';
    for (k = 0; k < 12; k += 1) {
        g.save();
        g.rotate(Math.PI * k / 6);
        g.moveTo((R - 10), 0);
        g.lineTo(R, 0);
        g.restore();
    }
    g.strokeStyle = 'rgb(224,255,176)';
    g.stroke();

    // Paint minute ticks
    g.lineWidth = 1;
    g.beginPath();
    for (k = 0; k < 60; k += 1) {
        g.save();
        g.rotate(Math.PI * k / 30);
        g.moveTo((R - 6), 0);
        g.lineTo(R, 0);
        g.restore();
    }
    g.strokeStyle = 'white';
    g.stroke();
}
