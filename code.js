svgns = "http://www.w3.org/2000/svg";
viewfactor = 1;

groupThing = document.createElementNS(svgns, "g");
groupThing.setAttribute("transform", "translate(426, 240)");
document.getElementById("view").appendChild(groupThing);

function drawLine3D(point1, point2) {
    line = document.createElementNS(svgns, "line");
    shift = 1.25;
    point1_2d = {
        x: point1.x / (point1.z + shift) * viewfactor,
        y: point1.y / (point1.z + shift) * viewfactor
    };
    point2_2d = {
        x: point2.x / (point2.z + shift) * viewfactor,
        y: point2.y / (point2.z + shift) * viewfactor
    };
    line.setAttribute("x1", point1_2d.x);
    line.setAttribute("y1", point1_2d.y);
    line.setAttribute("x2", point2_2d.x);
    line.setAttribute("y2", point2_2d.y);
    line.setAttribute("stroke", "black");
    groupThing.appendChild(line);
}

// not working yet
function PointRotation(point, xaxis, yaxis, zaxis) {
    point.y = point.y * Math.cos(xaxis) - point.z * Math.sin(xaxis);
    point.z = point.y * Math.sin(xaxis) + point.z * Math.cos(xaxis);

    point.x = point.z * Math.sin(yaxis) + point.x * Math.cos(yaxis);
    point.z = point.z * Math.cos(yaxis) - point.x * Math.sin(yaxis);

    point.x = point.x * Math.cos(zaxis) - point.y * Math.sin(zaxis);
    point.y = point.x * Math.sin(zaxis) + point.y * Math.cos(zaxis);
    return point;
}

points = [
    {x: -100, y: 100, z: -0.25},
    {x: 100, y: 100, z: -0.25},
    {x: -100, y: 100, z: 0.25},
    {x: 100, y: 100, z: 0.25},
    {x: 0, y: -50, z: 0}
];

for (i = 0; i < points.length; i++) {
    for (j = 0; j < points.length; j++) {
        drawLine3D(PointRotation(points[i], 0, 0, 1), PointRotation(points[j], 0, 0, 1));
    }
}