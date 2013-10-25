/**
 * Created by okunishitaka on 10/25/13.
 */
var tek = require('tek'),
    fs = require('fs'),
    define = tek.meta.define;

module.exports = define({
    properties: {
        handleErr: function (err) {
            console.error(err);
        },
        parse: function (filepath, callback) {
            //for override
        },
        rmdirRecursive: function (dirpath, callback) {
            var s = this,
                file = tek.file,
                cleanDir = file['cleanDir'],
                dirsInDir = file['dirsInDir'];
            cleanDir(dirpath, function () {
                dirsInDir(dirpath).sort().reverse().forEach(function (dirpath) {
                    console.log(dirpath);
                    var err = fs.rmdirSync(dirpath);
                    err && s.handleErr(err);
                });
                fs.rmdir(dirpath, callback);
            });
        }
    }
});
