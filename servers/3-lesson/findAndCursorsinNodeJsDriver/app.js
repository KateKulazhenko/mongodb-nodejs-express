const MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


MongoClient.connect('mongodb://localhost:27017/crunchbase', function(err, client) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");

    const query = {"category_code": "biotech"};
    const db = client.db();

    db.collection('companies').find(query).toArray(function(err, docs) {

        assert.equal(err, null);
        assert.notEqual(docs.length, 0);
        
        docs.forEach(function(doc) {
            console.log( doc.name + " is a " + doc.category_code + " company." );
        });
        
        db.close();
        
    });

});