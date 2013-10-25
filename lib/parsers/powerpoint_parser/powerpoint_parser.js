/**
 * Created by okunishitaka on 10/25/13.
 */


var unzip = require('unzip'),
    fs = require('fs'),
    tek = require('tek'),
    JobQueue = tek['JobQueue'],
    resolve = require('path')['resolve'],
    Parser = require('../parser'),
    file = tek.file,
    rmdirRecursive = file.rmdirRecursive,
    define = tek.meta.define;

module.exports = define({
    prototype: Parser,
    properties: {
        rmdir: function (dirpath, callback) {
            fs.exists(dirpath, function (exists) {
                if (exists) {
                    if (file.isDir(dirpath)) {
                        rmdirRecursive(dirpath, callback);
                    } else {
                        fs.unlink(dirpath, callback);
                    }
                } else {
                    callback();
                }
            });
        },
        unzip: function (infile, callback) {
            var s = this,
                outfile = [infile, "raw"].join('.');

            s.rmdir(outfile, function () {
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
            });
        },
        parseDoc: function (dirpath, callback) {
            callback && callback();
        },
        parseDir: function (dirpath, callback) {
            var s = this,
                queue = new JobQueue,
                data = {};
            queue
                .push(function (next) {
                    fs.exists(dirpath, function (exists) {
                        (exists ? next : next.abort)();
                    });
                })
                .push(function (next) {
                    s.parseDoc(resolve(dirpath, 'docProps'), function () {
                        next();
                    });
                })
                .execute(function (success) {
                    if (success) {
                        callback(data);
                    } else {
                        s.handleErr("[para.js]failed to parse");
                        callback(null);
                    }
                });
        },
        parse: function (filepath, callback) {
            var s = this;
            s.unzip(filepath, function (dirpath) {
                s.parseDir(dirpath, function (data) {
                    callback && callback(data);
                });
            });
        }
    }
});