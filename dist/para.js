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
                var layers = s.layers;
                for (var i = 0, len = layers.length; i < len; i++) {
                    var drawables = layers[i].children;
                    for (var j = 0; j < drawables.length; j++) {
                        console.log(drawables[j]);
                    }
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
para = (function (Kinetic, tek, para) {
    var Page = para.Page,
        Vector = tek.Vector,
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

                page.layers = {};
                function getLayer(z) {
                    var layer = page.layers.z;
                    if (!layer) {
                        layer = new Kinetic.Layer;
                        s.stage.add(layer);
                        page.layers[z] = layer;
                    }
                    return layer;
                }

                (data.items || []).forEach(function (data) {
                    var z = data.z,
                        loadImg = data.loadImg;
                    var layer = getLayer(z);
                    if (loadImg) {
                        loadImg(function (data) {
                            var image = new Kinetic.Image(data);
                            layer.add(image);
                            s.stage.draw();
                        });
                    }
                });

                return  page;
            });
            s._currentPage = s.pages.length && s.pages[0];
        },
        attrAccessor: 'direction,currentPage,onPageChange'.split(','),
        properties: {
            _currentPage: null,
            _direction: para.DIRECTION.DOWN,
            scrollTo: function (x, y) {
                var s = this,
                    currentPage = s.pageAtPoint(x, y);
                var changed = currentPage !== s._currentPage;
                if (changed) {
                    var id = currentPage && currentPage.id;
                    s._currentPage = currentPage;
                    var onChange = s._onPageChange;
                    onChange && onChange(id);
                }
                var pages = s.pages;
                for (var i = 0, len = pages.length; i < len; i++) {
                    var page = pages[i];
                    page.scrollTo(x - page.left, y - page.top);
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
para = (function (Kinetic, tek, para, window, undefined) {
    window = tek.crossBrowser(window);
    var Animation = tek.Animation,
        URL = window['URL'],
        document = window['document'];


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


    function createScopedStyle(elm) {
        toArray(elm.getElementsByTagName('*')).concat(elm).forEach(function (elm) {
            var rules = window.getMatchedCSSRules(elm);
            if (!rules) return;
            tek.unique(toArray(rules)).map(function (rule) {
                console.log(rule.cssText);
            });
        });
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
                    var data = copy(page.dataset || {}, {}),
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

                    var items = toArray(page.children);
                    data.items = items.map(function (item) {
                        createScopedStyle(item);
                        var data = copy(item.dataset || {}, {});
                        var w = item.offsetWidth,
                            h = item.offsetHeight,
                            html = item.outerHTML;
                        data.x = item.offsetLeft;
                        data.y = item.offsetTop;
                        data.width = w;
                        data.height = h;
                        data.loadImg = function (callback) {
                            var img = new Image;
                            img.onload = function () {
                                delete data.loadImg;
                                data.image = img;
                                callback(data);
                                URL.revokeObjectURL(img.src);
                            };
                            img.src = URL.createObjectURL(tek.toSVG(html, w, h));
                        };

                        data.z = parseInt(data.z || 0);
                        return data;
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

        window.onscroll = composite(window.onscroll, function () {
            var x = window.pageXOffset,
                y = window.pageYOffset;
            slideshow.scrollTo(x, y);
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
})(Kinetic, tek, window.para || {}, window, undefined);