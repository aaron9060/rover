// setup socket.io connection

var socket = io.connect('http://epsilon:9090');
socket.on('server_status', function(server_status) {
    $("#logText").append("[" + timeStamp() + "] " + server_status.message);
    console.log(server_status);
    socket.emit('client_status', {
        message: 'connected'
    });
});

socket.on('server_status', function(server_status) {
    $("#logText").append("[" + timeStamp() + "] " + server_status.message);
    console.log(server_status);
    socket.emit('client_status', {
        message: 'connected'
    });
});
socket.on('server_cmd', function(server_cmd) {
    $("#logText").append("[" + timeStamp() + "]- " + server_cmd.message);
    if ("ORIGINALSKETCH" in server_cmd) {
        document.getElementById('sketchInputText').value = server_cmd.ORIGINALSKETCH;
    }
})


// Provide timestamps for logging / chat

function timeStamp() {
    // Create a date object with the current time
    var now = new Date();
    // Create an array with the current month, day and time
    var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
    // Create an array with the current hour, minute and second
    var time = [now.getHours(), now.getMinutes(), now.getSeconds()];
    // Determine AM or PM suffix based on the hour
    var suffix = (time[0] < 12) ? "AM" : "PM";
    // Convert hour from military time
    time[0] = (time[0] < 12) ? time[0] : time[0] - 12;
    // If hour is 0, set it to 12
    time[0] = time[0] || 12;
    // If seconds and minutes are less than 10, add a zero
    for (var i = 1; i < 3; i++) {
        if (time[i] < 10) {
            time[i] = "0" + time[i];
        }
    }
    // Return the formatted string
    return time.join(":") + suffix;
}

// Kinetic Message Display

function writeMessage(messageLayer, message) {
    var context = messageLayer.getContext();
    messageLayer.clear();
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
}
var messageLayer = new Kinetic.Layer();
var messageStage = new Kinetic.Stage({
    container: 'messageStage',
    width: 350,
    height: 250
});
messageStage.add(messageLayer);

// Sketch Control

document.getElementById('sketchInputSubmit').addEventListener('click', function() {
    var sketchInput = document.getElementById('sketchInputText');
    console.log(sketchInputText.value);
    socket.emit('client_cmd', {
        SKETCH: sketchInputText.value
    });
}, false);

document.getElementById('sketchOriginalSubmit').addEventListener('click', function() {
    var sketchInput = document.getElementById('sketchInputText');
    console.log(sketchInputText.value);
    socket.emit('client_cmd', {
        ORIGINALSKETCH: 'original'
    });
}, false);

// Tab Control

$(function() {
    $("#tabs").tabs();
});

// Control Display

var mouseIsdown = false;
var stage = new Kinetic.Stage({
    container: 'control',
    width: 220,
    height: 220
});
var layer = new Kinetic.Layer();
var wedge_NW = new Kinetic.Wedge({
    x: stage.getWidth() / 2,
    y: stage.getHeight() / 2,
    radius: 100,
    angleDeg: 60,
    fill: 'gray',
    stroke: 'black',
    strokeWidth: 4,
    rotationDeg: 180
});
var wedge_N = new Kinetic.Wedge({
    x: stage.getWidth() / 2,
    y: stage.getHeight() / 2,
    radius: 100,
    angleDeg: 60,
    fill: 'gray',
    stroke: 'black',
    strokeWidth: 4,
    rotationDeg: 240
});
var wedge_SW = new Kinetic.Wedge({
    x: stage.getWidth() / 2,
    y: stage.getHeight() / 2,
    radius: 100,
    angleDeg: 60,
    fill: 'gray',
    stroke: 'black',
    strokeWidth: 4,
    rotationDeg: 120
});
var wedge_SE = new Kinetic.Wedge({
    x: stage.getWidth() / 2,
    y: stage.getHeight() / 2,
    radius: 100,
    angleDeg: 60,
    fill: 'gray',
    stroke: 'black',
    strokeWidth: 4,
    rotationDeg: 360
});
var wedge_NE = new Kinetic.Wedge({
    x: stage.getWidth() / 2,
    y: stage.getHeight() / 2,
    radius: 100,
    angleDeg: 60,
    fill: 'gray',
    stroke: 'black',
    strokeWidth: 4,
    rotationDeg: 300
});
var wedge_S = new Kinetic.Wedge({
    x: stage.getWidth() / 2,
    y: stage.getHeight() / 2,
    radius: 100,
    angleDeg: 60,
    fill: 'gray',
    stroke: 'black',
    strokeWidth: 4,
    rotationDeg: 60
});
var circleLayer = new Kinetic.Layer();
var circle = new Kinetic.Circle({
    x: stage.getWidth() / 2,
    y: stage.getHeight() / 2,
    radius: 30,
    fill: 'black',
    stroke: 'black',
    strokeWidth: 4
});
var edgecircle = new Kinetic.Circle({
    x: stage.getWidth() / 2,
    y: stage.getHeight() / 2,
    radius: 103,
    stroke: 'black',
    fillEnabled: false,
    strokeWidth: 5,
    visible: true
});

// add the shape to the layer
layer.add(wedge_NW);
layer.add(wedge_SW);
layer.add(wedge_SE);
layer.add(wedge_N);
layer.add(wedge_NE);
layer.add(wedge_S);
layer.add(circle);
layer.add(edgecircle);

