var express = require('express');
var http = require('http');

// Prepare the server
var app = express();
app.use('/', express.static('./public'));

http.createServer(app).listen(process.env.PORT, function() {
    console.log('App listening on port ' + process.env.PORT);
});
