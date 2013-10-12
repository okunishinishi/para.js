/**
 * Omit word plugin
 *
 * @example $(".overflow").omitword();
 * @desc overflowクラスの文字列を20文字で収まるように切り詰め、省略部分に…を表示する
 *
 * @example $(".overflow").omitword({limit:10, omitchar:'...'});
 * @desc overflowクラスの文字列を10文字で収まるように切り詰め、省略部分を...にする
 *
 * @param limit 文字数の上限。これを超える場合、このサイズに収まるように切り詰める
 * @param omitchar 省略部分につける文字
 *
 */
(function($) {
	$.fn.omitword = function(options){
		var options = $.extend({
			limit : 20,
			omitchar : '…'
		}, options);
		this.each(function(){
			var text = $(this).text();
			if (text.length > options.limit) {
				text = text.substring(0, options.limit - options.omitchar.length) + options.omitchar;
				$(this).text(text);
			}
		});
		return this;
	}
	$.fn.omitword2 = function(options){
		var options = $.extend({
			limit : 20,
			omitchar : '…'
		}, options);
		this.each(function(){
			var text = $(this).text();
			if (text.length > options.limit) {
				text = text.substring(0, options.limit) + options.omitchar;
				$(this).text(text);
			}
		});
		return this;
	}
})(jQuery);
