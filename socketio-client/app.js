/**
 *
 * Example to communicate a node app to a USR-TCP232 server via TCP sockets.
 *
 * This example connects to a USR-TCP232 and logs the received data.
 *
 */


var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var socket = require('net');

var tcp232 = new socket.Socket();

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

// We have to set the encoding to make the readings readable
tcp232.setEncoding('utf8');



io.on('connection', function (socket) {

	console.log('Client connected');

	socket.on('connectInfo', function(info){
		console.log('Connection info received: ' + info.host + ':' + info.port);
		// This is the connection to the USR-TCP232 device
		tcp232.connect(info.port, info.host, function(){

			console.log('CONNECTED TO: ' + info.host + ':' + info.port);
			socket.emit('usrConnected', { connected: true });
			// When the app writes something to the sockets the USR-TCP232 writes it to the serial port
			tcp232.write('Hello USR-TCP232');
		});
	});

	socket.on('disconnectInfo', function(info){
		if (info.disconnect) {
			tcp232.destroy();
			socket.emit('usrConnected', {connected: false});
		}d
	});

	socket.on('data', function (data) {
		console.log('Received from client: ' + data);
		tcp232.write(data);
	});

	tcp232.on('data', function(data){
		console.log('Received from USR-TCP232: ' + data);
		socket.emit('data', { data: data });
	});
});
// When the sockets receive data is logged

app.listen(80);



