---
layout: post
title: Nginx 或者 Apache 配置 HTTPS 服务器
category: tech
---

### 参考资料

1. [Nginx 配置 HTTPS 服务器](https://aotu.io/notes/2016/08/16/nginx-https/)
2. [全球可信并且唯一免费的HTTPS(SSL)证书颁发机构：StartSSL](http://zyan.cc/startssl/)
3. [Apache 使用ssl模块配置HTTPS](http://blog.csdn.net/ithomer/article/details/50433363)
4. [Apache httpd开启SSL](https://my.oschina.net/xpbug/blog/197454)

### 密钥、证书签名请求文件、证书

{% highlight bash %}
openssl req -new -newkey rsa:2048 -sha256 -nodes -out server.csr -keyout server.key -subj "/C=CN/ST=ShenZhen/L=ShenZhen/O=Example Inc./OU=Web Security/CN=example.com"
openssl x509 -req -days 3650 -in server.csr -signkey server.key -out server.crt
{% endhighlight %}
第一个命令生成密钥server.key和证书签名请求文件server.csr。

第二个命令生成的是自签名证书，有效期设置3650天。使用这种证书提供https服务，浏览器一般会提示“此网站的安全证书有问题......继续浏览此网站(不推荐)”。如果想使用正规的证书，可以去CA机构网站申请，个人可以用免费的StartSSL（网址：http://www.startssl.com）。

### Nginx 上的配置

{% highlight conf %}
server {
    #ssl参数
    listen              443 ssl;
    server_name         example.com;
    #证书文件
    ssl_certificate     server.crt;
    #私钥文件
    ssl_certificate_key server.key;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers         HIGH:!aNULL:!MD5;
}
{% endhighlight %}

### Apache 上的配置

1，修改httpd.conf去掉下面2行注释
{% highlight conf %}
#LoadModule ssl_module modules/mod_ssl.so
#Include conf/extra/httpd-ssl.conf  
{% endhighlight %}

2，修改extra/httpd-ssl.conf
{% highlight conf %}
Listen 443
SSLCipherSuite HIGH:MEDIUM:!aNULL:!MD5
<VirtualHost _default_:443>
    DocumentRoot "E:\wwwroot\web-php"
    ServerName localhost:443

    SSLEngine on
    SSLCertificateFile "D:/wamp/bin/apache/apache2.4.9/conf/server.crt"
    SSLCertificateKeyFile "D:/wamp/bin/apache/apache2.4.9/conf/server.key"
        <FilesMatch "\.(cgi|shtml|phtml|php)$">
            SSLOptions +StdEnvVars
        </FilesMatch>
        <Directory "D:/wamp/bin/apache/apache2.4.9/cgi-bin">
            SSLOptions +StdEnvVars
        </Directory>
</VirtualHost>
{% endhighlight %}

3，如果重启httpd报错，可以参考：https://my.oschina.net/xpbug/blog/197454#h3_5

