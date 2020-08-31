---
layout: post
title: 解决 ios7+ 的 app 界面和状态栏重叠的问题（基于 APICloud 和 ionic ）
category: 技术
---

### 环境
APICloud 1.2.0<br />
ionic 1.0.0<br />
cordova 3.6.3<br />
ngCordova 0.1.20-alpha<br />

### 解决方法

1. APICloud项目的配置项statusBarAppearance设为true
2. 引用cordova.js和ng-cordova.min.js
3. js代码要加上

{% highlight javascript %}
var app = angular.module('ionicApp', ['ionic', 'ngCordova'])
app.run(function($cordovaStatusbar) {
    $cordovaStatusbar.overlaysWebView(true)
    $cordovaStatusBar.style(1)
})
{% endhighlight %}

### 分析

目前ios 7+和安卓4.0+都已经支持屏幕界面沉浸式，也就是手机状态栏部分也作为界面的一部分。这样一来，原先你h5网页界面的header就必须设计的高一些，通常你给header的样式加上padding-top为20像素就可以解决（ios是20像素，安卓视机型而定）。