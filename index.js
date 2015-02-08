var _ = require('lodash');
var express = require('express');
var cors = require('express-cors');
var bodyParser = require('body-parser');
var app = express();
var questions = require('./questions.json');
var flatQuestions = _(questions)
    .map(function(qs) {
        return qs.map(function(q, i) {
            return {
                id: q.id,
                isLast: i === qs.length - 1
            }
        })
    })
    .flatten()
    .value();

var i;

var answers = {};

function isLast(id) {
    return _.findWhere(flatQuestions, {
        id: id
    }).isLast;
}

app.use(cors({
    allowedOrigins: ['localhost:*']
}));

app.use(bodyParser.json());

app.get('/initial', function(req, res) {
    i = 0;
    res.send({
        questions: questions[i],
        progress: 0,
    });
    i++;
});

app.post('/answer', function(req, res) {
    answers[req.body.id] = req.body.value;

    console.log(answers);
    var result = {
        progress: i / questions.length,
    };
    console.log(isLast(req.body.id));
    if (isLast(req.body.id)) {
        result.questions = questions[i];
        i++;
    }
    res.send(result);
});

app.listen(8000);
