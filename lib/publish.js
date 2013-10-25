var fs = require('fs'),
    resolve = require('path')['resolve'],
    tek = require('tek'),
    file = tek['file'],
    isDir = file['isDir'],
    getFileName = file['getFileName'],
    filesInDir = file['filesInDir'],
    JobQueue = tek['JobQueue'];

function getPublishFile(filename) {
    var distDir = resolve(__filename, '../dist'),
        filepath = filesInDir(distDir);
    for (var i = 0, len = filepath.length; i < len; i++) {
        var hit = filepath[i].match(filename);
        if (hit) return filepath[i];
    }
    return null;
}

module.exports = function (out, callback) {
    var filename = 'para.js';
    var copy = file['copy'];
    var jobQueue = new JobQueue;
    jobQueue
        .push(function (next) {
            if (!out) {
                console.error('[para.js] out file not found');
                next.abort();
                callback(false);
                return;
            }
            fs.exists(out, function (exists) {
                if (exists && isDir(out)) {
                    out = resolve(out, getFileName(filename));
                }
                next();
            });
        })
        .push(function (next) {
            var filepath = getPublishFile(filename);
            if (filepath) {
                copy(filepath, out, function () {
                    console.log('[para.js] new file published:', out);
                    next();
                });
            } else {
                console.error('[para.js] publish file not found:', filename);
                next.abort();
                callback(false);
            }
        })
        .execute(function () {
            callback && callback();
        });
};