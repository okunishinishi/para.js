/**
 * Created by okunishitaka on 10/25/13.
 */

var tek = require('tek'),
    toCamel = tek['string']['toCamel'],
    ModuleCollector = tek['meta']['ModuleCollector'];

var modules = new ModuleCollector(__dirname)
    .excludes(/^parser\.js/)
    .collect();
Object.keys(modules).forEach(function (name) {
    exports[toCamel(name, true)] = modules[name];
});
