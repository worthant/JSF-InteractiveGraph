// import inputValidator from "./inputValidator.js";

"use strict";

let message = "";
let clickedPoints = [];

function isPointInsideArea(x, y, R) {
    let validator = new inputValidator();
    validator.validate(x, y, R);
    message = validator.getMessage();
    return validator.getResponseCode() === 1;
}

function isRadiusAcceptable(R) {
    let validator = new inputValidator();
    validator.validateR(R);
    message = validator.getMessage();
    return validator.getResponseCode() === 1;
}

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
    setCanvasDPI();
}

const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

let dynamicScalingFactor;

function setCanvasDPI() {
    let dpi = window.devicePixelRatio;
    let canvasElement = document.getElementById('graphCanvas');
    let style = {
        height() {
            return +getComputedStyle(canvasElement).getPropertyValue('height').slice(0, -2);
        },
        width() {
            return +getComputedStyle(canvasElement).getPropertyValue('width').slice(0, -2);
        }
    };

    canvasElement.setAttribute('width', style.width() * dpi);
    canvasElement.setAttribute('height', style.height() * dpi);
}

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

    drawAllPoints();
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

function drawPoint(x, y, hit) {
    let canvasX = canvas.width / 2 + x * dynamicScalingFactor;
    let canvasY = canvas.height / 2 - y * dynamicScalingFactor;
    ctx.fillStyle = hit ? "green" : "red";
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 5, 0, Math.PI * 2);
    ctx.fill();
}

function drawAllPoints() {
    clickedPoints.forEach(point => {
        drawPoint(point.x, point.y, point.hit);
    });
}

function updateTableAndGraph(data) {
    // Draw the new point directly
    drawPoint(data.x, data.y, data.hit);

    // Push it to clickedPoints
    clickedPoints.push(data);

    // Update Table
    const table = document.getElementById('yourTableId');
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);

    cell1.innerHTML = data.x;
    cell2.innerHTML = data.y;
    cell3.innerHTML = data.r;
    cell4.innerHTML = data.hit ? 'Hit' : 'Didn\'t hit';
}

const mainForm = document.querySelector('input[value="Check"]');
mainForm.addEventListener('click', function (e) {
    // default action is to send the form data to the server and reload the page
    // by calling .preventDefault() I am stopping the browser from doing this,
    // which allows me to handle the form submission programmatically in your JavaScript code instead.
    e.preventDefault();

    const xElement = document.querySelector('input[name="x"]:checked');
    const yElement = document.querySelector('#y');
    const rElement = document.querySelector('#r');

    if (xElement && yElement && rElement) {
        const xVal = parseFloat(xElement.value);
        const yVal = parseFloat(yElement.value.substring(0, 8));
        const rVal = parseFloat(rElement.value.substring(0, 8));
        console.log(`X: ${xVal}, Y: ${yVal}, R: ${rVal}`);

        if (isPointInsideArea(xVal, yVal, rVal)) {
            console.log(`client validation: passed`);

            fetch("controller", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    "x": xVal,
                    "y": yVal,
                    "r": rVal
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Server responded with bad getaway status: ${response.status} ${response.text()}`);
                    }
                    return response.text();
                })
                .then(function () {
                    drawAllPoints();
                })
                .catch(error => {
                    alert(`There was an error processing your request: ${error.message}`);
                });
        } else {
            console.log(`client validation: failed`);
            Toastify({
                text: message,
                className: "info",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                    border: "1px solid white"
                },
                offset: {
                    x: 240,
                    y: 60
                },
                position: "right",
            }).showToast();
        }
    } else {
        Toastify({
            text: "You should fill the form before submitting it :)",
            className: "info",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                border: "1px solid white"
            },
            offset: {
                x: 240,
                y: 60
            },
            position: "right",
        }).showToast();
    }
});

canvas.addEventListener("click", function (event) {
    const rElement = document.querySelector('#r');
    if (!rElement || !rElement.value || isNaN(parseFloat(rElement.value))) {
        alert("Не возможно определить координаты точки без радиуса");
        return;
    }

    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;
    let R = parseFloat(rElement.value);

    let graphX = (x - canvas.width / 2) / dynamicScalingFactor;
    let graphY = (canvas.height / 2 - y) / dynamicScalingFactor;

    // Round and constrain graphX to the set [-4, -3, -2, -1, 0, 1, 2, 3, 4]
    graphX = Math.round(graphX);

    console.log(`Raw values: X: ${x}, Y: ${y}, R: ${R}`);
    console.log(`Graph values: ${graphX}, ${graphY}`);

    if (isPointInsideArea(graphX, graphY, R)) {
        console.log(`client validation: passed`);

        fetch("controller", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                "x": graphX,
                "y": graphY,
                "r": R
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server responded with bad getaway status: ${response.status} ${response.text()}`);
                }
                return response.text();
            })
            .then(function (serverAnswer) {
                updateTableAndGraph(serverAnswer);
            })
            .catch(error => {
                alert(`There was an error processing your request: ${error.message}`);
            });
    } else {
        console.log(`client validation: failed`);
        Toastify({
            text: message,
            className: "info",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                border: "1px solid white"
            },
            offset: {
                x: 240,
                y: 60
            },
            position: "right",
        }).showToast();
    }
});

const rElement = document.querySelector('#r');
rElement.addEventListener('input', function () {
    let r = parseFloat(rElement.value);
    if (isNaN(r)) {
        r = 3; // Default R value
    }
    if (isRadiusAcceptable(r)) {
        console.log(`Drawing graph with r: ${r}`);
        drawGraph(r);  // Drawing the graph based on new R value
    } else {
        Toastify({
            text: message,
            className: "info",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                border: "1px solid white"
            },
            offset: {
                x: 240,
                y: 60
            },
            position: "right",
        }).showToast();
    }
});