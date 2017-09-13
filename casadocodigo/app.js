//configurando express
var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io',io);

/**
    app.listen(3000, function () {
		console.log("Servidor rodando");
	});
 */

http.listen(3000,function(){
	console.log("Servidor rodando");
});