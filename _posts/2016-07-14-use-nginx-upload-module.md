---
layout: post
title: js 结合 nginx_upload_module 实现大文件分段上传
category: think
---


### 参考资料

1. [nginx-upload-module 断点上传 实战](https://github.com/keminar/nginx-upload-module/blob/master/example/nginx/upload.conf)
2. [Uploading to nginx using the nginx upload module · blueimp/jQuery-File-Upload Wiki](https://github.com/blueimp/jQuery-File-Upload/wiki/Uploading-to-nginx-using-the-nginx-upload-module)
3. [Upload = jQuery File Upload + Nginx Upload Module](http://blog.csdn.net/sfswow/article/details/11475333)
4. [Multipart and file contents stream uploads](https://blueimp.github.io/jQuery-File-Upload/)

### 解决场景
以前公司web端上传视频文件，是用的c++写的浏览器插件，现在打算抛弃这个插件来实现。方案初定如下：

1. 高版本浏览器用h5的方式上传，具体需要浏览器js支持FormData对象和文件切割（IE10+、firefox、chrome）
2. 低版本浏览器则采用flash上传

优酷也是采用的这样的方案，把视频文件切割成若干份，然后分段上传，这样的好处是可以断点续传，而本文主要解决的是后台处理问题。开始的时候是用php来接受和处理文件，效果不太理想，然后打算使用nginx的一个上传模块去做，也就是nginx_upload_module，中间碰到若干问题记录如下

### 碰到的问题
1. 正常分段上传，nginx最后保存的文件应该只有一个文件，而js分段传的时候，nginx保存的文件有多个。后来发现是请求头需要有Content-Disposition、Content-Range、Content-Type、Session-ID、X-Requested-With，缺一不可。
2. 上传完后，md5和原始文件不匹配，这个问题找了好久最后在网上找到原因：nginx的client_body_buffer_size要大于每次分段文件的大小。