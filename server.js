var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var express = require('express');
app.use(express.static(__dirname+'/img'));
app.use(express.static(__dirname+'/bootstrap'));
server.listen(8899);
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
  socket.emit('news', { data: 'Server up :D',color:'aa41d3' });
  socket.on('my other event', function (data) {});
});
app.post('/notificaciones', function(request, respond) {
    request.on('data', function(data) {
		console.log('data recibida'+data);
        var body = JSON.parse(data);
        console.log('data recibida 2:'+body);
		io.sockets.emit('news', body);
		respond.end();
    })
});


