---
layout: post
title: 分布式方案：取模和一致性 Hash
category: 技术
---

### 参考文章
1. [订单系统水平分库的实践之路以及关键步骤](http://blog.csdn.net/qq_24690761/article/details/50990875)
2. [分布式mysql的美丽说实现](http://wenku.baidu.com/view/7f85b41d55270722192ef78e?pcf=2)
3. [利用一致性哈希水平拆分Mysql单表](https://cnodejs.org/topic/5502a23573263b0e4eef9b85)
4. [大众点评订单分库分表实践之路](http://mp.weixin.qq.com/s?__biz=MzI4NTA1MDEwNg==&mid=402525487&idx=1&sn=9c1bccf857a624dedec743f54c66a98c)

### 数据库和缓存的分布式
本次研究是针对传统数据库如mysql，oracle和缓存服务如memcache和redis。数据库在优化性能瓶颈的常用方法是垂直分表，即拆分字段。而水平分库分表则和缓存服务的水平扩展类似，需要面临如何在一个正在运行的系统里面进行这些改变，而不影响系统的正常运行的情况。我们希望能设计好这些后能够一劳永逸，此后即便需要二次sharding的时候也能很轻松的实现。我个人目前学习到二种方法如下：

### 取模
以mysql为例，起初设计2个sharding库（A和B），每次以id mod 2来查询。而后随着业务的扩张，2台sharding已经无法支撑服务，则增加至2x2台。如何在线上环境平滑的完成这次2次sharding呢？

1. 四台db重新命名，以前的A和B改为A1和B1，新增的2台叫A2和B2；
2. 线上还是使用A1和B1，只是往A1写的时候也要往A2写，往B1写的时候也要往B2写；
3. 写脚本：A1同步数据给A2，B1同步数据给B2；
4. 当A1和A2，B1和B2数据完全一致的时候，开始使用id mod 2 再mod 2来使用此4台db；
5. 写脚本清除4台db的冗余数据。

### 一致性hash
第一种方法固然很好，但是db数每次都是以2倍数增加不太灵活。比如目前是3台sharding，但是为了节约成本或者资源有限的情况下，只能增加2台sharding，这个时候怎么办呢？这个时候hash的一致性就可以帮上忙了。看下面这个nodejs的例子，主要是保证之前的3台sharding不会有很大动静，而主要是把数据平摊到新的2台上：

1，5万用户数据通过一致性哈希算法存储在3台服务器上，然后用户数据5万不改变，新增加2台sharding，查看新的5台sharding的用户数据存储情况以及计算移动的数据条数。
{% highlight javascript %}
var HashRing = require('hashring');
var ring = new HashRing([
	'127.0.0.1',
	'127.0.0.2',
	'127.0.0.3', 
  ], 'md5', {
	'max cache size': 10000
  });

var record = {
	  '127.0.0.1':0,
	'127.0.0.2':0,
	'127.0.0.3':0
};
var userMap = {}
  
for(var i=1; i<=50000; i++){
	var userIdStr = i.toString();
	var server = ring.get(userIdStr);
	userMap[userIdStr] = server;
	record[server]++;
}

console.log(record);

//新增加2个sharding节点
var record2 = {
	'127.0.0.1':0,
	  '127.0.0.2':0,
	  '127.0.0.3':0,
	'127.0.0.4':0,
	'127.0.0.5':0,
};
ring.add('127.0.0.4').add('127.0.0.5')

var moveStep = 0;
for(var i=1; i<=50000; i++){
	var userIdStr = i.toString();
	var server = ring.get(userIdStr);
	//当用户的存储server改变，则计算移动
	if(userMap[userIdStr] && userMap[userIdStr] != server){
		userMap[userIdStr] = server;
		moveStep++;
	}
	record2[server]++;
}
console.log(record2);
console.log('move step:'+moveStep);
{% endhighlight %}

2，5万用户数据，存储在3台服务器上的数目：
{% highlight javascript %}
{ '127.0.0.1': 15238, '127.0.0.2': 16448, '127.0.0.3': 18314 }
{% endhighlight %}

3，当我们sharding增加到5台，存储在5台服务器上的数目：
{% highlight javascript %}
{ '127.0.0.1': 8869,
  '127.0.0.2': 9972,
  '127.0.0.3': 10326,
  '127.0.0.4': 10064,
  '127.0.0.5': 10769 }
{% endhighlight %}

### PS一下
大众点评网是用的取模这种方式去做的，他的唯一id的生成规则可以借鉴一下，即时间戳+用户标识码+随机数，生成的id依然是保持自增。当然还有一种分布式方案可以采用数值范围的方法，比如用户Id为1-9999的记录分到第一个库，10000-20000的分到第二个库，以此类推。