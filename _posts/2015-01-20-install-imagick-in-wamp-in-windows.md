---
layout: post
title: Win64 系统下给 PHP 5.5 装 imagick 扩展
category: php
---

<pre>
安装记录：
1，首先建议安装wampserver的32位的版本，64位的我没有安装成功
2，在php/ext下建一个imagick目录
3，下载imagick：http://windows.php.net/downloads/pecl/releases/imagick/
4，下载php扩展：http://windows.php.net/downloads/pecl/deps/，注意nts is for IIS and windows and ts is for Apache and Linux
5，把下载的2个压缩包都解压到php/ext/imagick下，把php/ext/imagick/bin下的文件都复制到php/ext/imagick下，把php/ext/imagick这个目录加入到系统环境变量里面
6，在php.ini里面加入扩展的全路径，比如：extension=C:\wamp\php\ext\imagick\php_imagick.dll
7，重启电脑即可，启动wamp如果出现无法加载vcomp110.dll，则下载一份到php和php/ext/imagick下：http://www.down-dll.com/index.php?file-download=vcomp110.dll&arch=32bit&version=11.0.50727.1
</pre>