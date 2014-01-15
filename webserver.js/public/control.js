	// setup socket.io connection
	var socket = io.connect('http://epsilon:9090');
	socket.on('server_status', function (server_status) {
	  writeMessage(messageLayer, server_status.message);
	  console.log(server_status);
	  socket.emit('client_status', { message: 'connected' });
	});
	
	function writeMessage(messageLayer, message) {
		var context = messageLayer.getContext();
		messageLayer.clear();
		context.font = '18pt Calibri';
		context.fillStyle = 'black';
		context.fillText(message, 10, 25);
	  }
	  var mouseIsdown = false ;

 	 
	  var stage = new Kinetic.Stage({
		  container: 'control',
		  width: 220,
		  height:220
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
		radius: 103 ,
		stroke: 'black',
		fillEnabled: false ,
		strokeWidth: 5 ,
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
	  
	  
	  var messageLayer = new Kinetic.Layer();
	  var messageStage = new Kinetic.Stage({
		  container: 'messageStage',
		  width: 350,
		  height:250
	  });	  
	  messageStage.add(messageLayer);
	  
	  
	  
	  edgecircle.on('mouseout' ,function() {
		  socket.emit('client_cmd', { MOVE: 'STOP' });
	  });
	  circle.on('mouseover',function() {
		  circle.setAttr('fill', 'red');
		  circle.draw();
	  });
	  circle.on('mousedown',function() {
		  socket.emit('client_cmd', { MOVE: 'STOP', SPEED: $("[name=speed]").val() });
	  });
	  circle.on('mouseout',function() {
		  circle.setAttr('fill', 'black');
		  circle.draw();
	  });
	  wedge_N.on('mouseover', function () {
		  wedge_N.setAttr('fill', 'black');
		  wedge_N.draw();
		  circle.draw();
	  });
	  wedge_NE.on('mouseover', function () {
		  wedge_NE.setAttr('fill', 'black');
		  wedge_NE.draw();
		  circle.draw();
	  });
	  wedge_NW.on('mouseover', function () {
		  wedge_NW.setAttr('fill', 'black');
		  wedge_NW.draw();
		  circle.draw();
	  });
	  wedge_SW.on('mouseover', function () {
		  wedge_SW.setAttr('fill', 'black');
		  wedge_SW.draw();
		  circle.draw();
	  });
	  wedge_SE.on('mouseover', function () {
		  wedge_SE.setAttr('fill', 'black');
		  wedge_SE.draw();
		  circle.draw();
	  });
	  wedge_S.on('mouseover', function () {
		  wedge_S.setAttr('fill', 'black');
		  wedge_S.draw();
		  circle.draw();
	  });
	  wedge_S.on('mouseout', function () {
		  wedge_S.setAttr('fill', 'gray');
		  wedge_S.draw();
		  circle.draw();
	  });
	  wedge_N.on('mouseout', function () {
		  wedge_N.setAttr('fill', 'gray');
		  wedge_N.draw();
		  circle.draw();
	  });
	  wedge_NE.on('mouseout', function () {
		  wedge_NE.setAttr('fill', 'gray');
		  wedge_NE.draw();
		  circle.draw();
	  });
	  wedge_NW.on('mouseout', function () {
		  wedge_NW.setAttr('fill', 'gray');
		  wedge_NW.draw();
		  circle.draw();
	  });
	  wedge_SE.on('mouseout', function () {
		  wedge_SE.setAttr('fill', 'gray');
		  wedge_SE.draw();
		  circle.draw();
	  });
	  wedge_SW.on('mouseout', function () {
		  wedge_SW.setAttr('fill', 'gray');
		  wedge_SW.draw();
		  circle.draw();
	  });

	  wedge_NW.on('mousedown', function () {
		  socket.emit('client_cmd', { MOVE: 'FWLE' , SPEED: $("[name=speed]").val() });
	  });
	  wedge_NE.on('mousedown', function () {
		  socket.emit('client_cmd', { MOVE: 'FWRI' , SPEED: $("[name=speed]").val() });
	  });
	  wedge_SW.on('mousedown', function () {
		  socket.emit('client_cmd', { MOVE: 'BWLE' , SPEED: $("[name=speed]").val() });
	  });
	  wedge_SE.on('mousedown', function () {
		  socket.emit('client_cmd', { MOVE: 'BWRI' , SPEED: $("[name=speed]").val() });
	  });
	  wedge_N.on('mousedown', function () {
		  socket.emit('client_cmd', { MOVE: 'FORW' , SPEED: $("[name=speed]").val() });
	  });
	  wedge_S.on('mousedown', function () {
		  socket.emit('client_cmd', { MOVE: 'BACK' , SPEED: $("[name=speed]").val() });
	  });
	  wedge_NW.on('mouseup', function () {
		  socket.emit('client_cmd', { MOVE: 'STOP' });
	  });
	  wedge_NE.on('mouseup', function () {
		  socket.emit('client_cmd', { MOVE: 'STOP' });
	  });
	  wedge_SW.on('mouseup', function () {
		  socket.emit('client_cmd', { MOVE: 'STOP' });
	  });
	  wedge_SE.on('mouseup', function () {
		  socket.emit('client_cmd', { MOVE: 'STOP' });
	  });
	  wedge_N.on('mouseup', function () {
		  socket.emit('client_cmd', { MOVE: 'STOP' });
	  });
	  wedge_S.on('mouseup', function () {
		  socket.emit('client_cmd', { MOVE: 'STOP' });
	  });