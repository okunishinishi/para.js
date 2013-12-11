var define = tek.define;
var ParaObject = exports.ParaObject = define({
    properties: {
        addClass: function (className) {
            var s = this,
                dom = s.dom();
            if (!dom) return;
            var classNames = (dom.className || '').split(' ').concat(className);
            dom.className = tek.unique(classNames).join(' ').replace(/^ /,'');
        }
    },
    attrAccessor: 'dom,kinetic'.split(',')
});
ParaObject.extend = function (def) {
    def.prototype = ParaObject;
    return define(def);
};