para = (function (Kinetic, tek, para, window, document) {
    var composite = tek.composite,
        copy = tek.copy,
        Slideshow = para.Slideshow,
        DIRECTION = para.DIRECTION;

    function newStage(parent) {
        var stage = document.createElement('div');
        stage.className = 'pr-stage';
        stage.id = stage.id || 'pr-stage-' + (newStage.count++);
        parent.appendChild(stage);
        return stage;
    }

    newStage.count = 0;

    para.slideshows = [];

    window.onload = composite(window.onload, function () {
        var min = tek.math.min,
            max = tek.math.max;

        var body = document.getElementById('para') || document.body,
            stage = newStage(body),
            direction = DIRECTION.fromValue(body.dataset['direction']) || DIRECTION.DOWN,
            slideshow = new Slideshow({
                stage: {
                    container: stage.id,
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                pages: Array.prototype.splice.call(body.children, 0).map(function (elm, i) {
                    var data = copy(elm.dataset || {}, {}),
                        width = max(data.width || elm.scrollWidth || 0, window.innerWidth),
                        height = max(data.height || elm.scrollHeight || 0, window.innerHeight);
                    switch (direction) {
                        case DIRECTION.LEFT:
                        case DIRECTION.RIGHT:
                            elm.style.width = width + "px";
                            break;
                        case DIRECTION.UP:
                        case DIRECTION.DOWN:
                            elm.style.height = height + "px";
                            break;
                    }
                    elm.className = [elm.className, 'pr-page'].join(' ');
                    elm.id = elm.id || 'page-' + i;
                    data.id = elm.id;
                    data.height = height;
                    data.width = width;
                    return data;
                })
            })
                .direction(direction)
                .onPageChange(function (pageId) {
                    var page = document.getElementById(pageId);
                    if (!page) return;
                    var stageId = stage.id;
                    page.id = undefined;
                    stage.id = pageId;
                    location.hash = pageId;
                    stage.id = stageId;
                    page.id = pageId;
                });

        window.onscroll = composite(window.onscroll, function () {
            var x = window.pageXOffset,
                y = window.pageYOffset;
            slideshow.scroll(x, y);
        });

        window.onresize = composite(window.onresize, function () {
            slideshow.resize(window.innerWidth, window.innerHeight);
        });

        document.addEventListener('keydown', function (e) {
            var direction = DIRECTION.fromValue(e.keyIdentifier);
            if (!direction) return;
            e.preventDefault();
            var next = DIRECTION.isForward(slideshow._direction)
                == DIRECTION.isForward(direction);
            var page = null;
            if (next) {
                page = slideshow.nextPage();
            } else {
                page = slideshow.prevPage();
            }
            if (page) {
                slideshow.changePage(page.id);
                window.scrollTo(page.left, page.top);
            }
        });

        para.slideshows.push(slideshow);
    });
    return para;
})(Kinetic, tek, window.para || {}, window, window.document);