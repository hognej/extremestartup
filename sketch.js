const http = require('http');

http.createServer((request, response) => {
    console.log(request);
}).listen(3000, '10.226.7.36'); // Activates this server, listening on port 8080.

console.log('Node server running on port 3000');