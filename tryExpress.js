const express = require('express'),
    app = express();

app.get('/', function(req, res){
    res.send('Hello World');
});

app.use(function(req, res){
    res.sendStatus(404);
});

const server = app.listen(3000, function() {
    const port = server.address().port;
    console.log('Express server listening on port %s', port);
});