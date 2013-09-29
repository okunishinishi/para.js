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

                var drawables = page.drawables = new Kinetic.Group;
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