const MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

MongoClient.connect('mongodb://localfost:21017/video', function (err, db) {
  assert.equal(null, err);
  console.log('Successfull connected to server');

  db.collection('movies').find({}).toArray(function (err, docs) {
      docs.forEach(function (doc) {
          console.log(doc.title);
      });

      db.close();
  });
    console.log('Called find()');
});

