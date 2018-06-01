const express = require('express'),
    app = express(),
    engines = require('consolidate');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    res.render('template', {'name': 'User'});
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use(function (req, res) {
    res.sendStatus(404);
});

const server = app.listen(3000, function () {
    const port = server.address().port;
    console.log('Express server listening on port %s', port);
});