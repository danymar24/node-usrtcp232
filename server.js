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

	});
});

server.listen(8000, '192.168.1.151');

server.on('listening', function(){
	console.log('Server accepting connections.');
});

server.on('error', function(error){
	console.dir(error);
});