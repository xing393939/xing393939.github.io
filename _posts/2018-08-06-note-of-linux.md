---
layout: post
title: Linux 常用命令
category: tech
---

#### 基础常用
{% highlight bash %}
#打包和解压
tar zvcf package.tar.gz my_dir
tar zvxf package.tar.gz
zip package.zip -r my_dir
unzip package.zip -d .

#查找文件
whereis my_file
find /path -name my_*
find /path |grep my_

#查找文件夹下的文件包含的字符串
grep my_string -r /path
find /path |xargs grep my_string

#替换字符串
sed -i 's/old_string/new_string/g' my_file
sed -i 's/old_string/new_string/g' |grep old_string -rl /path

#scp 传输
scp -r user@172.18.254.119:/home/user/theme /home/www

#awk 统计日志 ip top10：
zcat access.log.gz|awk '{print $1}'|sort|uniq -c|sort -nr|head -10

#awk 多个分隔符
echo client list |redis-cli |awk -F[=:] '{print $2}'|sort|uniq -c|sort -nr|head -10
{% endhighlight %}

#### shell 脚本常用
{% highlight bash %}
#只保留a-z和.
package=`echo $package |tr -d -c 'a-z .'`
#剔除换行符
package=`echo $package |tr -s "[\n]"`
{% endhighlight %}

#### 运维常用
{% highlight bash %}
# 查看机器端口服务 
netstat -nlpt

# 查看网卡流量
sar -n DEV 1 # rxkB是进口 txkB是出口

# 查看实时连接
netstat -c
netstat -ct
netstat -cu

# 系统服务-查看
service --status-all
# 系统服务-注册自启动
update-rc.d hello-service defaults
# 系统服务-删除
update-rc.d -f hello-service remove

# 查看 mongo 有无调用方
mongostat 
arr={}
db.currentOp(true).inprog.forEach(function(d){if(d.client){host=d.client.toString().split(':')[0];if(!arr[host]) print(host);arr[host]=1;}})

# 查看 redis 有无调用方
echo client list |redis-cli |awk -F[=:] '{print $2}'|sort|uniq -c|sort -nr|head -10
echo info |redis-cli|grep instantaneous_ops_per_sec
echo info |redis-cli|grep connected

# 查看 mysql 有无调用方
SELECT SUBSTRING_INDEX(HOST, ':', 1) AS ip,count(*) FROM information_schema.PROCESSLIST GROUP BY ip;
{% endhighlight %}
