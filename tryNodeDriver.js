const MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

const url = 'mongodb://localhost:27017/video';

MongoClient.connect(url, function(err, client) {

    assert.equal(null, err);
    console.log("Successfully connected to server");

    const db = client.db();

    db.collection('movies').find({}).toArray(function(err, docs) {

        docs.forEach(function(doc) {
            console.log(doc.title);
        });

        client.close();
    });

    console.log("Called find()");
});

