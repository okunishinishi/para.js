/**
 * para.js
 * - parallax slideshow -
 * @version v2.0.1
 * @author Taka Okunishi
 * @license MIT
 * @date 2013-12-11
 *
 */

(function (window, para) {

    var tek = window.tek,
        one = window.one,
        Kinetic = window.Kinetic;
    var valid = (function(dependencies){
        for(var name in dependencies){
            if (!dependencies.hasOwnProperty(name)) continue;
            if (!dependencies[name]) {
                console.error('[para.js] dependency missing:', name, 'not found.');
                return false;
            }
        }
        return true;
    })({
        'tek.js':tek,
        'kinetic.js':Kinetic,
        'one-color.js':one
    });
    if (!valid) return;

    tek.crossBrowser(window);

 	/**
	 * libraries
	 */
	para.lib = function () {
	
	};
	
	/**
	 * composite functions
	 * @returns {Function}
	 */
	para.lib.composite = function (/**functions**/) {
	    var callables = Array.prototype.slice.call(arguments, 0);
	    return function () {
	        var s = this,
	            result = [];
	        for (var i = 0, len = callables.length; i < len; i++) {
	            var callable = callables[i];
	            var called = callable && callable.apply(s, arguments);
	            result = result.concat(called);
	        }
	        return result;
	    };
	};
	
	/**
	 * make array from iteratable
	 * @param iteratable
	 * @returns {Array}
	 */
	para.lib.toArray = function (iteratable) {
	    var a = [];
	    if (!iteratable) return a;
	    for (var i = 0, len = iteratable.length; i < len; i++) {
	        a.push(iteratable[i]);
	    }
	    return a;
	};
	var define = tek.define;
	var ParaObject = para.ParaObject = define({
	    properties: {
	
	    },
	    attrAccessor: 'dom,kinetic'.split(',')
	});
	ParaObject.extend = function (def) {
	    def.prototype = ParaObject;
	    return define(def);
	};
	var ParaObject = para.ParaObject;
	
	para.Slideshow = ParaObject.extend({
	    init: function (dom) {
	        var s = this;
	        console.log("dom",dom);
	        s.dom(dom);
	    },
	    properties:{
	
	    }
	});
	/**
	 * call on load
	 */
	para.call = function () {
	    var document = window.document,
	        lib = para.lib,
	        composite = lib.composite,
	        toArray = lib.toArray;
	
	    document.getSlideshowElements = function () {
	        var elements = document.querySelectorAll('.pr-slideshow');
	        return elements.length ? elements : [document.body];
	    };
	    window.onload = composite(window.onload, function () {
	        var slideshows = toArray(document.getSlideshowElements()).map(function (element) {
	            new para.Slideshow(element);
	        });
	    });
	};

   para.call();

 })(window, window['para']={});
