var ParaObject = exports.ParaObject;

var lib = exports.lib;
exports.Page = ParaObject.extend({
    init: function (dom) {
        var s = this.dom(dom);
        s.addClass('pr-page');
    }
});