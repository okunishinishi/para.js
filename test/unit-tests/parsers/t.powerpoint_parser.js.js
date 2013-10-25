/**
 * Created by okunishitaka on 10/25/13.
 */
var should = require('should'),
    resolve = require('path').resolve,
    PowerpointParser = require('../../../lib/parsers/powerpoint_parser');

var mockDir = resolve(__dirname, '../../mock');
exports.parseTest = function (test) {
    var filepath = resolve(mockDir, 't.pptx');
    new PowerpointParser().parse(filepath, function () {
        test.done();
    });
};