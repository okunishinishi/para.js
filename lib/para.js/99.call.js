para = (function (Kinetic, tek, para, window, document) {
    var composite = tek.composite,
        copy = tek.copy,
        Slideshow = para.Slideshow;

    function newStage(parent) {
        var stage = document.createElement('div');
        stage.className = 'pr-stage';
        stage.id = stage.id || 'pr-stage-' + (newStage.count++);
        parent.appendChild(stage);
        return stage;
    }

    newStage.count = 0;

    window.onload = composite(window.onload, function () {
        var min = tek.math.min,
            max = tek.math.max;

        var body = document.getElementById('para') || document.body,
            slideshow = new Slideshow({
                stage: {
                    container: newStage(body).id,
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                pages: Array.prototype.splice.call(body.children, 0).map(function (elm) {
                    var data = copy(elm.dataset || {}, {}),
                        height = max(data.height || elm.offsetHeight || 0, document.height);
                    elm.style.height = height + "px";
                    elm.className = [elm.className, 'pr-page'].join(' ');
                    data.height = height;
                    return data;
                })
            });
        window.onscroll = composite(window.onscroll, function () {
            var x = window.pageXOffset,
                y = window.pageYOffset;
            slideshow.scroll(x, y);
        });
        window.onresize = composite(window.onresize, function () {
            slideshow.scroll(window.innerWidth, window.innerHeight);
        });
    });
    return para;
})(Kinetic, tek, window.para || {}, window, window.document);