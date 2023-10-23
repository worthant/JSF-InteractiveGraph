"use strict"

document.addEventListener("DOMContentLoaded", () => {
    function updateDateTime() {
        const now = new Date();
        document.getElementById("date").innerText = now.toDateString();
        document.getElementById("time").innerText = now.toTimeString().substring(0, 8);
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
});

window.onload = function () {
    drawGraph(3);
}

const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");
let dynamicScalingFactor;

function drawGraph(R) {
    let width = canvas.width;
    let height = canvas.height;

    let baseScaling = width / 6;
    dynamicScalingFactor = baseScaling / R;
    let yAxisOffset = 15;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    ctx.font = "15px Arial";

    // Draw x and y axes
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1;
    ctx.beginPath();
    drawAxis(ctx, width / 4, height / 2, 3 * width / 4, height / 2);  // X-axis
    drawAxis(ctx, width / 2, 3 * height / 4, width / 2, height / 4); // Y-axis
    ctx.stroke();

    // Drawing the areas

    // Triangle (lower left)
    ctx.fillStyle = "#0000FF10"; // blue with 10% opacity
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo(width / 2, height / 2 + R * dynamicScalingFactor);
    ctx.lineTo(width / 2 - R * dynamicScalingFactor, height / 2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#0000FF";
    ctx.stroke();

    // Rectangle (lower right)
    ctx.fillStyle = "#FFFF0010"; // yellow with 10% opacity
    ctx.fillRect(width / 2, height / 2, R / 2 * dynamicScalingFactor, R * dynamicScalingFactor);
    ctx.strokeStyle = "#FFFF00";
    ctx.strokeRect(width / 2, height / 2, R / 2 * dynamicScalingFactor, R * dynamicScalingFactor);

    // Semi-circle (upper left)
    ctx.fillStyle = "#39FF1410"; // green with 10% opacity
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, R * dynamicScalingFactor, Math.PI, 1.5 * Math.PI);
    ctx.lineTo(width / 2, height / 2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#39FF14";
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, R * dynamicScalingFactor, Math.PI, 1.5 * Math.PI);
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = "white";
    // X-axis labels
    ctx.fillText(R.toString(), width / 2 + R * dynamicScalingFactor, height / 2 + 30);
    ctx.fillText((R / 2).toString(), width / 2 + (R / 2) * dynamicScalingFactor, height / 2 + 30);
    ctx.fillText((-R).toString(), width / 2 - R * dynamicScalingFactor, height / 2 + 30);
    ctx.fillText((-R / 2).toString(), width / 2 - (R / 2) * dynamicScalingFactor, height / 2 + 30);
    ctx.fillText("X", 3 * width / 4 + 5, height / 2 + 5);

    // Y-axis labels
    ctx.fillText(R.toString(), width / 2 + yAxisOffset, height / 2 - R * dynamicScalingFactor);
    ctx.fillText((R / 2).toString(), width / 2 + yAxisOffset, height / 2 - (R / 2) * dynamicScalingFactor);
    ctx.fillText((-R).toString(), width / 2 + yAxisOffset, height / 2 + R * dynamicScalingFactor);
    ctx.fillText((-R / 2).toString(), width / 2 + yAxisOffset, height / 2 + (R / 2) * dynamicScalingFactor);
    ctx.fillText("Y", width / 2, height / 4 - 5);

    // Draw ticks
    ctx.fillStyle = "white";
    // X-axis tics
    const tickLength = 10; // Length of the tick marks
    for (let tickValue = -R; tickValue <= R; tickValue += R / 2) {
        const xTickPosition = width / 2 + tickValue * dynamicScalingFactor;
        ctx.beginPath();
        ctx.moveTo(xTickPosition, height / 2 - tickLength / 2);
        ctx.lineTo(xTickPosition, height / 2 + tickLength / 2);
        ctx.stroke();
    }

    // Y-axis tics
    for (let tickValue = -R; tickValue <= R; tickValue += R / 2) {
        const yTickPosition = height / 2 - tickValue * dynamicScalingFactor;
        ctx.beginPath();
        ctx.moveTo(width / 2 - tickLength / 2, yTickPosition);
        ctx.lineTo(width / 2 + tickLength / 2, yTickPosition);
        ctx.stroke();
    }
}

function drawAxis(context, fromX, fromY, toX, toY) {
    const headLength = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    context.moveTo(toX, toY);
    context.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    context.stroke();
}
