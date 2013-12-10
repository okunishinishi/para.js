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

exports.parseSlideshowTest = function (test) {
    var dirpath = resolve(mockDir, 't.pptx.raw', 'docProps');
    new PowerpointParser();
    new PowerpointParser().parseSlideshow(dirpath, function (data) {
        data.slides.should.equal(3);
        data.title.should.equal('たいとる');
        data.created.should.equal('2013-10-23T00:45:35Z');
        data.modified.should.equal('2013-10-23T00:47:22Z');
        test.done();
    });
};