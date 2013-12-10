var paper = Raphael('graph-container', '100%', '100%');
var width = paper.canvas.offsetWidth;
var height = paper.canvas.offsetHeight;

var points = getRandomPoints(3, width, height);
drawPoints(points, paper);

document.querySelector('button').addEventListener('click', function(e) {
  var learningRate = Number(document.getElementById('learning-rate').value);

  // Initialize the starting hypothesis.
  var thetas = [20, 0];

  paper.clear();
  drawPoints(points, paper);

  for (var i = 0; i < 1000; ++i) {
    thetas = regressionStep(points, learningRate, thetas);
    drawLine(paper, thetas, '#ccc');
  }
  drawLine(paper, thetas, 'teal');
});

function drawLine(paper, params, color) {
  var start = '0,' + h(params, 0)
  var end = width + ',' + h(params, width);
  return paper.path('M' + start + 'L' + end).attr({ stroke: color,  })
}

function getRandomPoints(count, maxX, maxY) {
  return _.times(count, function(i) {
    var x = i * (maxX / count);
    return { x: x, y: x + 2 }
//    return { x: _.random(maxX), y: _.random(maxY) };
  });
}

function drawPoints(points, paper) {
  _.each(points, function(p) {
    var circle = paper.circle(p.x, p.y, 2);
    circle.attr("fill", "#333");
  });
}

function h(thetas, x) {
  return thetas[0] + thetas[1] * x;
}

function squaredError(thetas, points) {
  return (1 / (2 * points.length)) * sum(_.map(points, function(p) {
    return Math.pow(h(thetas, p.x) - p.y, 2);
  }));
}

function regressionStep(points, alpha, t) {
  var m = points.length;

  var theta0 = t[0] - alpha * (1 / m) * sum(_.map(points, function(p) {
    return (h(t, p.x) - p.y);
  }));
  var theta1 = t[1] - alpha * (1 / m) * sum(_.map(points, function(p) {
    return (h(t, p.x) - p.y) * p.x;
  }));

  return [theta0, theta1];
}

function sum(arr) {
  return _.reduce(arr, function(a, b) { return a + b; }, 0);
}
