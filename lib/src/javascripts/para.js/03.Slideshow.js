var ParaObject = exports.ParaObject;

var lib = exports.lib;
exports.Slideshow = ParaObject.extend({
    init: function (dom) {
        var s = this.dom(dom);
        s.addClass('pr-slideshow');
        s.pages = lib.toArray(dom.children).map(function (dom) {
            return new exports.Page(dom);
        });
    },
    properties: {

    }
});