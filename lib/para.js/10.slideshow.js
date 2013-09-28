para = (function (Kinetic, tek, para) {
    var Page = para.Page;
    para.Slideshow = tek.define({
        init: function (data) {
            var s = this;
            s.stage = new Kinetic.Stage(data.stage);
            s.pages = data.pages.map(function (data) {
                return new Page(data);
            });
            stub(s.stage);
        },
        properties: {
            scroll: function (x, y) {
            },
            resize: function (w, h) {
                var s = this,
                    stage = s.stage;
                stage.setWidth(w);
                stage.setHeight(h);
                stage.draw();
            }
        }
    });

    function stub(stage) {
        var layer = new Kinetic.Layer();

        var rect = new Kinetic.Rect({
            x: 239,
            y: 75,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        // add the shape to the layer
        layer.add(rect);

        // add the layer to the stage
        stage.add(layer);
    }

    return para;
})(Kinetic, tek, window['para'] || {});