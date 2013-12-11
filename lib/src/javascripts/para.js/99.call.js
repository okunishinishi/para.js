/**
 * call on load
 */
exports.call = function () {
    var document = window.document,
        lib = exports.lib,
        composite = lib.composite,
        toArray = lib.toArray;

    document.getSlideshowElements = function () {
        var elements = document.querySelectorAll('.pr-slideshow');
        return elements.length ? elements : [document.body];
    };
    window.onload = composite(window.onload, function () {
        var slideshows = toArray(document.getSlideshowElements()).map(function (element) {
            new exports.Slideshow(element);
        });
    });
};