---
layout: post
title: 查看 MySQL 是否支持 InnoDB 引擎以及不支持的解决办法
category: 技术
---

转自(http://blog.is36.com/install_mysql_innodb/)

在mysql控制台下输入：
SHOW variables like "have_%"

显示结果中会有如下3种可能的结果：
<pre>
have_innodb YES
have_innodb NO
have_innodb DISABLED
</pre>

这3种结果分别对应：
<pre>
已经开启InnoDB引擎
未安装InnoDB引擎
未启用InnoDB引擎
</pre>

> 针对第二种未安装，只需要安装即可；针对第三种未启用，则打开mysql配置文件，找到skip-innodb项，将其注释，之后重启mysql服务即可。
