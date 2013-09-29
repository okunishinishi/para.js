para = (function (Kinetic, tek, para) {
    return para;
})(Kinetic, tek, window['para'] || {});
para = (function (Kinetic, tek, para) {
    return para;
})(Kinetic, tek, window['para'] || {});
para = (function (Kinetic, tek, para) {
    para.DIRECTION = {
        UP: 1,
        RIGHT: 2,
        DOWN: 3,
        LEFT: 4
    };
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
para = (function (Kinetic, tek, para) {
    var copy = tek.copy;
    para.Page = tek.define({
        init: function (data) {
            var s = this;
            copy(data, s);
        },
        attrAccessor: "prev,next".split(','),
        properties: {
            _prev: null,
            _next: null
        }
    });
    return para;
})(Kinetic, tek, window['para'] || {});
para = (function (Kinetic, tek, para) {
    var Page = para.Page,
        DIRECTION = para.DIRECTION;
    para.Slideshow = tek.define({
        init: function (data) {
            var s = this;
            s.stage = new Kinetic.Stage(data.stage);
            var top = 0, left = 0;
            var prev = null;
            s.pages = data.pages.map(function (data) {
                data.top = top;
                data.left = left;
                var h = data.height,
                    w = data.width;
                switch (s._direction) {
                    case DIRECTION.DOWN:
                        top += h;
                        break;
                    case DIRECTION.UP:
                        top -= h;
                        break;
                    case DIRECTION.LEFT:
                        left -= w;
                        break;
                    case DIRECTION.RIGHT:
                        left += w;
                        break;
                }
                var page = new Page(data);
                if (prev) {
                    prev.next(page);
                    page.prev(prev);
                }
                prev = page;
                return  page;
            });
            s._currentPage = s.pages.length && s.pages[0];
        },
        attrAccessor: 'direction,currentPage,onPageChange'.split(','),
        properties: {
            _currentPage: null,
            _direction: para.DIRECTION.DOWN,
            scroll: function (x, y) {
                var s = this,
                    currentPage = s.pageAtPoint(x, y);
                var changed = currentPage !== s._currentPage;
                if (changed) {
                    var id = currentPage && currentPage.id;
                    s._currentPage = currentPage;
                    var onChange = s._onPageChange;
                    onChange && onChange(id);
                }
            },
            resize: function (w, h) {
                var s = this,
                    stage = s.stage;
                stage.setWidth(w);
                stage.setHeight(h);
                stage.draw();
            },
            pageAtPoint: function (x, y) {
                var s = this,
                    pages = s.pages;
                for (var i = 0, len = pages.length; i < len; i++) {
                    var page = pages[len - 1 - i];
                    if (page.top > y) continue;
                    return page;
                }
                return null;
            },
            getPage: function (id) {
                var s = this,
                    pages = s.pages;
                for (var i = 0, len = pages.length; i < len; i++) {
                    var page = pages[i],
                        hit = page.id === 'id';
                    if (hit) return page;
                }
                return null;
            },
            changePage: function (id) {
                var s = this,
                    page = s.getPage(id);
                if (!page) return;
                var onChange = s._onPageChange;
                s._currentPage = page;
                onChange && onChange(id);
            },
            nextPage: function () {
                var s = this,
                    page = s._currentPage;
                return page && page.next();
            },
            prevPage: function () {
                var s = this,
                    page = s._currentPage;
                return page && page.prev();
            }
        }
    });
    return para;
})(Kinetic, tek, window['para'] || {});
para = (function (Kinetic, tek, para, window, document) {
    var Animation = tek.Animation;

    window = tek.crossBrowser(window);
    window.
        window.scrollToAnimation = function (x, y, duration) {
        new Animation({
            x: window.scrollX,
            y: window.scrollY
        }, {x: x, y: y})
            .start(window.requestAnimationFrame, duration, function (value, done) {
                console.log('value', value);
                window.scrollTo(value.x, value.y);
            });
    };

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
                    elm.id = elm.id || 'page-' + (i + 1);
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
})(Kinetic, tek, window.para || {}, window, window.document);