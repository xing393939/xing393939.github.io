---
layout: post
title: linux 下使用 iptables 端口映射或者绑定网卡的方式绑定 ip 
category: linux
---

### 适用场景
在本地开发过程中，由于连接数据库和redis的ip和线上的ip不一致，而这些ip配置一般也会存在于svn中，svn提交的时候还需要勾选排除掉这些配置文件。如果我们把线上的ip绑定变成访问本机的话，就不用每次都这么麻烦了。

### 方法一，用iptables完成端口映射
{% highlight bash %}
#一，开启linux的数据转发功能
echo "1" > /proc/sys/net/ipv4/ip_forward #或者编辑/etc/sysctl.conf
sysctl -p #使数据转发功能生效

#二，清空原有nat配置和查看命令
iptables -t nat -F
iptables -t nat --list

#三，将192.168.7.222:6379和192.168.4.3:6379的请求都变成请求本地
iptables -t nat -A OUTPUT -p tcp -d 192.168.7.222 --dport 6379 -j DNAT --to 127.0.0.1:6379
iptables -t nat -A OUTPUT -p tcp -d 192.168.4.3 --dport 6379 -j DNAT --to 127.0.0.1:6379
{% endhighlight %}

### 方法二，绑定网卡
先看网卡配置情况
{% highlight bash %}
  eth0    Link encap:Ethernet  HWaddr 00:0C:29:5A:76:30
            inet addr:192.168.4.19  Bcast:192.168.7.255  Mask:255.255.248.0
            UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
{% endhighlight %}

则这样配置
{% highlight bash %}
ifconfig eth0:0 192.168.4.3 netmask 255.255.248.0 up
ifconfig eth0:1 192.168.7.222 netmask 255.255.248.0 up
{% endhighlight %}