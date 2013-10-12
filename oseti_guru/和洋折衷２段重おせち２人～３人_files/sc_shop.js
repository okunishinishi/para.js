/* 038食市 */
var sc_href = location.href;
if(sc_href.match(/shop\.gnavi\.co\.jp\/category\/$/) || sc_href.match(/shop\.gnavi\.co\.jp\/[0-9a-z]+\/goods_list\//)){
	if(navigator.userAgent){
		var sc_uaie = navigator.userAgent;
		if(sc_uaie.match(/MSIE/) || document.all){
		/* サイトカタリストjs停止 */
			s.t=function(){return '';}

			var scpageName="";
			if(location.host=="gnavi.co.jp"){
				scpageName="";
			} else {
			scpageName=location.host.replace(/\.gnavi\.co\.jp/,"");
			}
			scpageName=scpageName+location.pathname.replace(/\/index\.\w+/,"");
			/* 末尾のスラッシュを除去 */
			scpageName=scpageName.replace(/\/$/,"");
			if(scpageName){
				var sc_pageName = scpageName;
			} else {
				var sc_pageName = "www";
			}
			var sc_prop2 = scpageName.split("/");
			if(sc_prop2.length > 0){
				var c2 = sc_prop2[0] + "/" + sc_prop2[1];
			} else {
				var c2 = sc_prop2;
			}
		/* 静的イメージリクエスト */
		var ieOverAtag = '<img src="http://gurunavi.d1.sc.omtrdc.net/b/ss/gnavi2008shopmain,gnavi2008homeglobal/1/H.22.1/scshop20110916?AQB=1&amp;ndh=1&amp;vmf=gurunavi.112.2o7.net&amp;ce=UTF-8&amp;ns=gurunavi&amp;cdp=3&amp;pageName=' + sc_pageName + '&amp;cc=JPY&amp;ch=shop&amp;server=shop.gnavi.co.jp&amp;events=event2&amp;c1=shop&amp;c2=' +c2+ '&amp;v2=shop&amp;c3=buy&amp;v3=' +c2+ '&amp;c4=buy&amp;c21=' +c2+ '&amp;c42=' +c2+ '&amp;c45=shop&amp;c47=shop&amp;c48=shop&amp;c49=shop&amp;c51=' +c2+ '&amp;v51=' +c2+ '&amp;c61=no_JavaScript&amp;v61=no_JavaScript&amp;AQE=1" height="1" width="1" border="0" alt="" />'
		document.write(ieOverAtag);
		} 
	}
}
/* カート追加時の関数呼び出し */
if(typeof jQuery =="function"){
	jQuery.noConflict();
	jQuery(document).ready(function($) {
		/* scAdd */
		if(document.getElementById("shopContent") || document.getElementById("goodsTitle")){
			if($(".goodsPurchaseArea a").length){
				var cartAtag = $(".goodsPurchaseArea a").attr('href');
				if(cartAtag.match(/#/)){
					$(".goodsPurchaseArea a").attr('id','sc_cartBt');
				}
				if($("#sc_cartBt").length){
					$("#sc_cartBt").click(function(){
							s.sc_send_cart("form1");
					});
				}
			}
		}
	});
}

function getClassName(getClass){
	var otokuElements = new Array();
	if (document.all){
		var atagElements = document.all;
	} else {
		var atagElements = document.getElementsByTagName("*");
	}
	var j = 0;
	for (var i = 0; i < atagElements.length; i++) {
		if (atagElements[i].className === getClass) {
			otokuElements[j] = atagElements[i];
			j++;
		}
	}
		return otokuElements;
}

function getInnerHTML(setClass){
	var otokuElements = new Array();
	if (document.all){
		var atagElements = document.all;
	} else {
		var atagElements = document.getElementsByTagName("*");
	}
	var j = 0;
	for (var i = 0; i < atagElements.length; i++) {
		if (atagElements[i].className === setClass) {
			
			otokuElements[j] = atagElements[i].innerHTML;
			j++;
		}
	}
		return otokuElements;
}

function trackAjaxName(sc_menu) {
	s.linkTrackVars = "prop5,eVar5,prop20,eVar20";
	s.eVar5 = s.prop5 = sc_menu;
	s.eVar20 = s.prop20 = s.pageName;
	s.tl(this, "o" ,sc_menu);
}
/* keyword 2012-02-01 */
function scRefSearch(){
	if(document.referrer){
		var scRef = document.referrer;
		if(scRef.match(/www\.google\.co\.jp/)){
			var sq = "q=";
		} else if(scRef.match(/search\.yahoo\.co\.jp\/search/)){
			var sq = "p=";
		} else if(scRef.match(/jp\.bing\.com\/search/)){
			var sq = "q=";
		} else if(scRef.match(/www\.bing\.com\/search/)){
			var sq = "q=";
		}
		if(scRef.match(/\?/)){
			var scRefArr = scRef.split('?');
			if(scRefArr.length && scRefArr.length >= 2){
				var sc_qString = scRefArr[1].split('&');
				if(sc_qString){
					var sc_qStringArr;
					var scKey = "^" + sq;
					var scKerReg = new RegExp(scKey);
					for(var i = 0; i < sc_qString.length; i++ ){
						if(sc_qString[i].match(scKerReg)){
							sc_qStringArr = sc_qString[i].split("=");
						}
					}
					try{
						if(sc_qStringArr[1]){
							return sc_qStringArr[1];
						}
					}catch( e ){
							return sc_qStringArr = "";
					}
				}
			} else {
				return null;
			}
		}
	}
}
s.un="gnavi2008shopmain,gnavi2008homeglobal";
function s_postPlugins(s) {
  /*----- この行より上を変更しないでください -----*/
  /* ページ名自動生成 */
  var scpageName="";
  if(location.host=="gnavi.co.jp"){
	scpageName="";
  } else {
	scpageName=location.host.replace(/\.gnavi\.co\.jp/,"");
  }
  scpageName=scpageName+location.pathname.replace(/\/index\.\w+/,"");
  /* 末尾のスラッシュを除去 */
  scpageName=scpageName.replace(/\/$/,"");
  if(scpageName){
	s.pageName=scpageName;
  } else {
	s.pageName="www";
  }
  /* サイトセクション */
  s.channel="shop";
  s.prop1="shop"
  s.prop2="shop";
	if(location.href.match(/shop\.gnavi\.co\.jp\/surfsnow\//)){
		s.eVar1 = s.prop1 = "snow";
		s.eVar3 = s.prop2 = "snow/surfsnow";
	}
  s.prop21 = "";

//s.trackInlineStats=false;
	/* プレミアム会員計測 2012-04-23 */
	if(location.href.match(/shop\.gnavi\.co\.jp\/?$/)){
			s.eVar61 = s.prop61 = s.pageName;
			s.un="gnavi2011other,gnavi2008shopmain,gnavi2008homeglobal";
	}
  /* keyword 2012-02-01 */
	if(document.referrer){
		if(decodeURIComponent){
			try{
				if (decodeURIComponent(document.referrer)) {
					s.prop41 = s.pageName + ':' + decodeURIComponent(scRefSearch());
					s.prop41 = s.prop41.replace("\+","&#160");
					if(s.prop41.match(/undefined/)){
						s.prop41 = "";
					}
					s.eVar41 = "D=c41";
				}
			}catch( e ){
			}
		}
	}

  s.pageNameArr = s.pageName.split("/");
  if (s.pageNameArr[1] && s.pageNameArr[1].indexOf(".") < 0) { // prop2
    s.prop2 = s.pageNameArr[0] + "/" + s.pageNameArr[1];
  } else {
    s.prop2 = s.pageNameArr[0];
  }
  if (s.pageNameArr[2] && s.pageNameArr[2].indexOf(".") < 0) { // prop21
    s.prop21 = s.pageNameArr[0] + "/" + s.pageNameArr[1] + "/" + s.pageNameArr[2];
  } else {
    s.prop21 = s.prop2;
  }
  if(s.purchaseID){
    s.purchaseID=s.purchaseID.replace(/-/g,"");
  }

	/* パンくず取得 2012-04-16 */
	if(document.getElementById('topicPath')){
		if(document.getElementById('topicPath').innerHTML){
			var topicNaka = document.getElementById('topicPath').innerHTML;
			topicNaka = topicNaka.replace(/\t/g, '');
			topicNaka = topicNaka.replace(/\n$/, '');
			var topicDir = topicNaka.split(/\n/);
			var topicHref = [];
			if(topicDir.length && topicDir.length > 4){
				for(var i = 1; i < 6; i++){
					try{
						if(topicDir[i].match(/href=\"http:\/\/shop\.gnavi\.co\.jp\/g\/[0-9\-\/]+\/\"/)){
							topicHref[i] = topicDir[i].match(/href=\"http:\/\/shop\.gnavi\.co\.jp(\/g\/[0-9\-\/]+\/)\"/)[1];
						}
					} catch(e) {
						return false;
					}
				}
			}
			if(topicHref && topicHref.length > 4){
				if(topicHref[2]){
					s.prop35 = topicHref[2];
				}
				if(topicHref[3]){
					s.prop36 = topicHref[3];
				}
				if(topicHref[4]){
					s.prop37 = topicHref[4];
				}
				if(topicHref[5]){
					s.prop38 = topicHref[5];
				}
			}
		}
	}

  s.eVar24 = s.getQueryParam("sc_bid"); // 2010-05-24
  s.eVar25 = s.eVar24; // 2010-05-24

	/* 検索フリーワード取得追加 2011-08-08 */
	var ca1="\u3059\u3079\u3066\u306e\u5546\u54c1\u304b\u3089";
	var ca2="\u5e97\u540d\u304b\u3089";
	var ca3="\u3053\u306e\u30ab\u30c6\u30b4\u30ea\u304b\u3089";

	if(location.href.match(/shop\.gnavi\.co\.jp\/search\/keyword\.php/) ||location.href.match(/shop\.gnavi\.co\.jp\/search\/shop\.php/) || location.href.match(/shop\.gnavi\.co\.jp\/g\//)){
		if(s.getQueryParam("kwtype")){
			s_prop22 = s.getQueryParam("kwtype");
			if(s_prop22 === "all"){
				s.eVar22 = s.prop22 = ca1;
			}
			if(s_prop22 === "shop"){
				s.eVar22 = s.prop22 = ca2;
			}
			if(s_prop22 === "current"){
				s.eVar22 = s.prop22 = ca3;
			}
		}
		if(document.forms["search_error"]){
			if(document.forms["search_error"].not_found){
				s.events = s.apl(s.events, "event43", ",", 1);
				if(document.forms["search_error"].search_type){
					if(document.forms["search_error"].search_type.value && document.forms["search_error"].search_type.value == "2"){
						s.eVar22 = s.prop22 = ca2;
					}
				}
			}
		}
		if(s.getQueryParam("keyword")){
			s.eVar23 = s.prop23 = s.getQueryParam("keyword");
		}
	}

  if (s.eVar22 || s.eVar23) { // 2010-05-24
    s.events = s.apl(s.events, "event42", ",", 1);
  }

  // 2010-05-24
  /* finding method */
  if (s.campaign) {
    s.eVar26 = "ex_campaign";
    s.eVar27 = s.eVar26;
  } else if (s.eVar24) {
    s.eVar26 = "int_campaign";
    s.eVar27 = s.eVar26;
  } else if (location.pathname.match(/^\/ranking/) ) {
    s.eVar26 = "ranking";
    s.eVar27 = s.eVar26;
  } else if (s.eVar22 || s.eVar23) {
    s.eVar26 = "int_search";
    s.eVar27 = s.eVar26;
  } else if (location.pathname.match(/^\/g\//) ) {
    s.eVar26 = "browse";
    s.eVar27 = s.eVar26;
  }

	/* edmランディング後同一店舗ページPVカウント 2012-01-16 */
if(s.campaign){
	if(s.campaign.match(/^ed/)){
		if(s.pageNameArr[1]){
			if(s.setCk) {
				s.setCk("edml",s.pageNameArr[1]);
				s.events = s.apl(s.events, "event81", ",", 1);
			}
		}
	}
} else {
	if(s.getCk){
		if(s.getCk("edml") === s.pageNameArr[1]){
			s.events = s.apl(s.events, "event81", ",", 1);
		}
	}
}

	/* スマートフォン計測RC 2012-02-27 */
	if(s.prop53 && s.prop53 != 'PC'){
		if(s.un && !(s.un.match(/gnavi2011smartphone/))){
			s.eVar67 = s.prop67 = s.prop2;
			s.un = "gnavi2011smartphone," + s.un;
		}
	}
	/* 2011-07-20 */
	s.eVar2 = s.prop1;
	s.eVar3 = s.prop2;
} // doPlugins

/* scCheckout */
if (location.pathname.match(/cart\/order_info\.php/)) {
  if (document.forms["form1"]) {
    s.prodtmp = "";
    if (document.form1["goodsid_sc[]"].length) {
      for (s.sidx = 0; s.sidx < document.form1["goodsid_sc[]"].length; s.sidx++) {
        s.prodtmp = s.prodtmp + document.form1["goodsid_sc[]"][s.sidx].value.replace(/;\d+$/ , "");
        s.prodtmp = s.prodtmp + ",";
      }
      s.products = s.prodtmp.replace(/,$/, "");
      s.events = s.apl(s.events, "scCheckout", ",", 1);
    } else {
      s.prodtmp = document.form1["goodsid_sc[]"].value;
      s.products = s.prodtmp.replace(/;\d+$/ , "");
      s.events = s.apl(s.events, "scCheckout", ",", 1);
    }
  }
}

/* 購入完了画面で取得09-08-11 */
if(location.pathname.match(/cart\/complete\.php/)){
  if(document.forms["form1"]){
	  var fm = document.forms["form1"];
	  s.prop24=fm.mailshop_sc.value;
	  s.prop25=fm.mailshopmall_sc.value;
	  s.prop26=fm.orderer_zip_sc.value; // 2010-05-24
    s.zip="D=c26";
	  s.prop27=fm.orderer_area_sc.value; // 2010-05-24
    s.state="D=c27";
	  s.prop28=fm.orderer_adr1_sc.value;
	  s.prop29=fm.receiver_type_sc.value;
	  s.prop30=document.getElementsByName("receiver_zip_sc[]").item(0).value;
	  s.prop31=document.getElementsByName("receiver_area_sc[]").item(0).value;
	  s.prop32=document.getElementsByName("receiver_adr1_sc[]").item(0).value;
	  s.prop33=fm.delivery_date_sc.value;
	  s.prop34=fm.delivery_time_sc.value;
	  s.prop35=fm.gift_add_sc.value;
	  s.prop36=fm.wrap_add_sc.value;
	  s.prop37=fm.bag_add_sc.value;
	  s.prop38=fm.noshi_add_sc.value;
	  s.prop39=fm.receiver_orderer_sc.value;
	  s.prop40=fm.payment_type_sc.value; // 2010-05-24
    s.eVar21="c40";
	}
}

/* prodView 製品紹介ページ表示 */
if (document.getElementById("shopContent") && document.getElementById("goodsTitle") && !s.products ) {
  s.products = "";
  for (s.sidx = 0; s.sidx < document.forms.length; s.sidx++) {
    if (document.forms[s.sidx].sid && document.forms[s.sidx].gid) {
      s.products = s.products + document.forms[s.sidx].sid.value + ";" + document.forms[s.sidx].gid.value + ",";
    }
  }
  s.products = s.products.replace(/,$/, "");
  if (s.products) {
    s.events = s.apl(s.events, "prodView", ",", 1);
    s.events = s.apl(s.events, "event41", ",", 1);
  }
}

/* scAdd カート追加クリック計測 */
s.sc_send_cart = function(formname) {
	if(document.forms[formname]){
		var presid = document.forms[formname].product_id.value;
		var fm = "goods" + presid;
		if(document.forms[fm] && document.forms[fm].sid && document.forms[fm].gid){
		  s.linkTrackVars = "products,events";
		  s.events = s.linkTrackEvents = "scAdd";
		  s.products = document.forms[fm].sid.value + ";" + document.forms[fm].gid.value;
		  s.tl(true, "o", "scAdd");
		}
	}
}

function makeHidden(name, value, formname) {
    var element = document.createElement('input');
    element.type = 'hidden';
    element.name = name;
    element.value = value;
    document.forms[formname].appendChild(element);
}

/* override cartAddPost (goods_page.js) */
function cartAddPost(formname) {
    var query = window.location.search.substring(1);
    if(query.indexOf('ref') != -1) {
        var params = query.split('&');
        for (var i = 0 ; i < params.length ; i++) {
	    if(params[i].indexOf('ref') != -1) {
	        makeHidden('ref', params[i], formname);
            }
        }
    } else {
        makeHidden('ref', document.referrer, formname);
    }
    s.sc_send_cart(formname); // sitecatalyst
    document.forms[formname].submit();
}

/*----- この行より下を変更しないでください -----*/
void(s.t());
s.prop5 = s.eVar5 = s.prop20 = s.eVar20 = '';
