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