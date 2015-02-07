var express = require('express');
var cors = require('express-cors');
var app = express();

app.use(cors({
    allowedOrigins: ['localhost:*']
}));

app.get('/initial', function(req, res) {
    var mock = require('./initial.json');
    res.send(mock);
});

app.listen(8000);
