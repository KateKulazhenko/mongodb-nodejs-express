const express = require('express'),
    app = express(),
    engines = require('consolidate'),
    bodyParser = require('body-parser');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', { error: err });
}

app.get('/', function(req, res, next) {
    res.render('fruitPicker', { 'fruits' : [ 'apple', 'orange', 'banana', 'peach' ] });
});

app.post('/favorite_fruit', function(req, res, next) {
    const favorite = req.body.fruit;
    if (typeof favorite == 'undefined') {
        next('Please choose a fruit!');
    }
    else {
        res.send("Your favorite fruit is " + favorite);
    }
});

app.use(errorHandler);

const server = app.listen(3000, function() {
    const port = server.address().port;
    console.log('Express server listening on port %s.', port);
});