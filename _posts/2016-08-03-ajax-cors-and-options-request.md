---
layout: post
title: Ajax 跨域时的 OPTIONS 请求
category: 技术
---

### 参考资料

1. [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)

### 解决场景
ajax的跨域方案目前比较大众的方案有两种：一个是jsonp，一个是CORS方案，即让服务器支持跨域请求。CORS方案分简单请求和复杂请求2种。复杂请求，浏览器在每次请求的时候会发一个options请求（预请求），这样会多一个请求，例如[js结合nginx_upload_module实现大文件分段上传](/tech/2016/07/14/use-nginx-upload-module.html)。对应cors的复杂请求个人意见是没有关系，但是简单请求可以少一次options请求，能用简单请求当然更好。简单请求要符合以下条件：

（1) 请求方法是以下三种方法之一：

- HEAD
- GET
- POST

（2）HTTP的头信息不超出以下几种字段：

- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

 (3) 不能有xhr.upload.onprogress事件

（1）和（2）可以参考[demo](/vendor/cors/header.html)，（3）可以参考[demo](/vendor/cors/onprogress.html)