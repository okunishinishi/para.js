#!/use/bin/env node

var tek = require('tek'),
    fs = require('fs'),
    file = tek['file'],
    isDir = file['isDir'],
    resolve = require('path')['resolve'],
    JobQueue = tek['JobQueue'];

var distDir = resolve(__dirname, 'dist'),
    libDir = resolve(__dirname, 'lib');


function handleErr(err) {
    err && console.error(err);
    return !!err;
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
        var copy = file['copy'],
            getExtension = file['getExtension'],
            EOL = require('os')['EOL'];

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
                                fs.writeFile(resolve(distDir, filename), contents.join(EOL), function (err) {
                                    err && handleErr(err);
                                    next();
                                });
                            });
                        }
                    } else {
                        return function (next) {
                            copy(filepath, resolve(distDir, filename), next);
                        };
                    }
                });
            new JobQueue().pushAll(jobs).execute(next);
        });
    })
    .execute(function () {
        console.log('[para.js] build done!');
    });