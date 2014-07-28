para.js
=======

Slide show effect with parallax effects.



What's this?
--------

Parallaxエフェクトを実現するスクリプトです。
Htmlのマークアップから、スライドを生成します。


Why this?
--------

+ HTMLのCanvasを利用しているので、動きが滑らか
+ CSSでの色指定が可能


How it works?
--------

エフェクトのない通常のHTMLページをレンダリングし、
その上にCanvas要素を重ねています。
初期状態では、Canvas内には後ろに隠れている通常ページとまったく同じものが描画され、
スクロール位置に応じて要素がずれるようにしています。


Demo
---------

+ [apemanプロジェクト構想](http://okunishinishi.github.io/para.js/apeman)
+ [para.jsプロジェクト企画書](http://okunishinishi.github.io/para.js/kikaku)
+ [おせち販売サイトプロトタイプ](http://okunishinishi.github.io/para.js/oseti)
+ [uiautomation所感発表](http://okunishinishi.github.io/para.js/uiautomation)


Credits
---------

+ Uses [KineticJS](https://github.com/ericdrowell/KineticJS) by ericdrowell