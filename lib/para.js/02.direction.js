para = (function (Kinetic, tek, para) {
    para.DIRECTION = {
        UP: 1,
        RIGHT: 2,
        DOWN: 3,
        LEFT: 4
    };
    para.DIRECTION.__proto__ = {};
    para.DIRECTION.__proto__.getAll = function () {
        var DIRECTION = para.DIRECTION;
        return Object.keys(DIRECTION).map(function (key) {
            return DIRECTION[key];
        });
    };
    para.DIRECTION.__proto__.fromValue = function (value) {
        var DIRECTION = para.DIRECTION,
            directions = DIRECTION.getAll();
        for (var i = 0, len = directions.length; i < len; i++) {
            var direction = directions[i];
            var hit = direction == Number(value);
            if (hit) return direction;
        }
        var key = value && String(value).toUpperCase();
        return DIRECTION[key] || null;
    };
    para.DIRECTION.__proto__.isForward = function (direction) {
        switch (direction) {
            case para.DIRECTION.RIGHT:
            case para.DIRECTION.DOWN:
                return true;
        }
        return false;
    };
    return para;
})(Kinetic, tek, window['para'] || {});