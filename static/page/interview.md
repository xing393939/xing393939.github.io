---
layout: resume
title: 面试
---

## 学习计划

号|	星期|	技术	          |备注
22|	周五|	计算机网络	    |TCP/IP、http相关
23|	周六|	多线程和锁	    |Mq能做分布式锁？
24|	周日|	数据库/缓存	    |mysql左连接，mongodb查询优化，tiDB，mongodb和redis的集群配置
25|	周一|	数据结构和算法	|leetcode-cn.com
26|	周二|	Laravel源码阅读	|
27|	周三|	秒杀场景	      |
28|	周四|	Docker和Kubernetes 	  |
29|	周五|	JS的异步同步	  |call和apply
30|	周六|	Swoole	        |
31|	周日|	回顾工作经历	  |找技术亮点，解决了的难题

## 计算机基础书
1. 《深入理解计算机系统》（CSAPP）
1. 《UNIX环境高级编程》（APUE）https://www.zhihu.com/question/19939011/answer/27346626
1. 《UNIX 网络编程（卷 1）》https://book.douban.com/subject/4118578/
1. 《TCP/IP 详解（卷 1）》https://item.jd.com/11966296.html
1. 《高性能MySQL》https://book.douban.com/subject/23008813/

## 面试经验
1. [分享一下最近的面试题，都是大厂](https://learnku.com/articles/41140)
1. [PHP面试问答](https://github.com/colinlet/PHP-Interview-QA)
1. [笔试面试知识整理](https://hit-alibaba.github.io/interview/)
1. [今年行情这么差，到底如何进大厂](https://juejin.im/post/5e994427e51d45470a4ac8ea)
1. [技术博客笔记大汇总](https://github.com/yangchong211/YCBlogs)
1. [后台技术栈/架构师之路](https://github.com/frank-lam/fullstack-tutorial)
1. [技术面试必备基础知识](https://github.com/CyC2018/CS-Notes)
1. [2019年最新总结](https://github.com/0voice/interview_internal_reference)
1. [互联网一线大厂面试+学习指南](https://github.com/AobingJava/JavaFamily)

## 未读
1. [高可用 Elasticsearch 集群 21 讲](https://gitbook.cn/gitchat/column/5ce4ff9a308dd66813d92799)
1. [91 个常见的 Laravel 面试题和答案](https://mp.weixin.qq.com/s?__biz=MzI1ODY3NzQyOA==&mid=2247483807&idx=1&sn=0030e8188c13c798c23192689d4bf606)
1. [详解 Laravel 源码中优秀的设计模式](https://juejin.im/book/5a261d8f5188253ee45b4b21)
1. [开发者必备的 Docker 实践指南](https://juejin.im/book/5b7ba116e51d4556f30b476c)
1. [从0开始学架构](https://time.geekbang.org/column/article/6354)
1. [Elasticsearch核心技术与实战](https://time.geekbang.org/course/intro/197)，视频
1. [ZooKeeper实战与源码剖析](https://time.geekbang.org/course/intro/220)，视频
1. [Go语言从入门到实战](https://time.geekbang.org/course/intro/160)，视频
1. 百度云：PHP7高级进阶课程、PHP框架视频教程、JAVA高级面试题库

## 已读
1. [PHP进阶之路](https://segmentfault.com/ls/1650000011318558)
1. [Redis深度历险](https://juejin.im/book/5afc2e5f6fb9a07a9b362527)
1. [Mysql是怎么样运行的](https://juejin.im/book/5bffcbc9f265da614b11b731?referrer=5b5ffccaf265da0fa8675517)
1. [程序员的 MySQL 面试金典](https://gitbook.cn/gitchat/column/5d80aea449b2b1063b52990f)
1. [数据结构与算法之美-王争](https://time.geekbang.org/column/intro/100017301)
1. [算法面试通关40讲-覃超](https://time.geekbang.org/course/intro/100019701)
1. [算法训练营-覃超](https://u.geekbang.org/lesson/7)
1. [300分钟搞定数据结构与算法-拉钩](http://pc-shop.xiaoe-tech.com/appcCrwMYBx6232/video_details?id=v_5d0cb0b933aa3_T9za6CRT)

## 面向对象

## Web安全

## 分布式架构

分布式系统的CAP理论：节点是互联并共享数据的、涉及读写的（CAP关注的是数据而不是整个系统）。例如Memcache集群就不是CAP要讨论的。
* Consistence一致性：任意节点的数据一致
* Availability可用性：在合理的时间内返回合理的响应（不是错误和超时的响应）
* Partition tolerance分区容错性：出现网络分区后仍能继续工作（节点之间不能同步数据了）

## 数据结构和算法


数据结构

结构      | 搜索  | 插入删除 |leetcode | 备注
数组      | O(n)  | O(n)     |242      |基于下标的随机访问是O(1)
链表      | O(n)  | O(1)     |24/25/146|
栈        | O(n)  | O(1)     |20/739   |顺序栈(基于数组)、链式栈(基于链表)
队列      | O(n)  | O(1)     |239/347  |顺序队列(基于数组)、链式队列(基于链表)。239双端队列347优先队列
跳表      |O(logn)|O(logn)   |         |数据存在顺序链表中，辅以m条索引
散列表    | O(1)  |O(1)      |         |又称哈希表，数据存在数组中，出现散列冲突再用链表存
二叉搜索树|O(logn)|O(logn)   |230      |
B树       |O(logn)|O(logn)   |      |
红黑树    |O(logn)|O(logn)   |      |
AVL树     |O(logn)|O(logn)   |      |
前缀树    |       |          |212   |

数组排序算法

算法     |时间复杂度 |空间复杂度 |是否稳定 |leetcode |备注
冒泡排序 | O(n^2)    | O(1)      |√        |         |n次冒泡
插入排序 | O(n^2)    | O(1)      |√        |         |以第1个元素为基准点，排在它左边或右边
归并排序 | O(nlogn)  | O(n)      |√        |         |递归拆分成小段，小段排序后再合并
快速排序 | O(nlogn)  | O(1)      |×        | 912/215 |每次选一个数为基准，把数组分成两堆。不断递归
堆排序   | O(nlogn)  | O(1)      |×        | 973     |先建堆，再排序

二分查找算法

基于    | 查找  | 插入删除 |缺点
顺序数组|O(logn)|O(n)      |需要连续内存空间，频繁的插入删除不高效
散列表  |O(1)   |O(1)      |不能顺序遍历
跳表    |O(logn)|O(logn)   |空间复杂度是O(n)，适合空间换时间的场景
红黑树  |O(logn)|O(logn)   |程序难以实现

## 数据库/缓存

数据库
1. 行式数据库(SqlServer、Oracle、mysql)擅长随机读操作，不适合大数据；列式数据库(HBase)面向大数据环境下数据仓库而生的，https://www.jianshu.com/p/ad2533e5cfaa。

Mysql优化：
1. https://github.com/judasn/Linux-Tutorial/blob/master/markdown-file/Mysql-Optimize.md
1. https://tech.meituan.com/2014/06/30/mysql-index.html
1. https://draveness.me/mysql-innodb
1. https://xiaoxiami.gitbook.io/xiami/
1. https://mengkang.net/958.html
1. 不要用Mysiam引擎，不支持事务，是表锁
1. 要有顺序递增的主键，随机主键会导致聚簇索引树频繁分裂，随机IO增多；类型范围要适中；char代替varchar；大文本单独分离；索引不宜过多。
1. 没有索引的更新会导致表锁

Mysql的查询过程
1. 客户端发送一条查询给服务器； 
1. 服务器先会检查查询缓存，如果命中了缓存，则立即返回存储在缓存中的结果。维护缓存开销太大，从MySQL 5.7.20开始，不推荐使用查询缓存； 
1. 服务器端进行SQL解析、预处理，再由优化器生成对应的执行计划； 
1. MySQL根据优化器生成的执行计划，调用存储引擎的API来执行查询； 
1. 将结果返回给客户端。 

Mysql事务并发执行遇到的问题：
1. 脏写：数据在一个事务中修改未提交，另一个事务把它修改了
1. 脏读：数据在一个事务中修改未提交，另一个事务读到修改后的值
1. 不可重复读：数据在一个事务中修改且提交了，另一个事务再次读能读到最新值。多次读取一条记录，发现结果不一样。
1. 幻读：多次读取一个范围内的记录，发现结果不一样（记录增多或减少也算）。
1. 不可重复读侧重表达读-读，幻读则是读-写，用写来证实读的是鬼影（https://www.zhihu.com/question/47007926/answer/222348887）。
1. 严重性：脏写 > 脏读 > 不可重复读 > 幻读

Mysql四种隔离级别：

隔离级别	      |脏读	|不可重复读	|幻读
READ UNCOMMITTED|√ |√ | √
READ COMMITTED  |	 |√ | √
REPEATABLE READ*|	 |  | √
SERIALIZABLE    |	 |  | .

Mysql日志类型：
1. 错误日志(hostname.err)，如数据文件加载不正确或权限不正确
1. 查询日志，记录curd语句
1. 慢日志
1. redo log，属于Innode引擎，为了灾难恢复用，空间是固定的会用完
1. undo log，为了事务回滚用
1. bin log(mysql-bin.000001)，属于Server层的，主从同步，恢复时间点

InnoDB的表空间知识总结：
* 区（extent）= 64页 = 1M。一条XDES Entry记录表示一个区。区有四个状态：
  1. FREE，表示空闲的区
  1. FREE_FRAG，表示有剩余空间的碎片区
  1. FULL_FRAG，表示没有剩余空间的碎片区
  1. FSEG，表示附属于某个段的区
* 碎片区(直属于表空间)有三个链表：FREE链表、FREE_FRAG链表、FULL_FRAG链表。
* 普通区(直属于段)也有三个链表：FREE链表、NOT_FULL链表、FULL链表。
* 段（segment）。一个索引有2个段，一个存非叶子节点，一个存叶子节点。一个INODE Entry记录表示一个段。
* 组 = 256区 = 256M。表的第1组前三页是FSP_HDR页、IBUF_BITMAP页、INODE页。其他组的前2页是XDES页、IBUF_BITMAP页。
* FSP_HDR页主体是存XDES Entry记录，File Space Header部分存：
  1. List Base Node for FREE 碎片区链表
  1. List Base Node for FREE_FRAG 碎片区链表
  1. List Base Node for FULL_FRAG 碎片区链表
  1. List Base Node for SEG_INODES_FULL INODE页链表
  1. List Base Node for SEG_INODES_FREE INODE页链表
* XDES页主体是存XDES Entry记录
* IBUF_BITMAP页主体是存Change Buffer相关的内容
* INODE页主体是存INODE Entry记录。每条记录有三个链表：
  1. List Base Node for FREE 普通区链表
  1. List Base Node for NOT_FULL 普通区链表
  1. List Base Node for FULL 普通区链表

InnoDB共有七种类型的锁：共享锁/独占锁，意向锁，插入意向锁，记录锁，间隙锁，临键锁，自增锁。
1. 行锁场景：教室的自习和维修
1. S锁(表锁)场景：领导参观教学楼，可以自习不能维修
1. X锁(表锁)场景：统考要用教学楼，不能自习不能维修
1. 意向锁仅仅是为了后续加表锁时快速判断用的，因为加表锁前要保证没有行锁的存在
1. 插入意向锁，它并不属于意向锁而属于间隙锁，意向锁是表锁而插入意向锁是行锁（https://juejin.im/post/5b865859e51d4538e331ae9a）。
1. 记录锁、间隙锁、临键锁都是排它锁。SQL后加FOR UPDATE表示加了记录锁。临键锁的主要目的是为了避免幻读（https://zhuanlan.zhihu.com/p/48269420）。
1. 自增锁，表锁，一个事务insert操作时，其他事务的insert必须等待，以便第一个事务插入的行，是连续的主键值。

InnoDB的其他锁
1. 元数据锁：执行DDL语句(ALTER、DROP)时CURD语句会阻塞，执行CURD语句时DDL语句会阻塞
1. 全局锁，对整个数据库加锁，方便备份数据库时，可读但是不可写

InnoDB目前定义了4种行格式：
1. COMPACT行格式
1. Redundant行格式，相比COMPACT，存储都是定长字节，char字段不会产生碎片
1. Dynamic和Compressed行格式类似于COMPACT行格式，不过在在处理行溢出数据时不会存储前768个字节，而是都用其他页存储
1. Compressed行格式会采用压缩算法对页面进行压缩
1. 一个页一般是16KB，一个页中至少存放两行记录，当记录中的数据太多，当前页放不下的时候，会把多余的数据存储到其他页中，这种现象称为行溢出。

无法命中索引的一些操作
1. 查询条件中使用不等于操作符!=
1. 非前缀使用like like '%gaga%'.
1. or操作符必须每个字段都建立索引
1. where语句中有数学运算或者函数.
1. 联合索引里既有in又有order by，或者是WHERE other=1 ORDER BY 联合索引(other不在联合索引里面)

Explain查看执行计划：
1. type：const用到唯一索引；ref用到非唯一索引，index用到索引但是有where或group by；all全表扫描
1. possible_keys：可能的索引
1. key：用到的索引
1. key_len：索引键的字节长度，可用来确认联合索引中用到的列的数目
1. rows： MySQL 认为它执行查询时必须检查的行数
1. extra：Using index condition，覆盖索引，但需要回表；Using index，覆盖索引；Using where，需在服务器层过滤或需在[索引中过滤](https://www.oschina.net/question/232911_2307882)；Using filesort，不能用索引来排序，需在内存中(或磁盘中)排序；Using temporary，需要创建临时表来存储结果。

连接查询：
1. 有四种，INNER JOIN(等价于from t1,t2，两表的交集)、LEFT OUTER JOIN(以左表为基准)、RIGHT OUTER JOIN(以右表为基准)、FULL OUTER JOIN(两表的并集)，https://www.liaoxuefeng.com/wiki/1177760294764384/1179610888796448；
1. 驱动表只查一次，得到N条结果再与被驱动表连接，被驱动表要查N次

MongoDB：
1. [MongoDB 分片集群搭建之分片选择分享](https://yansongda.cn/2018/03/15/mongodb-sharding-clustering-share-about-chosing-sharding-key/)
1. [Mongo实战-分片集群的查询与索引](https://blog.csdn.net/wanght89/article/details/77942852)
1. [快2020年了，赶紧收藏起MongoDB面试题](https://juejin.im/post/5d9ee1ce5188255820783df3)
1. [MongoDB集群之分片技术应用-视频](https://www.imooc.com/learn/501)
1. [MongoDB 副本集的原理、搭建、应用](https://www.cnblogs.com/zhoujinyi/p/3554010.html)
1. 副本集：Primary、Secondary、Arbiter，可以动态增删节点，程序连接URI是所有节点ip；当主节点挂了，需要10s中断重新选举，写不可用，读可用。
1. 分片集：mongos路由、config配置、shard分片，程序连接URI是所有mongos的ip；查询尽量避免跨分片查询
1. 分片键的选择：范围分片、Hash分片、范围+Hash分片

其他数据库：
1. [既生 Redis 何生 LevelDB](https://juejin.im/post/5c22e049e51d45206d12568e)
1. LevelDB，谷歌出的持久化NoSQL数据库，高效的随机写和顺序写/读，适合写多读少的场景
2. RocksDB，Facebook出品，沿用了 LevelDB 的先进技术架构的同时还解决了 LevelDB 的一些短板
3. TiDB，TiDB 是 PingCAP 公司基于谷歌提出的NewSQL概念开发的，兼容Mysql协议

Redis：
1. [Redis 高级主题之布隆过滤器](https://juejin.im/post/5cfd060ee51d4556f76e8067)
1. [天下无难试之Redis面试刁难大全](https://mp.weixin.qq.com/s/-y1zvqWEJ3Tt4h39Z0WBJg)
1. [Redis 深度历险-老钱](https://juejin.im/book/5afc2e5f6fb9a07a9b362527)
1. [什么是分布式锁-程序员小灰](https://juejin.im/post/5b16148a518825136137c8db)
1. 数据结构：String、Hash、List、Set、ZSet、订阅(订阅者需要阻塞的读)、Geo(附近的人)、HyperLogLog(统计uv)
1. HyperLogLog：有误差的统计uv，pfadd、pfcount。不能作布隆过滤器，因为如果判断不存在就加入集合了。
1. 位图：String类型的字节存储，如字符h表示1 2 4位置为1。可以用setbit、getbit、bitcount、bitop
1. Redis模块：BloomFilter
1. 分布式悲观锁：setnx不是原子操作，应该用set(SET if Not exists)，并设置expire防止锁不释放。
1. 分布式乐观锁：先watch再multi/exec，exec的时候如果watch的值被其它客户端改变，则exec失败，[redis的事务和watch](https://www.jianshu.com/p/361cb9cd13d5)
1. 扫描keys：别用keys指令，用scan，redis是单线程的，用keys会阻塞，scan可以无阻塞的执行，但key可能会有重复。
1. 异步队列：rpush进，lpop出，没有消息的时候可以sleep下或者用blpop阻塞读。也可以用订阅，但如果订阅者下线消息会丢失，应该用专业的MQ
1. 持久化：bgsave全量备份到rdb文件，aof日志是增量备份，重启的时候优先用aof日志恢复(rdb文件恢复更快)。aof文件过大恢复时间过长怎么办？Redis会定期做aof重写，压缩aof文件日志。Redis4.0将bgsave的全量和aof的增量做了融合处理，恢复更快。aof日志sync属性可以设置为1s，最多丢失1s的数据。bgsave的原理是fork一个子进程，然后快照备份。
1. 令牌桶算法：每秒放100个令牌，如果拿光了就拒绝服务；漏桶算法：请求先进桶再漏出，如果桶满了就拒绝服务。
1. 哨兵Sentinel：实现了自动化的主从切换。缺陷是写操作是单机。
1. 集群Cluster：分布式的，可以分摊写压力。每个节点保存全量的槽位配置信息，客户端访问任意一个节点，通过moved、asking纠错指令找到正确的节点。例如三主三从，主节点挂了从节点升级为主节点。
1. 过期策略：惰性删除和定时删除。每秒进行十次过期扫描，每次最长时间25ms。如果同时过期的key太多，客户端的请求将会等待至少 25ms 后才会进行处理，造成卡顿，所以key的过期尽量随机一点。4.0惰性删除用unlink和flushall async命令可以异步线程删除，不阻塞主线程，[掘金小册-过期策略](https://juejin.im/book/5afc2e5f6fb9a07a9b362527/section/5b4c42405188251b3950d251)。

## Docker和Kubernetes
1. [十分钟带你理解Kubernetes核心概念](http://dockone.io/article/932)
1. [一个创业公司的容器化之路](http://dockerone.com/article/2839)

## http相关：
* WebSocket 协议：浏览器可以在http 1.1的header加上Upgrade: WebSocket协商升级为WebSocket长连接
* http 长连接：建立连接后夯住90秒，微博的IM方案

## 配置中心zookeeper
服务者启动时往zookeeper注册配置，zookeeper和消费者建立长连接实时推送配置

通过zookeeper如何做服务存活检测：
* 服务提供者主动发心跳，或注册中心向服务提供者发心跳。
* 服务提供者的服务改变，主动推送给注册中心。
* 临时节点：不同的进程都在ZK的一个指定节点下创建临时子节点，不同的进程直接可以根据这个临时子节点来判断对应的进程是否存活。

## TCP/IP：
1. https://hit-alibaba.github.io/interview/basic/network/TCP.html
1. SYN 是Synchronous，表示建立连接
1. ACK是Acknowledge，表示响应
1. FIN是Finish，表示断开
1. 3次握手是Z字型，一方收到seq后加1并返回。
1. 双方均可主动发起4次挥手，>加<。为什么是4次？因为左边虽然已经关闭了，但是右边可能还有数据要发送。
1. SYN洪水攻击，伪造大量ip和第一次握手，由于ip是伪造的无法进行第二次握手，导致服务器大量的半连接SYN_RCVD。解决办法：减少半连接的timeout，增加最大半连接数，SYN cookies技术（[SYN Cookies 技术](https://blog.csdn.net/cui918/article/details/53286080)和[深入浅出TCP中的SYN-Cookies](https://segmentfault.com/a/1190000019292140)）。

ASCII码是美国指定的，只支持单字符。Unicode则是各国字符的总集合。UTF-8是Unicode的一种实现。https://www.cnblogs.com/liupp123/articles/8023861.html

## Python 相关：
* [Python3文档](https://docs.python.org/zh-cn/3/index.html)
* [Python之旅-基于2.7](https://wiki.jikexueyuan.com/project/explore-python/Standard-Modules/collections.html)
* [Python面试必须要的15个问题](https://codingpy.com/article/essential-python-interview-questions/)
* 变量的赋值，只是表示让变量指向了某个对象，并不表示拷贝对象给变量；而一个对象，可以被多个变量所指向。
* 可变对象（列表，字典，集合）的改变，会影响所有指向该对象的变量。
* 不可变对象（字符串，整型，元组），所有指向该对象的变量的值总是一样的，也不会改变。但是通过某些操作（+= 等等）更新不可变对象的值时，会返回一个新的对象。
* 函数不宜用可变变量作默认参数，第二次调用会利用上一次的对象

1. GIL（CPython 内存管理不是线程安全的），线程在执行过程中必须先获取GIL锁，遇到IO阻塞可以释放锁，多线程实质上只有一个线程在跑。使用多进程是可以利用多CPU资源的。
1. 猴子补丁：datetime.datetime.now = lambda:2019，主要是方便测试
1. *args，**kwargs，一个是普通参数，一个是关键字参数
1. 普通方法第一个参数必须是self，@classmethod第一个参数必须是cls, @staticmethod无要求。普通方法内部可以通过self.func来调用类方法和静态方法
1. @property把方法当作成一个属性来访问，属性被修改时触发@score.setter
1. threading.local()这个方法是用来保存一个全局变量，但是这个全局变量只有在当前线程才能访问。
1. 并发和并行，并行才是同一时刻同时发生，并行适合CPU密集型的程序。
1. concurrent.futures，创建线程池或进程池，线程池是并发的，同一时刻只有一个线程在跑，进程池是并行的。
1. asyncio，如果并发场景IO比较耗时就用协程，协程是单线程的，所以不会有线程安全问题。
