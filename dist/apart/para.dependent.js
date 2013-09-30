para = (function (Kinetic, tek, para) {
    return para;
})(Kinetic, tek, typeof(para) === 'undefined' ? {} : para);
para = (function (Kinetic, tek, para) {
    return para;
})(Kinetic, tek, typeof(para) === 'undefined' ? {} : para);
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
})(Kinetic, tek, para);
para = (function (Kinetic, tek, para) {
    var copy = tek.copy,
        Vector = tek.Vector;

    var i=0;
    function newBackground(data) {
        var
            x = data.x,
            y= data.y,
            w = data.width,
            h = data.height;

        var background = new Kinetic.Group({
//            x:x,
//            h:h,
//            width: w,
//            height: h
        });
        var rect = new Kinetic.Rect({
            x:0,
            y:0,
            width: w,
            height: h,
            fill:['#FFA',"#FAA","#AAA"][i++%3]
//            fill: data['background-color'] || "#FFF"
        });
        console.log(['#FFA',"#FAA","#AAA"][i%3],data['background-color']);
        rect.z=1;
//        return rect;
        background.add(rect);
        background.z=1;
//
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
para = (function (Kinetic, tek, para) {
    var Page = para.Page,
        Vector = tek.Vector,
        DIRECTION = para.DIRECTION;
    para.Slideshow = tek.define({
        init: function (data) {
            var s = this;
            s.stage = new Kinetic.Stage(data.stage);
            var layer = new Kinetic.Layer;
            s.stage.add(layer);


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

                var drawables = page.drawables;
                (data.items || []).forEach(function (item) {
                    drawables.add(item);
                });
                layer.add(drawables);

                return  page;
            });
            s._currentPage = s.pages.length && s.pages[0];
            s.stage.draw();
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
                s.stage.draw();
            },
            resize: function (w, h) {
                var s = this,
                    stage = s.stage,
                    pages = s.pages;
                stage.setWidth(w);
                stage.setHeight(h);

                for (var i = 0, len = pages.length; i < len; i++) {
                    var page = pages[len - 1 - i],
                        drawables = page.drawables,
                        size = {w: drawables.getWidth(), h: drawables.getHeight()};
                    switch (s._direction) {
                        case DIRECTION.RIGHT:
                        case DIRECTION.LEFT:
                            size.h = h;
                            break;
                        case DIRECTION.UP:
                        case DIRECTION.DOWN:
                            size.w = w;
                            break;
                    }
                    page.resize(size.w, size.h);
                }
                stage.draw();
            },
            pageAtPoint: function (x, y) {
                var s = this,
                    pages = s.pages;
                for (var i = 0, len = pages.length; i < len; i++) {
                    var page = pages[len - 1 - i];
                    if (y < page.top - 100) continue;
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
})(Kinetic, tek, para);
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
                padding: toNumber(style['padding-top']),
                height: item.offsetHeight,
                fontSize: toNumber(style['font-size']),
                fontFamily: style['font-family'],
                fontStyle: style['font-style'],
                align: style['text-align']
            });
        var group = new Kinetic.Group({});
//        group.sizeFit = {
//            width: style['width'] === 'auto',
//            height: style['height'] === 'auto'
//        };
        group.add(new Kinetic.Rect(copy(data, {
            fill: style['background-color']
        })));
        group.add(new Kinetic.Text(copy(data, {
            text: item.innerText,
            fill: style['color']
        })));
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