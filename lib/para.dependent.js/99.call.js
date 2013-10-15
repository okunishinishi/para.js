para = (function (Kinetic, tek, para, window, undefined) {
    window = tek.crossBrowser(window);
    var Animation = tek.Animation,
        URL = window['URL'],
        document = window['document'];

    window.newImage = function (src, onload) {
        var image = new Image();
        image.onload = function () {
            onload && onload(image);
            window.onImageLoad && window.onImageLoad();
        };
        image.src = src;
    };
    window.onImageLoad = function () {
        console.log('new image loaded');
    };


    window.scrollToAnimation = function (x, y, duration) {
        var s = window.scrollToAnimation;
        if (s.busy) return;
        s.busy = true;
        if (!duration) duration = 200;
        new Animation({
            x: window.scrollX,
            y: window.scrollY
        }, {x: x, y: y})
            .start(window.requestAnimationFrame, duration, function (value) {
                window.scrollToAnimation.busy = false;
                window.scrollTo(value.x, value.y);
            });
    };

    function toArray(iteratable) {
        return Array.prototype.splice.call(iteratable, 0)
    }

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

    function toNumber(string) {
        return string && parseInt(
            string.replace && string.replace(/[^\.\d]/g, '')
        );
    }

    function domToKinetic(item) {
        var style = window.getComputedStyle(item, null),
            data = copy(item.dataset || {}, {
                x: item.offsetLeft,
                y: item.offsetTop,
                width: item.offsetWidth,
                height: item.offsetHeight,
                padding: toNumber(style['padding-top']),
                fontSize: toNumber(style['font-size']),
                fontFamily: style['font-family'],
                fontStyle: style['font-style'],
                align: style['text-align']
            });
        var group = new Kinetic.Group({});
        var back = new Kinetic.Rect(copy(data, {
            fill: style['background-color']
        }));
        group.add(back);
        group.add(new Kinetic.Text(copy(data, {
            text: item.innerText,
            fill: style['color']
        })));

        var src = item.src;
        if (src) {
            var imgContainer = new Kinetic.Group({});
            group.add(imgContainer);
            window.newImage(src, function (image) {
                imgContainer.add(new Kinetic.Image(copy(data, {
                    image: image
                })));
            });
        }

        var rotate = data.rotate;
        if (rotate) {
            var o = back.getOffset();
            var x = Number(back.getX()),
                y = Number(back.getY()),
                w = back.getWidth(),
                h = back.getHeight();
            back.setOffset([w / 2, h / 2]);
            back.setX(x + w / 2);
            back.setY(y + h / 2);
            back.rotate(.6);
        }
        return group;
    }

    newStage.count = 0;

    para.slideshows = [];

    window.onload = composite(window.onload, function () {
        var min = tek.math.min,
            max = tek.math.max;

        var body = document.getElementById('para') || document.body,
            pages = toArray(body.children),
            stage = newStage(body),
            direction = DIRECTION.fromValue(body.dataset['direction']) || DIRECTION.DOWN,
            slideshow = new Slideshow({
                stage: {
                    container: stage.id,
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                pages: pages.map(function (page, i) {
                    var style = window.getComputedStyle(page),
                        data = copy(page.dataset || {}, {}),
                        width = max(data.width || page.scrollWidth || 0, window.innerWidth),
                        height = max(data.height || page.scrollHeight || 0, window.innerHeight);
                    switch (direction) {
                        case DIRECTION.LEFT:
                        case DIRECTION.RIGHT:
                            page.style.width = width + "px";
                            break;
                        case DIRECTION.UP:
                        case DIRECTION.DOWN:
                            page.style.height = height + "px";
                            break;
                    }
                    page.className = [page.className, 'pr-page'].join(' ');
                    page.id = page.id || 'page-' + (i + 1);
                    data.id = page.id;
                    data.height = height;
                    data.width = width;
                    data.drawIndex = data.drawIndex || i;
                    data['background-color'] = style['background-color'];

                    var items = toArray(page.children);
                    data.items = items.map(function (dom) {
                        var data = copy(dom.dataset, {z: 1});
                        var kinetic = domToKinetic(dom);
                        kinetic.z = data.z && Number(data.z);
                        return kinetic;
                    });
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

        var onScroll = function () {
            var x = window.pageXOffset,
                y = window.pageYOffset;
            slideshow.scrollTo(x, y);
        };
        onScroll();
        window.onscroll = composite(window.onscroll, onScroll);

        window.onresize = composite(window.onresize, function () {
            slideshow.resize(window.innerWidth, window.innerHeight);
        });

        window.onImageLoad = function () {
            slideshow.redraw();
        };

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
                page = slideshow.prevPage() || slideshow.currentPage();
            }
            if (page) {
                slideshow.changePage(page.id);
                window.scrollToAnimation(page.left, page.top);
            }
        });

        para.slideshows.push(slideshow);
    });
    return para;
})(Kinetic, tek, para, window, undefined);