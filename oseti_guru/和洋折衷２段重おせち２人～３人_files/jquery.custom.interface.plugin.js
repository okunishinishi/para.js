var JQUERY_EDITABLE_PLUGIN_URL  = "/user_data/packages/default/js/jquery.editable.js";
//var JQUERY_INTERFACE_PLUGIN_URL = "/user_data/packages/default/js/interface.js";]
var JQUERY_TRANSFER_PLUGIN_URL  = "/user_data/packages/default/js/interface/ifxtransfer.js";
var JQUERY_RESIZABLE_PLUGIN_URL = "/user_data/packages/default/js/interface/iresizable.js";
var JQUERY_SLIDE_PLUGIN_URL     = "/user_data/packages/default/js/interface/ifxslide.js";
var JQUERY_IUTIL_PLUGIN_URL     = "/user_data/packages/default/js/interface/iutil.js";
var JQUERY_WHEEL_PLUGIN_URL     = "/user_data/packages/default/js/jquery.mousewheel.js";

var SUBMIT_TO_URL = "/admin/ajaxentry/edit.php";
var LOAD_FROM_URL = "/admin/ajaxentry/load.php";

var COMMON_INDICATOR = "<img src='/user_data/packages/default/images/ajax-loader.gif";
var COMMON_IMG_DIR    = "/user_data/packages/default/images/";
var WINDOW_MIN_BTN    = COMMON_IMG_DIR + "window_min.jpg";
var WINDOW_MAX_BTN    = COMMON_IMG_DIR + "window_max.jpg";
var WINDOW_CLOSE_BTN  = COMMON_IMG_DIR + "window_close.jpg";
var WINDOW_RESIZE_BTN = COMMON_IMG_DIR + "window_resize.gif";

//スタック
var stackLoadProducts = new Array();
var inPlaceEditing = new Array();
var locked = new Array();
var inPlaceEdited = false;
var stackContents = new Array();

(function() {
	function createScriptTag(src) {
		var script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", src);
		return script;
	}
	var headTag = document.getElementsByTagName("head")[0];
	//in-place-editor用jsファイル群読み込み
	headTag.appendChild(createScriptTag(JQUERY_EDITABLE_PLUGIN_URL));
	//jQueryインターフェイスプラグイン読み込み
	headTag.appendChild(createScriptTag(JQUERY_TRANSFER_PLUGIN_URL));
	headTag.appendChild(createScriptTag(JQUERY_RESIZABLE_PLUGIN_URL));
	headTag.appendChild(createScriptTag(JQUERY_IUTIL_PLUGIN_URL));
	headTag.appendChild(createScriptTag(JQUERY_SLIDE_PLUGIN_URL));
	//マウスホイールイベント捕捉用プラグイン読み込み
	headTag.appendChild(createScriptTag(JQUERY_WHEEL_PLUGIN_URL));
})()
