'use strict'

let config = require('./config/json');
let log = require('./utils/log');
let utils = require('./utils/functions');
let placeHolder = config.placeHolder;
let encoding = config.encoding;
let separator = config.separator;
let matchCharacter = config.matchCharacter;
let nCharacters = config.nCharacters;

let fs = require('fs');

let iterator = function (saltValue, nMatches) {

    let counter = 1;
    let matches = '';
    let salt;
    let result = utils.populateString(placeHolder, nCharacters);

    nMatches = parseInt(nMatches);

    for (let i = 0; i < nMatches; i++)
        matches += matchCharacter;

    while (result.indexOf(placeHolder) >= 0) {

        // Printing the current counter for every new 10th million tentative.

        if (counter % 10000000 === 0)
            log.print(counter + ' tries \n');

        salt = saltValue + counter;

        let hashValue = utils.hashCode(salt);
        let index = parseInt(hashValue.charAt(nMatches));

        if (hashValue.startsWith(matches) &&
            !isNaN(index) &&
            result.charAt(index) === placeHolder) {

            let modulo = counter % hashValue.length;
            let indexCharacter = hashValue.charAt(modulo);

            result = utils.replaceAt(result, index, indexCharacter);

            log.print(result + '\n');
        }
        ++counter;
    }

    console.log(result);
    return result;

};

// In order to test it with Mocha
module.exports = iterator;

if(process.argv.length !== 3){
    utils.wrongFormatLog();
    return;
}

let filename = process.argv[2];
let content = fs.readFileSync(filename, encoding);
content = content.split(separator);

if (content.length !== 2 || isNaN(parseInt(content[1]))) {
    utils.wrongFormatLog();
    return;
}

let saltValue = content[0];
let nMatches = content[1];


iterator(saltValue, nMatches);
