const MongoClient = require('mongodb').MongoClient,
    commandLineArgs = require('command-line-args'), 
    assert = require('assert');


const options = commandLineOptions();
const url = 'mongodb://localhost:27017/crunchbase';

MongoClient.connect(url, function(err, client) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");
    
    const db = client.db();
    const query = queryDocument(options);
    const projection = projectionDocument(options);

    const cursor = db.collection('companies').find(query);
    cursor.project(projection);
    
    const numMatches = 0;

    cursor.forEach(
        function(doc) {
            numMatches = numMatches + 1;
            console.log( doc );
        },
        function(err) {
            assert.equal(err, null);
            console.log("Our query was:" + JSON.stringify(query));
            console.log("Matching documents: " + numMatches);
            return db.close();
        }
    );

});


const queryDocument = (options) => {

    console.log(options);
    
    const query = {};

    if ("overview" in options) {
        query.overview = {"$regex": options.overview, "$options": "i"};
    }
    
    return query;
    
}


const projectionDocument = (options) => {

    const projection = {
        "_id": 0,
        "name": 1,
        "founded_year": 1,
        "overview": 1
    };

    return projection;
}


const commandLineOptions = () => {

    const cli = commandLineArgs([
        { name: "overview", alias: "o", type: String }
    ]);
    
    const options = cli.parse()
    if (Object.keys(options).length < 1) {
        console.log(cli.getUsage({
            title: "Usage",
            description: "You must supply at least one option. See below."
        }));
        process.exit();
    }

    return options;
    
}


