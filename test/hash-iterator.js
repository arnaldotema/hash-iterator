'use strict';

let assert = require('assert');
let iterator = require('./../hash-iterator');
let expect = require('chai').expect;


describe('Iterator', function() {

    /**
     *
     * More tests should be added in order to
     * completely dissect the program and algorithm.
     *
     * */

    describe('#expectedResults()', function() {
        it('Result should contain no white spaces.', function() {
            expect( /\s/g.test(iterator("code-quality", "3")) ).to.be.false;
        });

        it('should return 09e97089ae for the String. "code-quality,3"', function() {
            assert.equal(iterator("code-quality", "3"), "09e97089ae");
        });
    });
});