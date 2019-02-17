
let crypto = require('crypto');
let Service = {};

Service.hashCode = function (str) {
    return crypto.createHash('md5').update(str).digest('hex');
};

Service.replaceAt = function (str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
};

Service.populateString = function (character, n) {
    let res = '' + character;
    while (--n > 0) {
        res += character;
    }
    return res;
};

Service.wrongFormatLog = function () {

    console.log("\n");

    console.log('Please run this program using the following format:');
    console.log('node hash-iterator.js full/path/for/your/input_file.txt \n');

    console.log('The input file has to contain a text with the following format:');
    console.log(' \"< ASCII encoded string >,< A number >\"\n');
};


module.exports = Service;