/**
 *
 * Example to communicate a USR-TCP232 client to a node.js TCP server via TCP sockets.
 *
 * This example accepts the USR-TCP232 connection and logs the received data.
 *
 */

var net = require('net');

var server = net.createServer();

server.on('connection', function(socket){
	console.log('Client connected.');

	socket.write('Hello client!');

	socket.on('end', function(){
		console.log('Client disconnected');
	});
});

server.listen(8000, 'localhost');

server.on('listening', function(){
	console.log('Server accepting connections.');
});

server.on('error', function(error){
	console.dir(error);
});