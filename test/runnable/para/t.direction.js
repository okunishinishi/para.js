/**
 * Created by okunishitaka on 9/28/13.
 */

var should = require('should');

window = {};
para = Kinetic = tek = undefined;
require('../../../lib/para.js/02.direction.js');
var DIRECTION = para.DIRECTION;
exports.DirectionTest = function (test) {
    DIRECTION.getAll().should.be.lengthOf(4);
    DIRECTION.fromValue("4").should.equal(DIRECTION.LEFT);
    DIRECTION.fromValue(4).should.equal(DIRECTION.LEFT);
    DIRECTION.fromValue("LEFT").should.equal(DIRECTION.LEFT);
    DIRECTION.fromValue("left").should.equal(DIRECTION.LEFT);
    DIRECTION.fromValue("Up").should.equal(DIRECTION.UP);
    DIRECTION.isForward(DIRECTION.RIGHT).should.be.true;
    DIRECTION.isForward(DIRECTION.DOWN).should.be.true;
    DIRECTION.isForward(DIRECTION.UP).should.be.false;
    DIRECTION.isForward(DIRECTION.LEFT).should.be.false;
    test.done();
};


