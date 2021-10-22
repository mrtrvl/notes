// Function for drawing lines
const drawLine = (line) => {
  const { ctx, start, end } = line;
  let { color, lineWidth } = line;
  ctx.strokeStyle = color = 'black';
  ctx.lineWidth = lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

// Function for drawing circle
const drawCircle = (circle) => {
  const { ctx, center, radius } = circle;
  let { color, lineWidth } = circle;
  ctx.strokeStyle = color = 'black';
  ctx.fillStyle = color = 'black';
  ctx.lineWidth = lineWidth = 2;
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  ctx.fill();
}