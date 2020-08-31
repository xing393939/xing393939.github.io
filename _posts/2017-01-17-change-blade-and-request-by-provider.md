---
layout: post
title: Laravel 框架如何获取 ip 和修改模板标签定界符
category: 技术
---

### 参考资料

1. [代理服务器下 Laravel 获取访客 IP 的方法](https://laravel-china.org/topics/2570)

### 代理服务器下获取访客 IP 的方法

现在一般项目的web服务器前面还有代理服务器，获取访客ip不能直接用`$_SERVER['REMOTE_ADDR']`，而是类似`$_SERVER['HTTP_X_FORWARDED_FOR']`，laravel 默认方法是：

~~~php
$request->setTrustedProxies(array('10.32.0.1/16'));
$ip = $request->getClientIp();
~~~

第一行是设置信任的代理服务器ip，其实可以在AppServiceProvider设置全局的，这样每次就只需要用`$request->getClientIp()`就可以获取了：

~~~php
public function boot()
{
    \Request::setTrustedProxies(['...']);
}
~~~

还有一个办法是在中间件里面设置：

~~~php
public function handle($request, Closure $next)
{
    $request::setTrustedProxies(['...']);
}
~~~

### 修改模板标签定界符

laravel 默认的模板标签是类似这样的{% raw %} {{ … }} {% endraw %}，有时候会和js的模板标签冲突，可以在AppServiceProvider去修改：

~~~php
public function boot()
{
    \Blade::setRawTags("[%", "%]");
    \Blade::setContentTags('[%', '%]');
    \Blade::setEscapedContentTags('[%%', '%%]');
}
~~~

这样一来模板标签就变成了类似`[% $tplVal %]`。（ps，发现github page的一个bug，上面那个代码如果把[标签换成{标签，github page就会build失败，具体见https://github.com/jekyll/jekyll/issues/5785。）
