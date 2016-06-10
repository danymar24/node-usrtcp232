/**
* UsrTcp232 Module
*
* Description
*/
var UsrTcp232 = angular.module('UsrTcp232', [])

UsrTcp232.controller('MainController', ['$scope', function($scope){
	
	var socket = io('http://localhost');

	socket.on('news', function (data) {
		console.log(data);
		socket.emit('my other event', { my: 'data' });
	});

	$scope.send = function() {
		console.log('clicked');
		socket.emit('my other event', {data: "some random data2"});
	}

}])

