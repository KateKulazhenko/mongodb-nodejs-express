const http = require('http');

const server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plan'});
    response.end('Hello, World');
});

server.listen(8000);

console.log('Server running at http://localhost:8000');