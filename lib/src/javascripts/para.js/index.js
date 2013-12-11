var tek = require('tek'),
    EOL = require('os')['EOL'],
    TAB = '\t',
    fs = require('fs'),
    resolve = require('path')['resolve'];


var modules = fs.readdirSync(__dirname)
    .filter(function (filename) {
        return filename != 'index.js';
    })
    .filter(function (filename) {
        return filename != 'format';
    })
    .map(function (filename) {
        var filepath = resolve(__dirname, filename);
        return TAB + fs.readFileSync(filepath).toString().replace(new RegExp(EOL, 'g'), function () {
            return EOL + TAB;
        });
    });

exports.toString = function () {
    return modules.join(EOL);
};
