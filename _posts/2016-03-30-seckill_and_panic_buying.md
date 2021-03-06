---
layout: post
title: 电商秒杀与抢购场景
category: 技术
---

### 参考资料
1. [秒杀业务架构优化之路-58同城沈剑](http://mp.weixin.qq.com/s?__biz=MzI4NzE1NTYyMg==&mid=402348782&idx=1&sn=8fb1a9c255e50ebeb1c37c92af33895e)
2. [Web系统大规模并发——电商秒杀与抢购-腾讯徐汉彬](http://www.csdn.net/article/2014-11-28/2822858)
3. [笨法玩秒杀-火丁笔记](http://huoding.com/2013/05/19/257)
4. [淘宝丁奇：秒杀场景下MySQL的低效的原因和改进](http://wenku.it168.com/d_000930719.shtml)

正如火丁笔记说的，资料4淘宝的方法是通过修改MySQL源代码在数据层实现的，对芸芸众生的我们而言，简直是一个无法逾越的技术门槛！那么是否可以在应用层实现呢？

### 12306的抢票场景
1. 客户端：产品层面，用户点“购票”按钮后就禁用按钮，防止再次提交；JS层面，x秒内只能请求一次。
2. 站点层（Nginx、Varnish）：防止程序员写for循环调用接口，用内存缓存限制访问频度，x秒内到达站点层的请求，均返回同一页面。
3. 服务层：产品层面，分时间段卖票，分摊流量；程序层面，做请求队列，只透过有限请求到数据库层，资料3提供了一种用redis实现请求队列的方法。或者乐观锁的思路，下面会详细讲。
4. 数据库：前面做好拦截，数据库层就没有压力了。

在站点层或者服务层处理后台失败的话，也不要重试，其中架构设计原则之一是“fail fast”。

### 乐观锁思路
处理秒杀场景的时候，在服务层用请求队列虽然好，系统处理完一个队列内请求的速度根本无法和疯狂涌入队列中的数目相比。也就是说，队列内的请求会越积累越多，最终Web系统平均响应时候还是会大幅下降，系统还是陷入异常。乐观锁，是相对于“悲观锁”采用更为宽松的加锁机制，大都是采用带版本号（Version）更新。实现就是，这个数据所有请求都有资格去修改，但会获得一个该数据的版本号，只有版本号符合的才能更新成功，其他的返回抢购失败。这样的话，我们就不需要考虑队列的问题，不过，它会增大CPU的计算开销。但是，综合来说，这是一个比较好的解决方案。

有很多软件和服务都“乐观锁”功能的支持，使用redis的watch机制或者memcached的CAS操作，会自动隐含一个version的。

### 重启与过载保护
如果系统发生“雪崩”，贸然重启服务，是无法解决问题的。最常见的现象是，启动起来后，立刻挂掉。这个时候，最好在入口层将流量拒绝，然后再将重启。如果是redis/memcache这种服务也挂了，重启的时候需要注意“预热”，并且很可能需要比较长的时间。另外出现故障将过载保护设置在CGI入口层，快速将客户的直接请求返回。

### 防止机器人刷票
例如微博中有转发抽奖的活动，如果我们使用几万个“僵尸号”去混进去转发，这样就可以大大提升我们中奖的概率。这种可以控制IP请求频率，或者用二维码，最核心的追求，就是分辨出真实用户。而如果对方不断的变换ip来请求，这个时候，通常只能通过设置业务门槛高来限制这种请求了，例如限制参与秒杀的账号等级。或者通过账号行为的”数据挖掘“来提前清理掉它们。