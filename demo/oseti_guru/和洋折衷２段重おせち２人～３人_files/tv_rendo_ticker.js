/*
 * jQuery ticker
*/
(function($){

// リストにつくid名
var tagId ="tickerId_"

var count = [];
var start = [];
var end = [];

var wrapArray = [];
var wrapId = [];

var wrapWidth = [];
var wrapHegith = [];
var ulHegith = [];

var beforeTag= [];
var tag= [];
var nextTag= [];

var info = {};

var btn;

//スマートフォンウィンドウサイズを変えたときに情報更新
window.onresize = function() {
	for(var i = 0;wrapId.length > i ;i++) {
			if(info[i].type == "move1" || info[i].type == "normal") {
				var userAgent = navigator.userAgent.toLowerCase();
				if(userAgent.search(/iphone/) >= 0 || userAgent.search(/ipad/) >= 0 || userAgent.search(/Android/) >= 0) {

				wrapWidth[i] = wrapArray[i].width();
				wrapHegith[i] = wrapArray[i].height();

				$("#" + wrapId[i] + " ul li").each(function(j){
					$(this).queue([]).stop()
					$(this).css("left",wrapWidth[i]);
				});
				ticker(
				i,
				info[i].target,
				info[i].delay,
				info[i].delay1,
				info[i].delay2,
				info[i].speed,
				info[i].speed1,
				info[i].speed2,
				info[i].easing,
				info[i].type
				);
				flag = false
				}
			}
	}
}

$(function(){
	$.fn.newsTicker = function(options){
		//if(this.length<=1) return false;

		//親取得
		wrapArray.push($(this).closest("ul").closest("div"));
		wrapId.push($(this).closest("ul").closest("div").attr("id"));

		//ページ内に複数Tikcrがある場合の番号付け
		var num = wrapArray.length -1;
		start[num] = count[num] = 0
		end[num] = this.length-1

		//親の幅
		wrapWidth[num] = wrapArray[num].width();
		wrapHegith[num] = wrapArray[num].height();
		ulHegith[num] = $("#" + wrapId[num] + " ul").height();

		var c = $.extend({
			target: this,
			delay: 2000,
			delay1: 1000,
			delay2: 500,
			speed: 50,
			speed1: 1000,
			speed2: 50,
			easing: "easeOutQuad",
			type: "normal",
			onresize: false
		},options);

		info[num] =  {
			target: c.target,
			delay: c.delay,
			delay1: c.delay1,
			delay2: c.delay2,
			speed: c.speed,
			speed1: c.speed1,
			speed2: c.speed2,
			easing: c.easing,
			type: c.type,
			onresize: c.onresize
		}

		//初期設定
		this.each(function(i){
			//idをつける
			$(this).attr("class",tagId+i);

			if(c.type == "fade") {
				//最初以外は消す
				if(i!=0) $(this).hide();
			}

			if(c.type == "move1") {
				$(this).css("left",$(this).closest("ul").closest("div").width());
			}

			if(c.type == "normal") {
				$(this).css("left",$(this).closest("ul").closest("div").width());
			}

			if(c.type == "longitudinally") {
				if(i == 0) {
					$(this).css("top",0);
				}
				else {
					$(this).css("top",ulHegith[num]);
				}
			}
		});

		$(window).bind("load",function(){
			ticker(
			num,
			c.target,
			c.delay,
			c.delay1,
			c.delay2,
			c.speed,
			c.speed1,
			c.speed2,
			c.easing,
			c.type
			);
		});
	}
});

function ticker(num,target,delay,delay1,delay2,speed,speed1,speed2,easing,type) {

	//今のタグと前のタグと次のタグ
	beforeTag[num] = "#" + target.closest("ul").closest("div").attr("id") + " ." +tagId+ (count[num] == 0 ? end[num] : count[num] -1);

	tag[num] = "#" + target.closest("ul").closest("div").attr("id") + " ." +tagId+count[num];

	++count[num]
	if(count[num]>end[num]){
		start[num] = 1;
		count[num] = 0;
	}
	nextTag[num] = "#" + target.closest("ul").closest("div").attr("id") + " ." +tagId+ count[num];

	//それぞれ横幅
	var tagWidth =$(tag[num]).width();
	var nextTagWidth =$(nextTag[num]).width();

	switch (type) {

		//ノーマルティッカー
		case "normal":
			var time =  (tagWidth + wrapWidth[num]) / (speed / 1000);
			$(tag[num]).delay(0).animate({ left : - tagWidth}, time, 'linear',
				function(){$(tag[num]).delay(0).animate({ left: wrapWidth[num]}, 0, 'linear',
				function(){ticker(num,target,delay,delay1,delay2,speed,speed1,speed2,easing,type);});
				});
			break;

		//縦バージョン
		case "longitudinally":
			//最初のひとつだけは少し待ってから処理
			if(start[num] == 0 && tag[num].charAt(tag[num].length-1) == 0) {
				$(tag[num]).delay(delay).animate({top : -ulHegith[num],opacity : 0}, 1000, easing);
				$(nextTag[num]).delay(delay).animate({top : 0,opacity : 1}, 1000, easing,function(){$(tag[num]).delay(delay).animate({top: ulHegith[num],opacity : 0},0,
				function(){ticker(num,target,delay,delay1,delay2,speed,speed1,speed2,easing,type);});});
			}
			else{
				$(tag[num]).animate({top : -ulHegith[num],opacity : 0}, 1000, easing);
				$(nextTag[num]).animate({top : 0,opacity : 1}, 1000, easing,function(){$(tag[num]).delay(delay).animate({top: ulHegith[num],opacity : 0},0,
				function(){ticker(num,target,delay,delay1,delay2,speed,speed1,speed2,easing,type);});});
			}
			break;

		//フェイドイン、フェイドアウト
		case "fade":
			//最初のひとつだけは少し待ってから処理
			if(start[num] == 0 && tag[num].charAt(tag[num].length-1) == 0) {
				$(tag[num]).delay(delay).fadeOut(1000);
				$(nextTag[num]).delay(delay).fadeIn(1000,function(){$(tag[num]).delay(delay).animate({left: 10},0,
				function(){ticker(num,target,delay,delay1,delay2,speed,speed1,speed2,easing,type);});});
			}
			else{
				$(tag[num]).fadeOut(1000);
				$(nextTag[num]).fadeIn(1000,function(){$(tag[num]).delay(delay).animate({left: 10},0,
				function(){ticker(num,target,delay,delay1,delay2,speed,speed1,speed2,easing,type);});});
			}
			break;

		//すばやく出てきて、そのあとにティッカー
		case "move1":
			var time =  (tagWidth + 10) / (speed2 / 1000);
			$(tag[num]).animate({ left : 10}, speed1, easing,
				function(){$(tag[num]).delay(delay1).animate({ left : - tagWidth}, time, 'linear',
				function(){$(tag[num]).delay(delay2).animate({ left: wrapWidth[num]}, 0,
				function(){ticker(num,target,delay,delay1,delay2,speed,speed1,speed2,easing,type);});});
				});
			break;
	}
}


$.easing.jswing=$.easing.swing;
$.easing.jswing=$.easing.swing;
$.extend($.easing,{
	def:"easeOutQuad",
	swing:function(j,i,b,c,d){return $.easing[$.easing.def](j,i,b,c,d);},easeInQuad:function(j,i,b,c,d){return c*(i/=d)*i+b;},easeOutQuad:function(j,i,b,c,d){return -c*(i/=d)*(i-2)+b;},
	easeInOutQuad:function(j,i,b,c,d){if((i/=d/2)<1){return c/2*i*i+b;}return -c/2*((--i)*(i-2)-1)+b;},easeInCubic:function(j,i,b,c,d){return c*(i/=d)*i*i+b;},easeOutCubic:function(j,i,b,c,d){return c*((i=i/d-1)*i*i+1)+b;},easeInOutCubic:function(j,i,b,c,d){if((i/=d/2)<1){return c/2*i*i*i+b;}return c/2*((i-=2)*i*i+2)+b;},
	easeInQuart:function(j,i,b,c,d){return c*(i/=d)*i*i*i+b;},
	easeOutQuart:function(j,i,b,c,d){return -c*((i=i/d-1)*i*i*i-1)+b;},
	easeInOutQuart:function(j,i,b,c,d){if((i/=d/2)<1){return c/2*i*i*i*i+b;}return -c/2*((i-=2)*i*i*i-2)+b;},
	easeInQuint:function(j,i,b,c,d){return c*(i/=d)*i*i*i*i+b;},
	easeOutQuint:function(j,i,b,c,d){return c*((i=i/d-1)*i*i*i*i+1)+b;},
	easeInOutQuint:function(j,i,b,c,d){if((i/=d/2)<1){return c/2*i*i*i*i*i+b;}return c/2*((i-=2)*i*i*i*i+2)+b;},
	easeInSine:function(j,i,b,c,d){return -c*Math.cos(i/d*(Math.PI/2))+c+b;},
	easeOutSine:function(j,i,b,c,d){return c*Math.sin(i/d*(Math.PI/2))+b;},
	easeInOutSine:function(j,i,b,c,d){return -c/2*(Math.cos(Math.PI*i/d)-1)+b;},
	easeInExpo:function(j,i,b,c,d){return(i==0)?b:c*Math.pow(2,10*(i/d-1))+b;},
	easeOutExpo:function(j,i,b,c,d){return(i==d)?b+c:c*(-Math.pow(2,-10*i/d)+1)+b;},
	easeInOutExpo:function(j,i,b,c,d){if(i==0){return b;}if(i==d){return b+c;}if((i/=d/2)<1){return c/2*Math.pow(2,10*(i-1))+b;}return c/2*(-Math.pow(2,-10*--i)+2)+b;},easeInCirc:function(j,i,b,c,d){return -c*(Math.sqrt(1-(i/=d)*i)-1)+b;},
	easeOutCirc:function(j,i,b,c,d){return c*Math.sqrt(1-(i=i/d-1)*i)+b;},
	easeInOutCirc:function(j,i,b,c,d){if((i/=d/2)<1){return -c/2*(Math.sqrt(1-i*i)-1)+b;}return c/2*(Math.sqrt(1-(i-=2)*i)+1)+b;},
	easeInElastic:function(o,m,p,a,b){var d=1.70158;var c=0;var n=a;if(m==0){return p;}if((m/=b)==1){return p+a;}if(!c){c=b*0.3;}if(n<Math.abs(a)){n=a;var d=c/4;}else{var d=c/(2*Math.PI)*Math.asin(a/n);}return -(n*Math.pow(2,10*(m-=1))*Math.sin((m*b-d)*(2*Math.PI)/c))+p;},
	easeOutElastic:function(o,m,p,a,b){var d=1.70158;var c=0;var n=a;if(m==0){return p;}if((m/=b)==1){return p+a;}if(!c){c=b*0.3;}if(n<Math.abs(a)){n=a;var d=c/4;}else{var d=c/(2*Math.PI)*Math.asin(a/n);}return n*Math.pow(2,-10*m)*Math.sin((m*b-d)*(2*Math.PI)/c)+a+p;},
	easeInOutElastic:function(o,m,p,a,b){var d=1.70158;var c=0;var n=a;if(m==0){return p;}if((m/=b/2)==2){return p+a;}if(!c){c=b*(0.3*1.5);}if(n<Math.abs(a)){n=a;var d=c/4;}else{var d=c/(2*Math.PI)*Math.asin(a/n);}if(m<1){return -0.5*(n*Math.pow(2,10*(m-=1))*Math.sin((m*b-d)*(2*Math.PI)/c))+p;}return n*Math.pow(2,-10*(m-=1))*Math.sin((m*b-d)*(2*Math.PI)/c)*0.5+a+p;},
	easeInBack:function(l,k,b,c,d,j){if(j==undefined){j=1.70158;}return c*(k/=d)*k*((j+1)*k-j)+b;},
	easeOutBack:function(l,k,b,c,d,j){if(j==undefined){j=1.70158;}return c*((k=k/d-1)*k*((j+1)*k+j)+1)+b;},
	easeInOutBack:function(l,k,b,c,d,j){if(j==undefined){j=1.70158;}if((k/=d/2)<1){return c/2*(k*k*(((j*=(1.525))+1)*k-j))+b;}return c/2*((k-=2)*k*(((j*=(1.525))+1)*k+j)+2)+b;},easeInBounce:function(j,i,b,c,d){return c-$.easing.easeOutBounce(j,d-i,0,c,d)+b;},
	easeOutBounce:function(j,i,b,c,d){if((i/=d)<(1/2.75)){return c*(7.5625*i*i)+b;}else{if(i<(2/2.75)){return c*(7.5625*(i-=(1.5/2.75))*i+0.75)+b;}else{if(i<(2.5/2.75)){return c*(7.5625*(i-=(2.25/2.75))*i+0.9375)+b;}else{return c*(7.5625*(i-=(2.625/2.75))*i+0.984375)+b;}}}},
	easeInOutBounce:function(j,i,b,c,d){if(i<d/2){return $.easing.easeInBounce(j,i*2,0,c,d)*0.5+b;}return $.easing.easeOutBounce(j,i*2-d,0,c,d)*0.5+c*0.5+b;}
});

}(jQuery));
