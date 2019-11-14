const http = require('http');

function giveResponse(question) {
    try {
        console.log(question);
        if(question.split(" ").includes("anagram")) {
            console.log("anagram");
            return findAnagrams(question)
        }
        if(question === " hvilken by er hovedstaden i Frankrike") {
            return "Paris";
        }
        if(question === " hvem spilte James Bond i Dr No") {
            return "Sean Connery";
        }
        if(question === " hvilken by er hovedstaden i Norge") {
            return "Oslo";
        }
        if(question === " hvor mange banker er det i SB1 alliansen") {
            return "14"
        }
        if(question.split(" ").includes("scrabble")) {
            aaa = question.split(" ");
            return scoreWord(aaa[aaa.length - 1])

        }
        a = question.split(" ");
        console.log(a);
        if (a.includes("what") && (a.includes("plus") || a.includes("minus") || a.includes("multiplied"))) {
            return calcTowNumbers(question)
        } else if (a[1] === "which" && a[9] === "square") {
            return findNumbersBeingSquareAndCube(question);
        }
        else if (a.includes("largest")) {
            return findLargestNumber(question);
        }
        else if (a.includes("primes,")){
            return primes(question);
        }
        else if (a.includes("Fibonacci")) {
            return nthNumberOfFibonacci(question);
        } else if (a.includes("power")) {
            return powIt(question);
        }
        else {
            return "4"
        }
    } catch {
        return "4";
    }
}

function findAnagrams(question) {
    let arr = question.replace(/,/g, '').split(" ");
    let charOnly = /[a-zA-Z ]+/g;
    const possibleAnagrams = arr.slice(10)
    const ofThisWord = arr[9].match(charOnly).toString();
    return possibleAnagrams.find(possibleAnagram =>
        isAnagramOf(possibleAnagram, ofThisWord)).toString()
}
function isAnagramOf(possibleAnagram, ofThisWord) {
    let possibleAnagramSorted = possibleAnagram.split("").sort().toString();
    let ofThisWordSorted = ofThisWord.split("").sort().toString();
    return possibleAnagramSorted == ofThisWordSorted;
}

function scoreLetter(letter) {
    ones = "aeioulnrst";
    twos = "dg";
    threes  = "bcmp";
    fours="fhvwy";
    fives = "k";
    eights = "jx";
    tens = "qz";
    if(ones.includes(letter))
        return 1;
    else if(twos.includes(letter))
        return 2;
    else if(threes.includes(letter))
        return 3;
    else if(fours.includes(letter))
        return 4;
    else if(letter === "k")
        return 5;
    else if(eights.includes(letter))
        return 8;
    else if(tens.includes(letter))
        return 10;
    else
        return 0;
}
function scoreWord(word) {
    output = 0;
    letterArray = word.split('');
    console.log("score scrabble:" ,letterArray);
    letterArray.forEach((value, index, array) => {
        output += scoreLetter(value);
    });
    return output.toString();
}

function findNumbersBeingSquareAndCube(question) {
    const arr = question.replace(/,/g, '').split(' ').splice(12);
    console.log(arr);
    return arr.filter(number => isSquareAndCube(number)).toString();
}
function isSquareAndCube(n) {
    return n > 0 && Math.sqrt(n) % 1 === 0
        && Math.cbrt(n) % 1 === 0;
}

function calcTowNumbers(question) {
    const forEvaluation = question.split(' ').slice(3).toString()
        .replace(/plus/g, "+")
        .replace(/minus/g, "-")
        .replace(/multiplied/g, "*")
        .replace(/by/g, "")
        .replace(/,/g, '')
    console.log(forEvaluation)
    return eval(forEvaluation).toString()
}

function findLargestNumber(question) {
    const arr = question.replace(/,/g, '').split(' ').splice(9);
    console.log(arr);
    console.log(Math.max(...arr).toString());
    return Math.max(...arr).toString();
}

function nthNumberOfFibonacci(question) {
    var numberPattern = /\d+/g;
    const n = parseInt(question.split(' ')[4].match( numberPattern ))
    return fib(n).toString();
}
const fib = (n) => n < 2 ? n : fib(n-1) + fib(n-2);

const isPrime = num => {
    for(let i = 2; i < num; i++)
        if(num % i === 0) return false;
    return num > 1;
};
function primes (str) {
    numberPart = str.split("primes")[1].trim();
    numberArray = numberPart.split(",");
    numberArray = numberArray.map(x => parseInt(x) );
    numberArray.shift();
    output = [];
    numberArray.forEach((value, index, array) => {
        if (isPrime(value)) { output.push(value);}
    });
    console.log("primes", output.toString());
    if(output.length > 0) {
        return output[0].toString();
    }
    return output.toString();
}

function powIt(question) {
    const arr = question.replace(/,/g, '').split(' ');
    const number = arr[3];
    const pow = arr[8];
    console.log(Math.pow(number, pow).toString());
    return Math.pow(number, pow).toString();
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