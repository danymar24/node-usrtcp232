/**
 *
 * Example to communicate a node app to a USR-TCP232 server via TCP sockets.
 *
 * This example connects to a USR-TCP232 and logs the received data.
 *
 */


var socket = require('net');

// The device ip and port, this can be changed in the device configuration
var HOST = '192.168.1.40';
var PORT = 1040;

var tcp232 = new socket.Socket();

// We have to set the encoding to make the readings readable
tcp232.setEncoding('utf8');

// This is the connection to the USR-TCP232 device
tcp232.connect(PORT, HOST, function(){
	console.log('CONNECTED TO: ' + HOST + ':' + PORT);

	// When the app writes something to the sockets the USR-TCP232 writes it to the serial port
	tcp232.write('Hello USR-TCP232');
});


// When the sockets receive data is logged
tcp232.on('data', function(data){
	console.log(data);
});
