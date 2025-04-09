import { kMeans } from './kMeans.js';
const field = document.getElementById('field');
const pnt = field.getContext('2d');
const clusterColors = [
    '#4285f4',
    '#FF4500',
    '#008000',
    '#00FFFF',
    '#FF00FF',
    '#D4A5A5',
    '#F7CAC9',
    '#92A8D1',
    '#88B04B',
    '#FFD166' 
  ];

let points = [];
let centers = [];
let clusters = [];

let i = 0;
function drawPoints() {
    pnt.clearRect(0, 0, field.width, field.height); 
    const draw = clusters.length > 0 ? clusters : points;
    draw.forEach(point => {
        pnt.fillStyle = point.color || '#4285f4';
        pnt.beginPath();
        pnt.arc(point.x, point.y, 4, 0, Math.PI * 2);
        pnt.fill();
    });

    centers.forEach((center, c) => {
        pnt.fillStyle = clusterColors[c];
        pnt.beginPath();
        pnt.arc(center.x, center.y, 7, 0, Math.PI * 2);
        pnt.fill();
    });
    
}

field.addEventListener('click', (event) => {
    const rect = field.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    points.push({ x, y });
    drawPoints();
    console.log(points[i].x + " " + points[i].y)
    i++;
});
document.getElementById('clusterButton').addEventListener('click', () => {
    const clusterCount = parseInt(document.getElementById('clusterCount').value);
    const result = kMeans(clusterCount, points);
    clusters = result.clusters;
    centers = result.centers;
    drawPoints();
});
drawPoints();
document.getElementById('clearButton').addEventListener('click', () => {
    pnt.clearRect(0, 0, field.width, field.height); 
    points = [];
    centers = [];
    clusters = [];
});