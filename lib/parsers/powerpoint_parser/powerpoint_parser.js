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
        parseSlideshow: function (dirpath, callback) {
            var s = this,
                queue = new JobQueue(),
                data = {};
            queue
                .push(function (next) {
                    var app_xml = resolve(dirpath, 'app.xml');
                    s.readXMLFile(app_xml, function (doc) {
                        function read(xpath) {
                            var node = doc.getElementsByXPath(xpath).shift();
                            return node && node.firstChild && node.firstChild.data;
                        }

                        var app = read('//Properties/Application');
                        if (app != 'Microsoft Office PowerPoint') {
                            console.error('invalid application found:', app_xml);
                            next.abort();
                            return;
                        }
                        data.slides = parseInt(read('//Properties/Slides') || 0);
                        next();
                    });
                })
                .push(function (next) {
                    var core_xml = resolve(dirpath, 'core.xml');
                    var ns = {
                        cp: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
                        dc: "http://purl.org/dc/elements/1.1/",
                        dcterms: "http://purl.org/dc/terms/"
                    };
                    s.readXMLFile(core_xml, function (doc) {
                        function read(name) {
                            var xpath = "//*[local-name(.)='coreProperties']/*[local-name(.)='" + name + "']";
                            var node = doc.getElementsByXPath(xpath).shift();
                            return node && node.firstChild && node.firstChild.data;
                        }

                        data.title = read('title');
                        data.created = read('created');
                        data.modified = read('modified');

                        next();
                    });
                })
                .execute(function () {
                    callback(data);
                });
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
                    s.parseSlideshow(resolve(dirpath, 'docProps'), function (slideshow) {
                        if (slideshow) {
                            data.slideshow = slideshow;
                            next();
                        } else {
                            next.abort();
                        }
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