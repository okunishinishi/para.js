/**
 * Created by okunishitaka on 10/25/13.
 */
var should = require('should'),
    index = require('../../lib/index');


exports.indexTest = function (test) {
    should.exist(index.parsers);
    should.exist(index.parsers.PowerpointParser);
    should.exist(index.publish);
    test.done();
};