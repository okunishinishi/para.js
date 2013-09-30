#!/use/bin/env node

var tek = require('tek'),
    fs = require('fs'),
    Format = tek['Format'],
    file = tek['file'],
    isDir = file['isDir'],
    EOL = require('os')['EOL'],
    TAB = '\t',
    resolve = require('path')['resolve'],
    JobQueue = tek['JobQueue'];

var distDir = resolve(__dirname, 'dist'),
    apartDistDir = resolve(distDir, 'apart'),
    libDir = resolve(__dirname, 'lib');


function handleErr(err) {
    err && console.error(err);
    return !!err;
}

function indent(string) {
    return TAB + string.replace(new RegExp(EOL, 'mg'), EOL + TAB);
}


var jobQueue = new JobQueue;

function allContentsInDir(dirpath, callback) {
    fs.readdir(dirpath, function (err, filenames) {
        err && handleErr(err);
        var contents = [],
            jobs = filenames
                .map(function (filename) {
                    var filepath = resolve(dirpath, filename);
                    return function (next) {
                        fs.readFile(filepath, function (err, buffer) {
                            err && handleErr(err);
                            contents.push(buffer.toString());
                            next();
                        });
                    }
                });
        new JobQueue().pushAll(jobs).execute(function () {
            callback(contents);
        });
    });
}

jobQueue
    .push(function (next) {
        var publish = require('tek-html')['publish'];

        var files = 'tek.js,tek.less'.split(','),
            jobs = files.map(function (filename) {
                return function (next) {
                    publish(filename, libDir, next);
                }
            });

        new JobQueue().pushAll(jobs).execute(next);
    })
    .push(function (next) {
        fs.exists(apartDistDir, function (exits) {
            if (exits) {
                next();
            } else {
                fs.mkdir(apartDistDir, function (err) {
                    err && handleErr(err);
                    next();
                });
            }
        });
    })
    .push(function (next) {
        var copy = file['copy'],
            getExtension = file['getExtension'];

        fs.readdir(libDir, function (err, filenames) {
            err && handleErr(err);
            var jobs = filenames
                .filter(function (filename) {
                    var ignores = [/\.less$/, /^tek\.css$/];
                    for (var i = 0, len = ignores.length; i < len; i++) {
                        var hit = filename.match(ignores[i]);
                        if (hit) return false;
                    }
                    return true;
                })
                .map(function (filename) {
                    var filepath = resolve(libDir, filename);
                    if (isDir(filepath)) {
                        return function (next) {
                            allContentsInDir(filepath, function (contents) {
                                fs.writeFile(resolve(apartDistDir, filename), contents.join(EOL), function (err) {
                                    err && handleErr(err);
                                    next();
                                });
                            });
                        }
                    } else {
                        return function (next) {
                            var isFormatFile = filepath.match(/\.format$/);
                            if (isFormatFile) {
                                next();
                                return;
                            }
                            copy(filepath, resolve(apartDistDir, filename), next);
                        };
                    }
                });
            new JobQueue().pushAll(jobs).execute(next);
        });
    })
    .push(function (next) {
        var getExtension = file['getExtension'];
        var formatFile = resolve(libDir, 'para.js.format'),
            format = null,
            data = {};
        new JobQueue()
            .push(function (next) {
                fs.readFile(formatFile, function (err, buffer) {
                    err && handleErr(err);
                    format = new Format(buffer.toString());
                    (err ? next.abort : next)();
                });
            })
            .pushAll(

                fs.readdirSync(apartDistDir).map(function (filename) {
                    return function (next) {
                        var filepath = resolve(apartDistDir, filename);
                        fs.readFile(filepath, function (err, buffer) {
                            err && handleErr();

                            var content = buffer.toString();
                            switch (getExtension(filename)) {
                                case ".js":
                                    content = indent(content);
                                    break;
                                case ".css":
                                    content = content.replace(new RegExp(EOL, "g"), '');
                                    break;
                            }

                            data[filename] = indent(content);

                            (err ? next.abort : next)();
                        });
                    };
                })
            ).execute(function () {
                var UglifyJS;
                UglifyJS = require("uglify-js");
                var outpath = resolve(distDir, 'para.js'),
                    minOutpath = outpath.replace(/\.js$/, ".min.js");
                var content = format.apply(data);
                fs.writeFile(outpath, content, function (err) {
                    err && handleErr(err);
                    console.log('new file published:', outpath);
                    var mini = UglifyJS.minify(content, {fromString: true});
                    fs.writeFile(minOutpath, mini.code, function (err) {
                        err && handleErr(err);
                        console.log('new file published:', minOutpath);
                        (err ? next.abort : next)();
                    });
                });
            });
    })
    .execute(function () {
        console.log('[para.js] build done!');
    });