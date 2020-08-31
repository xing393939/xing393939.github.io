---
layout: post
title: Mysql 异步查询的实现
category: 技术
---

### 参考资料

1. [向facebook学习，通过协程实现mysql查询的异步化](http://www.bo56.com/%E9%80%9A%E8%BF%87%E5%8D%8F%E7%A8%8B%E5%AE%9E%E7%8E%B0mysql%E6%9F%A5%E8%AF%A2%E7%9A%84%E5%BC%82%E6%AD%A5%E5%8C%96/)
2. [协程 - 廖雪峰的官方网站](http://www.liaoxuefeng.com/wiki/001374738125095c955c1e6d8bb493182103fac9270762a000/0013868328689835ecd883d910145dfa8227b539725e5ed000)
2. [在PHP中使用协程实现多任务调度 - 风雪之隅](http://www.laruence.com/2015/05/28/3038.html)

### 方案一：mysqli + mysqlnd

php官方实现的mysqlnd中提供了异步查询的方法。分别是：<br />
mysqlnd_async_query 发送查询请求<br />
mysqlnd_reap_async_query 获取查询结果<br />
这样就可以不必每次发送完查询请求后，一直阻塞等待查询结果了。<br />

代码如下：
{% highlight php %}
<?php
$link1 = new mysqli('localhost', 'root', '', 'test');
$link2 = new mysqli('localhost', 'root', '', 'test');

$query1 = $link1->query("select sleep(1) as s1", MYSQLI_ASYNC);
$query2 = $link2->query("select sleep(1) as s2", MYSQLI_ASYNC);

$sql_result_array = [];
do {
    $read = $errors = $reject = [$link1, $link2];
    $re = mysqli_poll($read, $errors, $reject, 1);
    if (false === $re) {
        die('mysqli_poll failed');
    } elseif ($re < 1) {
        continue;
    }
    foreach ($read as $link) {
        $sql_result = $link->reap_async_query();
        $sql_result_array[] = $sql_result->fetch_array(MYSQLI_ASSOC);
        $sql_result->free();
    }
} while (count($sql_result_array) < 2);

print_r($sql_result_array);
{% endhighlight %}

### 方案二：协程 + mysqli + mysqlnd

协程我这里直接copy廖雪峰的理解

![](/static/image/async-mysql-query.png)

代码如下：
{% highlight php %}
<?php
function f1()
{
    $db = new db();
    $obj = $db->async_query('select sleep(1)');
    echo "f1 async_query \n<br />";
    yield $obj;
    $row = $db->fetch();
    echo "f1 fetch\n<br />";
    yield $row;
}

function f2()
{
    $db = new db();
    $obj = $db->async_query('select sleep(1)');
    echo "f2 async_query\n<br />";
    yield $obj;
    $row = $db->fetch();
    echo "f2 fetch\n<br />";
    yield $row;
}

$gen1 = f1();
$gen2 = f2();

$gen1->current();
$gen2->current();
$gen1->next();
$gen2->next();

$ret1 = $gen1->current();
$ret2 = $gen2->current();

var_dump($ret1);
var_dump($ret2);

class db
{
    static $links;
    private $obj;

    function getConn()
    {
        $host = '127.0.0.1';
        $user = 'root';
        $password = '';
        $database = 'test';
        $this->obj = new mysqli($host, $user, $password, $database);
        self::$links[spl_object_hash($this->obj)] = $this->obj;
        return self::$links[spl_object_hash($this->obj)];
    }

    function async_query($sql)
    {
        $link = $this->getConn();
        $link->query($sql, MYSQLI_ASYNC);
        return $link;
    }

    function fetch()
    {
        for ($i = 1; $i <= 5; $i++) {
            $read = $errors = $reject = self::$links;
            $re = mysqli_poll($read, $errors, $reject, 1);
            foreach ($read as $obj) {
                if ($this->obj === $obj) {
                    $sql_result = $obj->reap_async_query();
                    $sql_result_array = $sql_result->fetch_array(MYSQLI_ASSOC);
                    $sql_result->free();
                    return $sql_result_array;
                }
            }
        }
    }
}
{% endhighlight %}