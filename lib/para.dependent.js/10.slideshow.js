para = (function (Kinetic, tek, para) {
    var Page = para.Page,
        copy = tek.copy,
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

                (data.items || []).forEach(function (item) {
                    page.drawables.add(item);
                });

                page.drawIndex = data.drawIndex;
                return  page;
            });
            s.pages
                .sort(function (a, b) {
                    return a.drawIndex - b.drawIndex;
                })
                .map(function (page) {
                    return page.drawables;
                })
                .forEach(function (drawables) {
                    layer.add(drawables);
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
            redraw: function () {
                var s = this;
                s.stage.draw();
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