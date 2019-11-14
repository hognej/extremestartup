const http = require('http');

function giveResponse(question) {
    try {
        if(question === "hvilken by er hovedstaden i Frankrike") {
            return "Paris";
        }
        if(question === "hvem spilte James Bond i Dr No") {
            return "Sean Connery";
        }
        if(question === "hvilken by er hovedstaden i Norge") {
            return "Oslo";
        }
        console.log(question);
        a = question.split(" ");
        console.log(a);
        if (a[1] === "what") {
            return calcTowNumbers(question)
        } else if (a[1] === "which") {
            return calcLargest(question);
        }
    } catch {
        return "4";
    }
}

function calcTowNumbers(str) {
    console.log(str);
    const arr = str.split(" ").splice(1);
    console.log(arr);
    const num1 = parseInt(arr[2]);
    const operator = arr[3];
    const num2 = parseInt(arr[4]);
    if(operator === "plus") {
        return (num1 + num2).toString();
    }
    if(operator === "minus") {
        return (num1 - num2).toString();
    }
    if(operator === "multiplied") {
        return (num1 * parseInt(arr[5])).toString();
    }
}

function calcLargest(str) {
    console.log(str.splice(8));
    const arr = str.split(" ").splice(1);
    

}


http.createServer((request, response) => {
    console.log(request.url.split(":"));
    question = decodeURI(request.url.split(":").splice(1));
    if(request.connection.remoteAddress !== "10.226.7.52") {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write("42");
        response.end();

    } else {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(giveResponse(question));
        response.end();
    }
}).listen(3000, '10.226.7.4');

console.log('Node server running on port 3000');