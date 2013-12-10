/**
 * Created by okunishitaka on 10/25/13.
 */
var tek = require('tek'),
    fs = require('fs'),
    xmldom = require("xmldom"),
    xpath = require('xpath'),
    define = tek.meta.define;

function getElementsByXPath(selector) {
    var doc = this;
    return xpath.select(selector, doc) || [];
}
module.exports = define({
    properties: {
        readXMLFile: function (filepath, callback) {
            var s = this;
            fs.readFile(filepath, function (err, buffer) {
                err && s.handleErr(err);
                var parser = new xmldom.DOMParser(),
                    doc = parser.parseFromString(buffer.toString());
                doc.getElementsByXPath = getElementsByXPath;
                callback(doc);
            });
        },
        handleErr: function (err) {
            console.error(err);
        },
        parse: function (filepath, callback) {
            //for override
        }
    }
});
