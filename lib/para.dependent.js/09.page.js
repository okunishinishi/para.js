para = (function (Kinetic, tek, para) {
    var copy = tek.copy,
        Vector = tek.Vector;

    var i = 0;

    function newBackground(data) {
        var background = new Kinetic.Group;
        var rect = new Kinetic.Rect(copy(data, {
            fill: data['background-color'] || "#FFF"
        }));
        background.add(rect);
        background.z = 1;
        return background;
    }

    para.Page = tek.define({
        init: function (data) {
            var s = this,
                w = data.width,
                h = data.height;
            s.drawables = new Kinetic.Group;
            s.drawables.setWidth(w);
            s.drawables.setHeight(h);
            s.id = data.id;
            s.top = data.top;
            s.left = data.left;
            s.background = newBackground({
                x: data.left,
                y: data.top,
                width: w,
                height: h
            });
            s.drawables.add(s.background);
        },
        attrAccessor: "prev,next".split(','),
        properties: {
            scrollTop: 0,
            scrollLeft: 0,
            _prev: null,
            _next: null,
            move: function (vx, vy) {
                var s = this,
                    drawables = s.drawables.children;
                for (var i = 0; i < drawables.length; i++) {
                    var drawable = drawables[i];
                    var z = drawable.z;
                    drawable.setY(drawable.getY() - vy * z);
                    drawable.setX(drawable.getX() - vx * z);
                }
            },
            scrollTo: function (x, y) {
                var s = this,
                    vx = x - s.scrollLeft,
                    vy = y - s.scrollTop;
                s.scrollLeft = x;
                s.scrollTop = y;
                s.move(vx, vy);
            },
            resize: function (w, h) {
                //TODO
            }
        }
    });
    return para;
})(Kinetic, tek, para);