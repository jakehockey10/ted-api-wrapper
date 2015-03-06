var express = require('express');
var app = express();
var qs = require('qs');
var talkIdeas = require('talks-ideas')('j79qn8wkwmc554g328k43pa6', 'json');

//var yelp = require("yelp").createClient({
//        consumer_key: "b8iV8U1TojhwQ2SLdpAkoQ",
//        consumer_secret: "q7Ghgx2gLh-qH-vNYmpLkUSueTQ",
//        token: "W2ia0PkM0POzY6K2CSaUrYv5XRINCThT",
//        token_secret: "PyHb46utgiZLhhDsR_36KWVSuKk"
//    })
//    ;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.send("Jake's TED Talks API Wrapper")
});

app.get('/search/talks/:ted_params', function(req, res) {
    res.send(tedSearch('talks', req.params.ted_params));
});

app.get('/search/playlists/:ted_params', function(req, res) {
    res.send(tedSearch('playlists', req.params.ted_params));
});

app.get('/search/quotes/:ted_params', function(req, res) {
    res.send(tedSearch('quotes', req.params.ted_params));
});

app.get('/search/blog_posts/:ted_params', function(req, res) {
    res.send(tedSearch('blog_posts', req.params.ted_params));
});

function tedSearch(categories, params) {
    talkIdeas.search.search({ q: params, categories: categories }, function (error, response) {
        //res.send(response);
        return response;
    })
}
//app.get('/search/:yelp_params', function(req, res) {
//
//    console.log(qs.parse(req.params.yelp_params));
//    // See http://www.yelp.com/developers/documentation/v2/search_api
//    yelp.search(qs.parse(req.params.yelp_params), function(error, data) {
//        res.send(data);
//    });
//});

//app.get('/business/:yelp_params', function(req, res) {
//    // See http://www.yelp.com/developers/documentation/v2/business
//    yelp.business(req.params.yelp_params, function(error, data) {
//        res.send(data);
//    });
//});

app.set('port', (process.env.PORT || 3000));

var server = app.listen(process.env.PORT || app.get('port'), function() {

    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port)
});