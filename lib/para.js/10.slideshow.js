para = (function (Kinetic, tek, para) {
    var Page = para.Page;
    para.Slideshow = tek.define({
        init: function (data) {
            var s = this;
            s.stage = new Kinetic.Stage(data.stage);
            s.pages = data.pages.map(function (data) {
                return new Page(data);
            });
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
    return para;
})(Kinetic, tek, window['para'] || {});