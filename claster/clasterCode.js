const field = document.getElementById('field');
const pnt = field.getContext('2d');

let points = [];
let i =0;
function drawPoints() {
    pnt.clearRect(0, 0, field.width, field.height); 
    pnt.fillStyle = 'rgb(0, 119, 255)'; 
    points.forEach(point => {
        pnt.beginPath();
        pnt.arc(point.x, point.y, 4, 0, Math.PI * 2); 
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
drawPoints();