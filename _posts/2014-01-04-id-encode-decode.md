---
layout: post
title: 整型 id 加密成定长字母数字组合的字符串
category: 技术
---

### 适用场景
我最开始看到网站使用这种思路的是蘑菇街，蘑菇街的每一个分享的商品页面，url的id号就是6位的字母数字组合，这样可以避免竞争对手通过id的自增推算出自己网站大概的运营情况。

### 我的实现代码

{% highlight php %}
<?php
$a = encode(2147483642);
echo $a, '<br/>';
$b = decode($a);
echo $b, '<br/>';

$time = microtime(1);
for ($i = 0; $i < 100000; $i++)
    md5(hash('md5', "$i"));
echo microtime(1) - $time, ': hash/md5<br>';

$time = microtime(1);
for ($i = 0; $i < 100000; $i++) {
    $s = decode(encode($i));
}
echo microtime(1) - $time, ': jia/jie<br>';

function encode($id)
{
    if ($id > 100) {
        $id = (string)$id;
        $len = strlen($id) - 1;
        $id = $id{0} . $id{$len} . substr($id, 2, -1) . $id{1};
    }
    $id += 60512868;
    $str = base_convert($id, 10, 36);
    $l = strlen($str);
    $str = substr($str, 0, $l - 2) . xchange(substr($str, -2, 1)) . xchange(substr($str, -1));
    return $str;
}

function decode($str)
{
    $l = strlen($str);
    $str = substr($str, 0, $l - 2) . xchange(substr($str, -2, 1), 1) . xchange(substr($str, -1), 1);
    $id = base_convert($str, 36, 10);
    $id -= 60512868;
    if ($id > 100) {
        $id = (string)$id;
        $len = strlen($id) - 1;
        return $id{0} . $id{$len} . substr($id, 2, -1) . $id{1};
    } else {
        return $id;
    }
}

function xchange($s, $decode = 0)
{
    if ($decode) {
        $str = "ytuvsrqzxwilng7fed2cbajk1096h53m8o4p";
    } else {
        $str = "poiuytrewqlkjhgfdsamnbvcxz6541239807";
    }
    $s = base_convert($s, 36, 10);
    return $str{$s};
}
?>
{% endhighlight %}