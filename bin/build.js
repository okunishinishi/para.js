#!/usr/bin/env node

var tek = require('tek'),
    tekHTML = require('tek-html'),
    path = require('path'),
    resolve = path.resolve,
    JobQueue = tek['JobQueue'];


function handleErr(err) {
    console.error(err);
}

var projectDir = resolve(__dirname, '..'),
    distDir = resolve(projectDir, 'dist'),
    libDir = resolve(projectDir, 'lib'),
    jsDistDir = resolve(distDir, 'javascripts'),
    cssDistDir = resolve(distDir, 'stylesheets');

tekHTML.publishAll = function (file_names, publishDir, callback) {
    var publishQueue = new JobQueue;
    file_names.forEach(function (filename) {
        publishQueue.push(function (next) {
            tekHTML.publish(filename, publishDir, next);
        });
    });
    publishQueue.execute(callback);
};


tekHTML.publishAll([
    'tek.js',
    'one-color.js'
], resolve(jsDistDir, 'lib'), function () {
});

tekHTML.publishAll([
    'tek-mixin.less'
], resolve(jsDistDir, 'css'), function () {
});


require(resolve(libDir, 'src/build-src.js')); //execute src build
