const http = require('http');

function giveResponse(question) {
    console.log(question);
    return 'Test2';
}

http.createServer((request, response) => {
    console.log(request.url.split(":"));
    question = decodeURI(request.url.split(":")[1]);
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(giveResponse(question));
    response.end();
}).listen(3000, '10.226.7.4'); // Activates this server, listening on port 8080.

console.log('Node server running on port 3000');