/**
 * Created by okunishitaka on 10/25/13.
 */


var unzip = require('unzip'),
    fs = require('fs'),
    tek = require('tek'),
    JobQueue = tek['meta']['JobQueue'],
    resolve = require('path')['resolve'],
    Parser = require('../parser'),
    define = tek.meta.define;

module.exports = define({
    prototype: Parser,
    properties: {
        unzip: function (infile, callback) {
            var s = this,
                outfile = [infile, new Date().getTime()].join('.');

            var stream = fs.createReadStream(infile);
            var extract = unzip.Extract(
                { path: outfile }
            );
            stream
                .pipe(extract);
            extract.on('close', function (err) {
                err && s.handleErr(err);
                callback(outfile);
            });
        },
        parse: function (filepath, callback) {
            var s = this;
            s.unzip(filepath, function (dirpath) {
                s.rmdirRecursive(dirpath, function (err) {
                    err && s.handleErr(err);
                    callback && callback();
                });
            });
        }
    }
});