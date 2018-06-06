const express = require('express'),
    app = express(),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

const url = 'mongodb://localhost:27017/video';

MongoClient.connect(url, function(err, client) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    const db = client.db();

    app.get('/', function(req, res){

        db.collection('movies').find({}).toArray(function(err, docs) {
            res.render('movies', { 'movies': docs } );
        });

    });

    app.use(function(req, res){
        res.sendStatus(404);
    });

    const server = app.listen(3000, function() {
        const port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});