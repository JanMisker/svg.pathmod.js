import { Path, extend } from '@svgdotjs/svg.js'

/*
 Modified from https://github.com/mourner/simplify-js
 (c) 2017, Vladimir Agafonkin
 Simplify.js, a high-performance JS polyline simplification library
 mourner.github.io/simplify-js
*/

// to suit your point format, run search/replace for '[1]' and '[2]';
// for 3D version, see 3d branch (configurability would draw significant performance overhead)

// square distance between 2 points
function getSqDist (p1, p2) {

  var dx = p2[1] - p1[1]
  var dy = p2[2] - p1[2]

  return dx * dx + dy * dy
}

// square distance from a point to a segment
function getSqSegDist (p, p1, p2) {

  var x = p1[1]
  var y = p1[2]
  var dx = p2[1] - x
  var dy = p2[2] - y

  if (dx !== 0 || dy !== 0) {

    var t = ((p[1] - x) * dx + (p[2] - y) * dy) / (dx * dx + dy * dy)

    if (t > 1) {
      x = p2[1]
      y = p2[2]

    } else if (t > 0) {
      x += dx * t
      y += dy * t
    }
  }

  dx = p[1] - x
  dy = p[2] - y

  return dx * dx + dy * dy
}
// rest of the code doesn't care about point format

// basic distance-based simplification
function simplifyRadialDist (points, sqTolerance) {

  var prevPoint = points[0]
  var newPoints = [prevPoint]
  var point

  for (var i = 1, len = points.length; i < len; i++) {
    point = points[i]

    if (getSqDist(point, prevPoint) > sqTolerance) {
      newPoints.push(point)
      prevPoint = point
    }
  }

  if (prevPoint !== point) newPoints.push(point)

  return newPoints
}

function simplifyDPStep (points, first, last, sqTolerance, simplified) {
  var maxSqDist = sqTolerance
  var index

  for (var i = first + 1; i < last; i++) {
    var sqDist = getSqSegDist(points[i], points[first], points[last])

    if (sqDist > maxSqDist) {
      index = i
      maxSqDist = sqDist
    }
  }

  if (maxSqDist > sqTolerance) {
    if (index - first > 1) simplifyDPStep(points, first, index, sqTolerance, simplified)
    simplified.push(points[index])
    if (last - index > 1) simplifyDPStep(points, index, last, sqTolerance, simplified)
  }
}

// simplification using Ramer-Douglas-Peucker algorithm
function simplifyDouglasPeucker (points, sqTolerance) {
  var last = points.length - 1

  var simplified = [points[0]]
  simplifyDPStep(points, 0, last, sqTolerance, simplified)
  simplified.push(points[last])

  return simplified
}

function makeAbsolute (points) {
  for (var i = 1; i < points.length; ++i) {
    if (points[i][0] === 'l') {
      points[i][1] = points[i - 1][1] + points[i][1]
      points[i][2] = points[i - 1][2] + points[i][2]
    } else if (points[i][0] !== 'L') {
      // throw 'Only line paths supported'
      return false
    }
  }
  return points
}

// both algorithms combined for awesome performance
function simplify (points, tolerance, highestQuality) {

  if (points.length <= 2) return points

  let absPoints = makeAbsolute(points)
  if (!absPoints) {
    return points
  }
  var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1

  points = highestQuality ? points : simplifyRadialDist(points, sqTolerance)
  points = simplifyDouglasPeucker(points, sqTolerance)

  return points
}

extend(Path, {
  simplify (tolerance = 1, highestQuality = false) {
    let points = this.array().clone()
    points = simplify(points, tolerance, highestQuality)
    return this.plot(points)
  }
})
