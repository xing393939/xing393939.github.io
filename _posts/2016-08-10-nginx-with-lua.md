---
layout: post
title: Nginx 与 Lua 的配合使用
category: 技术
---

### 参考资料

1. [使用ngx_lua构建高并发应用（1）](http://blog.csdn.net/chosen0ne/article/details/7304192)
2. [Nginx与Lua](http://huoding.com/2012/08/31/156)
2. [how to urldecode a request_uri string in Lua](http://stackoverflow.com/questions/20282054/how-to-urldecode-a-request-uri-string-in-lua)

### 背景

接上文[php与lua对应的一个简单加解密算法](/tech/2016/08/05/php-lua-symmetric-crypt.html)，实现了php和lua对应的加解密，现在需要在nginx上去配置它，简单实现如下：

{% highlight nginx %}
location /auth {
    access_by_lua '
        local function convert( chars, dist, inv )
            return string.char( ( string.byte( chars ) - 32 + ( inv and -dist or dist ) ) % 95 + 32 )
        end

        local function crypt(str,k,inv)
            local enc= "";
            for i=1,#str do
                if(#str-k[5] >= i or not inv)then
                    for inc=0,3 do
                        if(i%4 == inc)then
                            enc = enc .. convert(string.sub(str,i,i),k[inc+1],inv);
                            break;
                        end
                    end
                end
            end
            if(not inv)then
                for i=1,k[5] do
                    enc = enc .. string.char(math.random(32,126));
                end
            end
            return enc;
        end

        local enc1 = {29, 58, 93, 28, 27};
        if ngx.var.remote_addr == crypt(ngx.unescape_uri(ngx.var.arg_ip),enc1,true) then
            return
        else
            Ngx.exit(ngx.HTTP_FORBIDDEN)
        end
    ';
    echo 'you can download it ...';
}
{% endhighlight %}

上面主要实现的是取下载url的ip参数，解密后和请求来源ip做对比，一致的话则可以下载，不一致则返回500错误。

### 知识点

nginx中使用lua需要nginx安装lua模块nginx-lua-module，上面代码中还用到了nginx的echo模块echo-nginx-module。用lua原生语言开发web项目还是很欠缺的，好在lua-nginx-module又提供了很多api供使用。例如lua原生语言没有自带支持urlencode，lua-nginx-module就提供了ngx.escape_uri。lua-nginx-module全部api文档见[Nginx API for Lua](https://github.com/openresty/lua-nginx-module#nginx-api-for-lua)。本次学习nginx的lua模块使用记录知识点如下：

> 设置nginx变量使用set_by_lua和set_by_lua_file；访问控制使用access_by_lua和access_by_lua_file；URL重写使用rewrite_by_lua和rewrite_by_lua_file；返回相应使用content_by_lua和content_by_lua_file。

> Nginx API被封装ngx和ndk两个package中。例如ngx.var.remote_addr访问的是nginx的变量$remote_addr即访客ip，ngx.var.arg_ip访问的是nginx的url上ip参数。


