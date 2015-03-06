var express = require('express');
var app = express();
var qs = require('qs');
var talkIdeas = require('talks-ideas')('j79qn8wkwmc554g328k43pa6', 'json');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.send("Jake's TED Talks API Wrapper")
});

app.get('/search/talks/:ted_params', function(req, res) {
    var data = {q: req.params.ted_params, categories: 'talks'};
    talkIdeas.search.search(data, function (error, response) {
        res.send(response);
    });
});

app.get('/search/playlists/:ted_params', function(req, res) {
    talkIdeas.search.search({ q: req.params.ted_params, categories: 'playlists' }, function (error, response) {
        res.send(response);
    });
});

app.get('/search/quotes/:ted_params', function(req, res) {
    talkIdeas.search.search({ q: req.params.ted_params, categories: 'quotes' }, function (error, response) {
        res.send(response);
    });
});

app.get('/search/blog_posts/:ted_params', function(req, res) {
    talkIdeas.search.search({ q: req.params.ted_params, categories: 'blog_posts' }, function (error, response) {
        res.send(response);
    });
});

app.get('/talks', function(req, res) {
    talkIdeas.talks.list({}, function(error, response) {
        res.send(response.talks.length.toString());
    })
});

app.get('/talks/:id', function (req, res) {
    talkIdeas.talks.query({id: req.params.id}, function(error, response) {
        res.send(response);
    })
});

app.get('/talks/:id/download', function (req, res) {
    talkIdeas.talks.subtitledDownloads({id: req.params.id}, function(error, response) {
        res.send(response);
    })
});

app.set('port', (process.env.PORT || 3000));

var server = app.listen(process.env.PORT || app.get('port'), function() {

    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port)
});