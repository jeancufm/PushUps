var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var express = require('express');
var fs = require('fs');
app.use(express.static(__dirname+'/img'));
<<<<<<< HEAD
app.use(express.static(__dirname+'/scripts'));
app.use(express.static(__dirname+'/styles'));
=======
app.use(express.static(__dirname+'/bootstrap'));
app.use(express.static(__dirname+'/temp'));
>>>>>>> refs/remotes/Akakrlos/master
server.listen(8899);
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/json', function (req, res) {
  var configFile = fs.readFileSync('temp/backup.json');
  res.send(configFile);
});
io.on('connection', function (socket) {
<<<<<<< HEAD
  socket.emit('news', { user: 'Server', avatar: 'unnamed.jpg', data: 'Server up :D',color:'aa41d3' });
=======
  socket.emit('news', { data: 'Server up :D',color:'aa41d3',fecha:Date() });
>>>>>>> refs/remotes/Akakrlos/master
  socket.on('my other event', function (data) {});
});
app.post('/notificaciones', function(request, respond) {
    request.on('data', function(data) {
        var body = JSON.parse(data);
        body.fecha = Date();
		io.sockets.emit('news', body);
         var mydatos =  {
                color:body.color,
                mensaje:body.data,
                fecha: body.fecha
            };
        appendObject(mydatos);
		respond.end();
    })
});
function appendObject(obj)
{
  var configFile = fs.readFileSync('temp/backup.json');
  var config = JSON.parse(configFile);
  config['Backup'].push(obj);
  var configJSON = JSON.stringify(config);
  fs.writeFileSync('temp/backup.json', configJSON);
}


