svgns = "http://www.w3.org/2000/svg";
viewfactor = 500;

groupThing = document.createElementNS(svgns, "g");
groupThing.setAttribute("transform", "translate(426, 240)");
document.getElementById("view").appendChild(groupThing);

points = [
    {x: -100, y: 100, z: -100},
    {x: 100, y: 100, z: -100},
    {x: -100, y: 100, z: 100},
    {x: 100, y: 100, z: 100},
    {x: 0, y: -100, z: 0}
];

function drawLine3D(point1, point2) {
    line = document.createElementNS(svgns, "line");
    shift = 500;
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

    oldpoint = JSON.parse(JSON.stringify(point));
    newpoint = JSON.parse(JSON.stringify(point));

    newpoint.y = oldpoint.y * Math.cos(xaxis) - oldpoint.z * Math.sin(xaxis);
    newpoint.z = oldpoint.y * Math.sin(xaxis) + oldpoint.z * Math.cos(xaxis);

    oldpoint = JSON.parse(JSON.stringify(newpoint));
    newpoint = JSON.parse(JSON.stringify(newpoint));

    newpoint.x = oldpoint.z * Math.sin(yaxis) + oldpoint.x * Math.cos(yaxis);
    newpoint.z = oldpoint.z * Math.cos(yaxis) - oldpoint.x * Math.sin(yaxis);

    oldpoint = JSON.parse(JSON.stringify(newpoint));
    newpoint = JSON.parse(JSON.stringify(newpoint));

    newpoint.x = oldpoint.x * Math.cos(zaxis) - oldpoint.y * Math.sin(zaxis);
    newpoint.y = oldpoint.x * Math.sin(zaxis) + oldpoint.y * Math.cos(zaxis);

    return newpoint;

}

function render(xrotate, yrotate) {
    for (i = 0; i < points.length; i++) {
        for (j = 0; j < points.length; j++) {
            if (i < j) {
                drawLine3D(PointRotation(points[i], xrotate, yrotate, 0), PointRotation(points[j], xrotate, yrotate, 0));
            }
        }
    }
}

xrotate = 0;
yrotate = 0;
map = {};

function main() {

    onkeydown = onkeyup = function(e){
        e = e || event;
        map[e.keyCode] = e.type == 'keydown';
    }

    if (map[40]) {
        xrotate += 0.1;
    }

    if (map[39]) {
        yrotate -= 0.1;
    }

    if (map[38]) {
        xrotate -= 0.1;
    }

    if (map[37]) {
        yrotate += 0.1;
    }

    groupThing.innerHTML = "";
    render(xrotate, yrotate);
    requestAnimationFrame(main);

}

main();