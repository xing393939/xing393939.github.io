---
layout: post
title: PHP 与 Lua 对应的一个简单加解密算法
category: tech
---

### 参考资料

1. [lua 官方手册](http://www.lua.org/manual/5.1/manual.html)
2. [Very simple string Encryption](https://forums.coronalabs.com/topic/14032-very-simple-string-encryption-decryption/)
2. [Lua 学习笔记（三）—— 表达式](https://segmentfault.com/a/1190000002723520)

### 背景

2个服务，一个服务用php生成下载文件的地址，一个服务就是这个下载服务（纯用nginx）。现在这个下载服务为了防止盗链想到一个方案：php生成下载地址的时候带上一个加密参数（根据用户ip），下载服务nginx判断解密后的ip和当前访问ip是否一致，不一致则认为是盗链。这就需要php和nginx这边（lua语言）有一个一致的加解密算法，目前实现了一个不需要lua依赖其他模块的简单算法。


### lua算法

{% highlight lua %}
#!/usr/local/bin/lua
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
local str = "10.28.65.122";
local crypted = crypt(str,enc1)

print("Encryption: " .. crypted);
print("Decryption: " .. crypt(crypted,enc1,true));
{% endhighlight %}

### php算法

{% highlight php %}
<?php
function luaConvert($chars, $dist, $inv)
{
    $num = $inv ? -$dist : $dist;
    $ord = (ord($chars) - 32 + $num);
    if ($ord > 0) {
        $return = $ord % 95 + 32;
    } else {
        $return = 95 - (-$ord % 95) + 32;
    }
    return chr($return);
}

function luaCrypt($str, $k, $inv = false)
{
    $enc = '';
    $strLen = strlen($str);
    for ($i = 1; $i <= $strLen; $i++) {
        if ($strLen - $k[5] >= $i || !$inv) {
            for ($inc = 0; $inc <= 3; $inc++) {
                if ($i % 4 == $inc) {
                    $enc = $enc . luaConvert(substr($str, $i - 1, 1), $k[$inc + 1], $inv);
                    break;
                }
            }
        }
    }

    if (!$inv) {
        for ($i = 1; $i <= $k[5]; $i++) {
            $enc = $enc . chr(rand(32, 126));
        }
    }
    return $enc;
}

$enc1 = [0, 29, 58, 93, 28, 27];
$str = "10.28.65.122";
$cryptStr = luaCrypt($str, $enc1);
$decryptStr = luaCrypt($cryptStr, $enc1, true);

var_dump($cryptStr, $decryptStr);
{% endhighlight %}

### 小结

过程中初次了解lua语法，发现2个语法和php不一样的地方，抄录如下：

> 在 Lua 中数组索引值默认是以 1 为起始，但你也可以指定 0 开始。

> 在 Lua 中的取模运算总结为：a % b，如果 a，b 同号，结果取 a，b 绝对值的模；异号，结果取 b 绝对值与两者绝对值取模后的差。取模后值的符号与 b 相同。
