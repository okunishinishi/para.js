/**
 * libraries
 */
exports.lib = function () {

};

/**
 * composite functions
 * @returns {Function}
 */
exports.lib.composite = function (/**functions**/) {
    var callables = Array.prototype.slice.call(arguments, 0);
    return function () {
        var s = this,
            result = [];
        for (var i = 0, len = callables.length; i < len; i++) {
            var callable = callables[i];
            var called = callable && callable.apply(s, arguments);
            result = result.concat(called);
        }
        return result;
    };
};

/**
 * make array from iteratable
 * @param iteratable
 * @returns {Array}
 */
exports.lib.toArray = function (iteratable) {
    var a = [];
    if (!iteratable) return a;
    for (var i = 0, len = iteratable.length; i < len; i++) {
        a.push(iteratable[i]);
    }
    return a;
};
