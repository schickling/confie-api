var express = require('express');
var cors = require('express-cors');
var app = express();
var questions = require('./questions.json');

var i = 1;

app.use(cors({
    allowedOrigins: ['localhost:*']
}));

app.get('/initial', function(req, res) {
    res.send({
        question: questions[0],
        progress: 0,
    });
});

app.post('/answer/:id', function(req, res) {
    res.send({
        question: questions[i],
        progress: i / 100,
    });
    i++;
});

app.listen(8000);
