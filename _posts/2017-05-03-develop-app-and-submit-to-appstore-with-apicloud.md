---
layout: post
title: 用 APICloud 开发 app 并提交到苹果商店
category: book
---

### 参考资料

1. [app提交到苹果商店，解决办法](http://community.APICloud.com/bbs/forum.php?mod=viewthread&tid=14555)

### APICloud 介绍

APICloud 是一个可以把 h5 网页应用打包成安卓、ios应用的网上平台。和 HBuilder 和 cordova 相比，它是云平台，你需要先提交代码上去再在平台上编译对应的安卓或者ios。在14年的时候我就发现了这个平台，对于我这种不懂安卓、ios开发但是又对js感兴趣的人来说，的确是很好的平台。把它推荐给我一个朋友后，他也开始用起来了，去年的时候已经开发了一个app并上架到appstore上了。这段时间我也抽空做了一个简单的app也上架上去了，itunes链接见：https://itunes.apple.com/cn/app/id1230363226

### 上架appstore步骤

#### 一，本地生成证书
{% highlight bash %}
openssl genrsa -out comCSLRAppFo.key 2048
openssl req -new -key comCSLRAppFo.key -out comCSLRAppFo.certSigningRequest -subj "/emailAddress=xing39393939@gmail.com,CN=John Doe,C=CN"
# 登录苹果开发者后台证书管理，在 Identifiers/App IDs 下添加新的 AppID，并下载 comCSLRAppFo.cer
openssl x509 -in comCSLRAppFo.cer -inform DER -out comCSLRAppFo.pem -outform PEMj
openssl pkcs12 -export -inkey comCSLRAppFo.key -in comCSLRAppFo.pem -out comCSLRAppFo.p12 -password pass:123456
{% endhighlight %}

#### 二，在线生成描述文件
1. 登录[苹果开发者后台证书管理](https://developer.apple.com/account/ios/certificate/)，前提是你已经交钱成为了苹果开发者
1. 在后台Certificates——Production里面先上传证书，需要用到本地生成的xing.certSigningRequest证书
1. 在后台Provisioning Profiles——Distribution里面创建描述文件，需要选择步骤二中创建的证书，创建好后下载描述文件

#### 三，在APICloud上编译ios
1. 在APICloud的后台选择app，在证书 tab页上传你的p12证书和描述文件
1. 在云编译 tab页编译生成ios正式版，并下载ipa

#### 四，上传appstore
1. 登录[itunes 后台](https://itunesconnect.apple.com/)，创建好一个要提交的 app
1. 在mac 系统下用Application loader把ipa 文件上传到苹果服务器（这是唯一一步需要用到mac 系统的地方）
1. 在itunes 后台填写App相关信息保存后提交审核，如果要测试可以用TestFlight功能
