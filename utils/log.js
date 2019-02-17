'use strict';

let Service = {};
let config = require('./../config/json');

Service.print = function (message){
    if(config.responsive){
        console.log(message);
    }
};

module.exports = Service;