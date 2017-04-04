var express = require('express');
var app = express();
var path = require('path');
var public_path = path.join(__dirname + '/public')

// viewed at http://localhost:8080
app.use(express.static(public_path));
app.get('/', function(req, res) {
    res.sendFile(path.join(public_path + '/index.html'));
});

app.listen(8080);