// add the layer to the stage
stage.add(layer);
stage.add(circleLayer);

edgecircle.on('mouseout', function() {
    socket.emit('client_cmd', {
        MOVE: 'STOP'
    });
});
circle.on('mouseover', function() {
    circle.setAttr('fill', 'red');
    circle.draw();
});
circle.on('mousedown', function() {
    socket.emit('client_cmd', {
        MOVE: 'STOP',
        SPEED: $("[name=speed]").val()
    });
});
circle.on('mouseout', function() {
    circle.setAttr('fill', 'black');
    circle.draw();
});
wedge_N.on('mouseover', function() {
    wedge_N.setAttr('fill', 'black');
    wedge_N.draw();
    circle.draw();
});
wedge_NE.on('mouseover', function() {
    wedge_NE.setAttr('fill', 'black');
    wedge_NE.draw();
    circle.draw();
});
wedge_NW.on('mouseover', function() {
    wedge_NW.setAttr('fill', 'black');
    wedge_NW.draw();
    circle.draw();
});
wedge_SW.on('mouseover', function() {
    wedge_SW.setAttr('fill', 'black');
    wedge_SW.draw();
    circle.draw();
});
wedge_SE.on('mouseover', function() {
    wedge_SE.setAttr('fill', 'black');
    wedge_SE.draw();
    circle.draw();
});
wedge_S.on('mouseover', function() {
    wedge_S.setAttr('fill', 'black');
    wedge_S.draw();
    circle.draw();
});
wedge_S.on('mouseout', function() {
    wedge_S.setAttr('fill', 'gray');
    wedge_S.draw();
    circle.draw();
});
wedge_N.on('mouseout', function() {
    wedge_N.setAttr('fill', 'gray');
    wedge_N.draw();
    circle.draw();
});
wedge_NE.on('mouseout', function() {
    wedge_NE.setAttr('fill', 'gray');
    wedge_NE.draw();
    circle.draw();
});
wedge_NW.on('mouseout', function() {
    wedge_NW.setAttr('fill', 'gray');
    wedge_NW.draw();
    circle.draw();
});
wedge_SE.on('mouseout', function() {
    wedge_SE.setAttr('fill', 'gray');
    wedge_SE.draw();
    circle.draw();
});
wedge_SW.on('mouseout', function() {
    wedge_SW.setAttr('fill', 'gray');
    wedge_SW.draw();
    circle.draw();
});
wedge_NW.on('mousedown', function() {
    socket.emit('client_cmd', {
        MOVE: 'FWLE',
        SPEED: $("[name=speed]").val()
    });
});
wedge_NE.on('mousedown', function() {
    socket.emit('client_cmd', {
        MOVE: 'FWRI',
        SPEED: $("[name=speed]").val()
    });
});
wedge_SW.on('mousedown', function() {
    socket.emit('client_cmd', {
        MOVE: 'BWLE',
        SPEED: $("[name=speed]").val()
    });
});
wedge_SE.on('mousedown', function() {
    socket.emit('client_cmd', {
        MOVE: 'BWRI',
        SPEED: $("[name=speed]").val()
    });
});
wedge_N.on('mousedown', function() {
    socket.emit('client_cmd', {
        MOVE: 'FORW',
        SPEED: $("[name=speed]").val()
    });
});
wedge_S.on('mousedown', function() {
    socket.emit('client_cmd', {
        MOVE: 'BACK',
        SPEED: $("[name=speed]").val()
    });
});
wedge_NW.on('mouseup', function() {
    socket.emit('client_cmd', {
        MOVE: 'STOP'
    });
});
wedge_NE.on('mouseup', function() {
    socket.emit('client_cmd', {
        MOVE: 'STOP'
    });
});
wedge_SW.on('mouseup', function() {
    socket.emit('client_cmd', {
        MOVE: 'STOP'
    });
});
wedge_SE.on('mouseup', function() {
    socket.emit('client_cmd', {
        MOVE: 'STOP'
    });
});
wedge_N.on('mouseup', function() {
    socket.emit('client_cmd', {
        MOVE: 'STOP'
    });
});
wedge_S.on('mouseup', function() {
    socket.emit('client_cmd', {
        MOVE: 'STOP'
    });
});


// Create StrobeMediaPlayback configuration 
var parameters = {
    src: "rtmp://" + window.location.hostname + "/flvplayback/myStream",
    autoPlay: true,
    controlBarAutoHide: false,
    playButtonOverlay: true,
    controlBarMode: "none",
    streamType: "live",
    showVideoInfoOverlayOnStartUp: false,
    optimizeBuffering: false,
    initialBufferTime: 0.1,
    expandedBufferTime: 0.1,
    minContinuousPlayback: 0.1,
    poster: "strobe/images/poster.png"
};
// Embed the player SWF:			
swfobject.embedSWF("strobe/StrobeMediaPlayback.swf",
    "strobeMediaPlayback",
    640,
    480,
    "10.1.0", {},
    parameters, {
        allowFullScreen: "false"
    }, {
        showVideoInfoOverlayOnStartUp: "false"
    }, {
        name: "strobeMediaPlayback"
    }
);