var serveStatic = require('serve-static');
var express = require('express');
var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/public/views');

var URL = require('./parch_modules/mong');
require('./parch_modules/routes.js')(app, URL);
app.use(express.static(__dirname + '/public'));
app.listen(8800, function() {
    console.log("Parchment server started at port 8800");
});
