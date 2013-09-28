para = (function (Kinetic, tek, para) {
    return para;
})(Kinetic, tek, window['para'] || {});
para = (function (Kinetic, tek, para) {
    return para;
})(Kinetic, tek, window['para'] || {});
para = (function (Kinetic, tek, para) {
    para.Slideshow = tek.define({

    });
    return para;
})(Kinetic, tek, window['para'] || {});
para = (function (Kinetic, tek, para) {
    var composite = tek.composite,
        copy = tek.copy,
        Slideshow = para.Slideshow;


    window.onload = composite(window.onload, function () {
        var min = tek.math.min,
            max = tek.math.max;

        var body = document.getElementById('para') || document.body,
            data = Array.prototype.splice.call(body.children, 0).map(function (elm) {
                var data = copy(elm.dataset || {}, {}),
                    height = max(data.height || elm.offsetHeight || 0, document.height);
                elm.style.height = height + "px";
                elm.className = [elm.className, 'pr-page'].join(' ');
                data.height = height;

                return data;
            });
        console.log('data', data);
    });

    window.onscroll = composite(window.onscroll, function () {
        var y = window.pageYOffset;
    });
    return para;
})(Kinetic, tek, window['para'] || {});