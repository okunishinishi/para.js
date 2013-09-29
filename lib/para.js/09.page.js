para = (function (Kinetic, tek, para) {
    var copy = tek.copy,
        Vector = tek.Vector;
    para.Page = tek.define({
        init: function (data) {
            var s = this;
            copy(data, s);
        },
        attrAccessor: "prev,next".split(','),
        properties: {
            scrollTop: 0,
            scrollLeft: 0,
            _prev: null,
            _next: null,
            move: function (vx, vy) {
                var s = this;
                var drawables = s.drawables.children;
                for (var j = 0; j < drawables.length; j++) {
                    var drawable = drawables[j];
                    var z = drawable.z;
                    drawable.setY(drawable.getY() - vy * (1 + z));
                    drawable.setX(drawable.getX() - vx * (1 + z));
                }
            },
            scrollTo: function (x, y) {
                var s = this,
                    vx = x - s.scrollLeft,
                    vy = y - s.scrollTop;
                s.scrollLeft = x;
                s.scrollTop = y;
                s.move(vx, vy);
            }
        }
    });
    return para;
})(Kinetic, tek, window['para'] || {});