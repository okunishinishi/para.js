/**
 * Created by okunishitaka on 10/25/13.
 */
var tek = require('tek'),
    define = tek.meta.define;

module.exports = define({
    properties: {
        handleErr: function (err) {
            console.error(err);
        },
        parse: function (filepath, callback) {
            //for override
        }
    }
});
