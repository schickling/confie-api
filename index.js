var express = require('express');
var cors = require('express-cors');
var app = express();
var questions = require('./questions.json');

var i = 1;

var answers = {};

app.use(cors({
    allowedOrigins: ['localhost:*']
}));

app.get('/initial', function(req, res) {
    res.send({
        questions: questions[0],
        progress: 0,
    });
});

app.post('/answer/:id', function(req, res) {
    res.send({
        questions: questions[i],
        progress: i / questions.length,
    });
    i++;
});

app.listen(8000);
