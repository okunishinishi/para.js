var naviFlg = false;
if ( document.getElementById("gnaviShopMainNav7") != null ) {
	var $a = document.getElementById("gnaviShopMainNav7").getElementsByTagName("a");
	naviFlg = true;
} else if ( document.getElementById("gnaviShopMainNav8") != null ) {
	var $a = document.getElementById("gnaviShopMainNav8").getElementsByTagName("a");
	naviFlg = true;
} else if ( document.getElementById("gnaviShopMainNav9") != null ) {
	var $a = document.getElementById("gnaviShopMainNav9").getElementsByTagName("a");
	naviFlg = true;
} else if ( document.getElementById("gnaviShopMainNav14") != null ) {
	var $a = document.getElementById("gnaviShopMainNav14").getElementsByTagName("a");
	naviFlg = true;
}

if (naviFlg) {
	for( var i=0; i<$a.length; i++) {
		$a[i].style.paddingTop=0;
		$a[i].style.paddingBottom=0;
		$a[i].style.marginTop=0;
		$a[i].style.marginBottom=0;
		$a[i].style.height='auto';
		var oh = $a[i].offsetHeight;
		$a[i].style.paddingTop=Math.ceil(((44 - oh)/2)) + "px";
		$a[i].style.height=(44-(Math.ceil((44 - oh)/2))) + "px";
	}
}
