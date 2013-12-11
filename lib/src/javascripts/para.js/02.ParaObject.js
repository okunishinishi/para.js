var define = tek.define;
var ParaObject = exports.ParaObject = define({
    properties: {

    },
    attrAccessor: 'dom,kinetic'.split(',')
});
ParaObject.extend = function (def) {
    def.prototype = ParaObject;
    return define(def);
};