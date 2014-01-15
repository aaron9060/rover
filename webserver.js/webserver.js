// Serial Port Communications
 
var com = require("serialport");
 
function serialInit(){
var serialPort = new com.SerialPort("/dev/ttyACM0", {
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
 
// Serve Static Web Content (node-static)
 
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 9090;
 
var server = http.createServer(function(request, response) {
 
  var uri = url.parse(request.url).pathname
    , filename = path.join("/home/pi/dev/webserver.js/public", uri);
 
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
 
console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
 
// real-time communication (socket.io)
 
function sleep(milliseconds) {
          var start = new Date().getTime();
          for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
              break;
            }
          }
        }
 
 
 
var io = require('socket.io').listen(server);
 
io.sockets.on('connection', function (socket) {
  socket.emit('server_status', { message: 'Connected' });
  socket.on('client_status', function (client_status) {
    console.log(client_status);
  });
  socket.on('client_cmd',function(client_cmd) {
    // for (var key in client_cmd)  
        if("MOVE" in client_cmd ){
        console.log("Writing to Serial Port: " + Object.keys(client_cmd).map(function(key)
          {return key + " " + client_cmd[key];}).join(" "));
        serialPort.write(Object.keys(client_cmd).map(function(key)
          {return key + " " + client_cmd[key];}).join(" "));
        }
        else if("SKETCH" in client_cmd){
                var sketch = Object.keys(client_cmd).map(function(key){return client_cmd[key];});
                console.log("Sketch Recieved:");
                console.log(sketch);
                var fs = require('fs');
                fs.writeFile("/tmp/test", sketch , function(err) {
                        if(err) {
                                console.log(err);
                    } else {
                        console.log("The file was saved!");
                    }
                });        
                serialPort.close(function(){
                    console.log("CONSOLE PORT CLOSED - UPLOAD NOW");
                    console.log("Re-opening port in 45 seconds...");
                    sleep(45000);
                    serialInit();
                });      
        }
        });
});