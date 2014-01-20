
// Serve Static Web Content (node-static)
 
var http = require("http"),
		url = require("url"),
		path = require("path"),
		fs = require("fs"),
		port = process.argv[2] || 9090;
 
var server = http.createServer(function(request, response) {
 
var uri = url.parse(request.url).pathname, filename = path.join("/home/pi/dev/webserver.js/public", uri);
 
	path.exists(filename, function(exists) {
		if(!exists) {
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.write("404 Not Found\n");
			response.end();
			return;
		}
 
		if (fs.statSync(filename).isDirectory()) filename += '/index.html';
 
		fs.readFile(filename, "binary", function(err, file) {
			if(err) {        
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.write(err + "\n");
				response.end();
				return;
			}
 
			response.writeHead(200);
			response.write(file, "binary");
			response.end();
		});
	});
}).listen(parseInt(port, 10));
 
console.log("Webserver online");
 
//real-time communication (socket.io)

var io = require('socket.io').listen(server);
 
io.sockets.on('connection', function (socket) {
	socket.emit('server_status', { message: 'Connected\n' });
	socket.on('client_status', function (client_status) {
		console.log(client_status);
	});
	socket.on('client_cmd',function(client_cmd) {
		// for (var key in client_cmd)  
				if("MOVE" in client_cmd ){
				socket.emit('server_status', { message: 'Sent cmd: ' + Object.keys(client_cmd).map(function(key)
								{return key + " " + client_cmd[key] + "\n";}).join(" ") });
				console.log("Writing to Serial Port: " + Object.keys(client_cmd).map(function(key)
					{return key + " " + client_cmd[key];}).join(" "));
				serialPort.write(Object.keys(client_cmd).map(function(key)
					{return key + " " + client_cmd[key];}).join(" "));
				}
				else if("SKETCH" in client_cmd){
					var sketch = Object.keys(client_cmd).map(function(key){return client_cmd[key];});
					socket.emit('server_status', { message: 'Sketch Recieved\n' });
					console.log("Sketch Recieved:");
					console.log(sketch);
					var fs = require('fs');
					// backup current sketch to ./src.bak
					fs.createReadStream('/home/pi/dev/arduino/src/sketch.ino').pipe(fs.createWriteStream('/home/pi/dev/arduino/src.bak/sketch.ino-'));
					fs.writeFile("/home/pi/dev/arduino/src/sketch.ino", sketch , function(err) {
									if(err) {
													console.log(err);
							} else {
									console.log("The file was saved!");
							}
					});        
					serialPort.close(function(){
						socket.emit('server_status', { message: 'Console port closed for 90 seconds. Uploading Sketch.\n' });
							console.log("Console port closed for 90 seconds - Uploading Sketch\n");
							var exec = require('child_process').exec;
							exec('ino clean; ino build ino upload; ino clean;', {
								cwd: '/home/pi/src/arduino'
							}, function(error, stdout, stderr) {
							// work with result
							});
							console.log("sleep function intiated...");
							sleep(90000);
							console.log("Re-opening serial port");
							socket.emit('server_status', { message: 'Re-opening serial port\n' });
							serialInit();
					});      
				}
				});
});


// Serial Port Communications
 
var com = require("serialport");
 
function serialInit(){
		serialPort = new com.SerialPort("/dev/ttyACM0", {
		baudrate: 9600,
		parser: com.parsers.readline('\r\n')
	});
 
serialPort.on('open',function() {
	console.log('Port open');
});
 
serialPort.on('data', function(data) {
	console.log(data.toString());
});
 
console.log("CONSOLE PORT OPENED");
}
 
serialInit();
 
// Sleep function

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
		break;
		}
	}
}
 