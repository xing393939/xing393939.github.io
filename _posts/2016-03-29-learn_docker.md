---
layout: post
title: Docker 入门学习
category: tech
---

### 参考资料

1. [使用Docker部署PHP应用的设计方案](http://my.oschina.net/ybusad/blog/499013)
2. [Docker快速部署代码之道 ](http://dockone.io/article/86)
3. [容器里Nginx、MySQL的配置文件、日志是否应该挂载到宿主上？](http://dockone.io/question/54)
4. [一种 Dockerize 应用的简单方式](https://segmentfault.com/a/1190000000728440)
5. [Docker在PHP项目开发环境中的应用](http://avnpc.com/pages/build-php-develop-env-by-docker)
6. [Docker制作nginx+php - 源码编译方式](http://www.cnblogs.com/HD/p/4930884.html)
7. [ Docker多容器连接-以Nginx+PHP为例 ](http://www.ituring.com.cn/article/199033)

### 什么是docker
docker是一种新的虚拟机方案，和传统虚拟机方案相比，他极大的降低了云计算资源供应的成本，同时让应用的分发、测试、部署都变得前所未有的高效和轻松！每个docker可以是操作系统、一个应用（如apache、nginx、mysql等），或者一个代码目录。

1. 更快速的交付和部署(环境一致)
2. 更高效的虚拟化，秒级启动
3. 更轻松的迁移和扩展（环境一致）
4. 更简单的管理，用dockerfile，所有的修改都是以增量的方式被分发和更新

优势：传统虚拟机单机一般为几十个，docker可以到上千个；通过docker仓库共享镜像，常用软件都可以在仓库可以找到，避免重复轮子。

### docker三个基本概念
镜像：用来创建docker容器，类似操作系统ghost镜像<br />
容器：运行实例，类似一个虚拟机<br />
仓库：镜像托管平台，分公开仓库和私有仓库，类似github和gitlab

### 基本操作

#### 镜像：
1. 增：pull、build dockerfile
2. 删：rmi
3. 改：commit
4. 查：images
5. 导出导入：save和import
6. 上传仓库：push

#### 容器：
1. 创建：run -i(伪终端) -t(STDIN交互) -d(后台运行)
2. 查看：ps
3. 删除：rm
4. 控制：stop/start/restart
5. 进入容器：exec/ssh
6. 导出导入：export和import

### 几点笔记

1. 一个容器每次只能运行一个程序
2. 如果没有任何服务运行，容器run后会立即exit，可以使用 tail -f 等block命令使容器保持运行不退出
3. 关于PHP镜像，官方比较亲切的在镜像内部准备了一个docker-php-ext-install指令，可以快速安装如GD、PDO等常用扩展。所有支持的扩展名称可以通过在容器内运行docker-php-ext-install获得
4. 容器之间的连接可以使用docker的[Linking功能](https://docs.docker.com/userguide/dockerlinks/)，在一般的PHP项目中，Nginx需要链接PHP，而PHP又需要链接MySQL，Redis等。为了让容器间互相链接更加容易管理，Docker官方推荐使用[Docker-Compose](https://docs.docker.com/compose/)完成这些操作。

### 三个实践

#### 1. 容器挂载另一个容器的数据卷
镜像的dockerfile如下：
{% highlight bash %}
FROM daocloud.io/ubuntu
VOLUME ["/www"]
ENTRYPOINT ["/bin/sh", "-c", "while true; do echo hello world; sleep 1; done"]
{% endhighlight %}
操作命令如下：
{% highlight bash %}
docker build --tag image1 .
docker run -it -d --name container1 image1
docker run -it -d --name container2 --volumes-from container1 daocloud.io/ubuntu
{% endhighlight %}
这样就实现了container2挂载container1的/www目录

#### 2. 容器开放端口、端口映射
镜像的dockerfile如下：
{% highlight bash %}
FROM daocloud.io/ubuntu
RUN apt-get install -y nginx && rm -rf /var/lib/apt/lists/* && echo "\ndaemon off;" >> /etc/nginx/nginx.conf && chown -R www-data:www-data /var/lib/nginx
RUN echo "Asia/Shanghai" > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata
EXPOSE 80
EXPOSE 443
ENTRYPOINT ["/usr/sbin/nginx"]
{% endhighlight %}
操作命令如下：
{% highlight bash %}
docker build --tag image3 .
docker run -it -d -p 82:80 --name container3 image3
{% endhighlight %}
这样就创建了一个容器container3（nginx服务），dockerfile定义开放80和443端口，启动容器的时候又将主机的82端口映射到container3的80端口

#### 3. 容器之间的连接
{% highlight bash %}
docker run -it -d --name container4 -e MYSQL_ROOT_PASSWORD=my-secret-pw daocloud.io/mysql:5.5.48
docker run -it -d --name container5 --link container4 daocloud.io/ubuntu
{% endhighlight %}
这样容器container5里面就可以ping container4了，并且可以使用mysql端口服务