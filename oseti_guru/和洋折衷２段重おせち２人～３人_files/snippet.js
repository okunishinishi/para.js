var session_name="Silver_Egg_ACA1";function trim(A){return(A||"").replace(/^\s+|\s+$/g,"")}function get_cookie(A){var E=null;if(document.cookie&&document.cookie!=""){var D=document.cookie.split(";");for(var C=0;C<D.length;C++){var B=trim(D[C]);if(B.substring(0,A.length+1)==(A+"=")){E=encodeURIComponent(B.substring(A.length+1));break}}}return E}function set_cookie(A,B){document.cookie=A+"="+encodeURIComponent(B)+"; path=/"}function get_session_or_generate(){var A=get_cookie(session_name);if(!A){var B="0123456789abcdefghijklmnopqrstuvwxyz";A="";for(i=0;i<32;i=i+1){var C=Math.floor(Math.random()*B.length);A+=B.substring(C,C+1)}set_cookie(session_name,A)}return A}function set_track(A){set_generic_snippet(A,"purchase",false,null)}function set_purchase(A){set_generic_snippet(A,"purchase",false,null)}function set_html_snippet(A){set_generic_snippet(A,"html",false,null)}function set_html_snippet_c(A){set_html_snippet(A)}function set_html_snippet_r(A){set_generic_snippet(A,"html",true,null)}function set_flash_snippet(A){set_generic_snippet(A,"flash",false,null)}function set_flash_snippet_c(A){set_flash_snippet(A)}function set_flash_snippet_r(A){set_generic_snippet(A,"flash",true,null)}function set_generic_snippet(R,E,D,O){var K="sgnavi.silveregg.net";var P="extend";var L=/.*/i;var I=window.location.href;var F=window.location.pathname+window.location.search;var B=R.sess||get_session_or_generate();var Q="recommender";if(R.view==undefined){var J=["sgnavi_j11"]}else{if(R.view instanceof Array){var J=R.view}else{var J=[R.view]}}if(E=="flash"){var H="flash_snippet.js"}else{if(E=="purchase"){var H="purchase"}else{var H="widget"}}for(var M=0;M<J.length;M++){a_view=J[M];var G="//"+K+"/aca/"+H+"?type="+E+"&view="+a_view+"&merch=sgnavi&legal=YjA3MmZiZjEzODE0OTE4MTAuNDM&sess="+B;if(E!="purchase"){G+="&flag=noclickthru"}if(D){if(P=="extend"){G+="&servlet=recommend"}else{G+="&servlet=%2frecommend"}}if(O){G+="&be_type="+O}if(R.view!=undefined){Q="recommender_"+a_view;G=G+"&viewname="+a_view;delete (R.view)}for(prop in R){if(R[prop] instanceof Array){for(M=0;M<R[prop].length;M++){if(R[prop][M]!=undefined){G+="&"+prop+"="+encodeURIComponent(R[prop][M])}}}else{G+="&"+prop+"="+encodeURIComponent(R[prop])}}if(R.prod==undefined){var C=L.exec(F);if(C!=null&&C[1]!=undefined){G+="&prod="+encodeURIComponent(C[1])}}var N=document.createElement("script");N.type="text/javascript";N.charset="UTF-8";if(R.ref==undefined){N.src=G+"&ref="+encodeURIComponent(I)}else{N.src=G+"&ref="+encodeURIComponent(R.ref)}var A=document.getElementById(Q);A.parentNode.appendChild(N)}};