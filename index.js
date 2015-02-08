var _ = require('lodash');
var express = require('express');
var request = require('superagent');
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
//var answers = {
//first_name: '12',
//last_name: 'wdfg',
//product_type: 'my car',
//marital_status: 'married',
//title: 'mr',
//date_of_birth: '2015-02-11T00:00:00.000Z',
//postcode: 'sdf',
//email: 'sdf',
//phone: 'dsf',
//employment_type: 'employed',
//vehicle_registration_number: 'sdf',
//vehicle_approximate_value: 'sdf',
//vehicle_registrerd_owner: 'am',
//vechile_overnight_location: 'Garaged',
//vehicle_use: 'Social, domestic & pleasure only',
//vehicle_miles_travelled_this_year: 'dsf',
//driving_license_type: 'UK Full',
//driving_license_age: 'dsf',
//number_of_motor_claims: 'dsf',
//number_of_motor_convictions: 'sdf',
//no_claims_years: 'dsf',
//vehicle_cover_start_date: '2015-02-04T00:00:00.000Z'
//};
var endpoints;

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

var api = 'https://7d777aa7.ngrok.com/';

app.post('/submit', function(req, res) {
    request
        .post(api + 'job')
        .send(answers)
        .end(function(res) {
            // Do something
            //console.log(res);
            endpoints = res.body.result_endpoints;
        });
});

app.get('/results', function(req, res) {
    var endpoint = api + endpoints[0];
    console.log(endpoints);
    request
        .get(endpoint)
        .end(function(res) {
            // Do something
            console.log(res);
        });
});

app.listen(8000);
