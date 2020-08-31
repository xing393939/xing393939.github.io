---
layout: post
title: PHP 缓存器 Opcache 的使用
category: 技术
---


### 参考资料

1. [深入理解PHP Opcode缓存原理](https://blog.linuxeye.com/361.html)
2. [PHP 应该怎么选择缓存器](https://m.aliyun.com/bbs/read/255932.html)
3. [如何正确发布PHP代码](http://huoding.com/2016/05/27/515)
4. [一个关于Zend O+的小分享](http://www.laruence.com/2013/11/11/2928.html)
5. [Best Zend Opcache Settings/Tuning/Config](https://www.scalingphpbook.com/blog/2014/02/14/best-zend-opcache-settings.html)

### 为什么要用Opcache

Opcache是php的字节码缓存模块。PHP 5.5以后内建了Opcache，Opcache的加速原理是把编译后的字节码存储在内存里面，避免重复编译PHP所造成的资源浪费。字节码缓存方案有：Apcu（原APC），Xcache，Zend Opcache（原Zend Optimizer+），WinCache，eaccelerator等。

以下是他们的对比：

1. APC 是将要被遗弃的项目, PHP 5.5 都不支持, 而在 PHP 5.5 和 5.6 版本, Opcache 是默认内建的, 并且支持 5.2 到 5.4 的安装.
2. eaccelerator 官方只支持到PHP 5.3
3. XCache 目前支持到PHP 5.6了
4. WinCache 目前支持到PHP 5.6了，不过仅支持windows平台IIS服务器

对比XCache，因为Opcache是php内建的，话说也没有纠结的了，直接Opcache。

### 更新缓存

一个正确实现的发布系统至少应该支持原子发布。假设在发布代码期间，opcode cache 或者 realpath cache 里的数据出现过期，那么就会出现一部分缓存是旧文件，一部分缓存是新文件的非原子发布的情况，为了避免出现这种情况，我们应该保证缓存过期时间足够长，最好是除非我们手动刷新，否则永远不过期，对应到配置上就是：关闭 apc.stat、opcache.validate_timestamps 配置，设置足够大的 realpath_cache_size、realpath_cache_ttl 配置。

如果需要手动重置 opcode cache，需要注意的是因为它是基于 SAPI 的概念，所以不能直接在命令行下调用 apc_clear_cache 或者 opcache_reset 方法来重置缓存，当然办法总是有的，那就是使用 [CacheTool](http://gordalina.github.io/cachetool/) 在命令行下模拟 fastcgi 请求。

还有一个问题。因为在缺省情况下 opcache.revalidate_path 是关闭的，此时会缓存符号链接的值，这会导致即便软链接指向修改了，也永远无法生效，所以在使用 zend opcode 的时候，如果使用了软链接，视情况可能需要把 opcache.revalidate_path 激活。具体方案参考[如何正确发布PHP代码](http://huoding.com/2016/05/27/515)。

### Opcache参考配置（线上）

{% highlight bash %}
; 开关打开
opcache.enable=1

; 可用内存, 酌情而定, 单位 megabytes
opcache.memory_consumption=256

; 最大缓存的文件数目, 命中率不到 100% 的话, 可以试着提高这个值
opcache.max_accelerated_files=5000

; 线上环境不检查文件修改，每次deploy的时候清缓存
opcache.validate_timestamps=0
opcache.revalidate_freq=0

; interned string 的内存大小, 也可调
opcache.interned_strings_buffer=8

; 是否快速关闭, 打开后在PHP Request Shutdown的时候回收内存的速度会提高
opcache.fast_shutdown=1

; 不保存文件/函数的注释
opcache.save_comments=0
{% endhighlight %}
