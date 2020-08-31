---
layout: post
title: 使用 ghost.py 和 scrapy.py 做采集的尝试
category: 技术
---

### 学习背景
其实一直想学习python相关的开源采集框架，在网上了解到scrapy.py做采集的比较多，ghost.py相对小众但是是基于webkit的，而且功能简单容易上手。都尝试了一番更偏爱ghost.py。开始的时候尝试在linux下安装，老是失败，不得不吐槽很多linux的软件依赖真的的很乱，本来只安装一个软件，结果却还需要安装其他依赖包，然后你就会发现可能因为依赖包的升级或者停止维护而导致版本对不上的问题，在windows下安装成功。

### scrapy.py的试用
一，安装教程参考：[安装指南 —— Scrapy 0.24.1 文档](http://scrapy-chs.readthedocs.org/zh_CN/latest/intro/install.html)<br />
二，尝试了一个开源采集DMOZ的例子：[github.com/scrapy/dirbot](https://github.com/scrapy/dirbot)<br />
三，中间碰到几个问题记录如下：

1. You do not have a working installation of the service_identity module，需要安装service_identity，参考链接：[python No module named service_identity](http://stackoverflow.com/questions/24089484/python-no-module-named-service-identity)
2. scrapy No module named win32api，要安装pywin32，如果python版本是2.7则下载：[Download Python for Windows Extensions from SourceForge.net](http://sourceforge.net/projects/pywin32/files/pywin32/Build%20218/pywin32-218.win-amd64-py2.7.exe/download?use_mirror=nchc)
3. scrapy Unknown command: crawl，需要把项目放在python安装目录下的含有scrapy.cfg的目录下：参考链接：[unknown command: crawl error](http://stackoverflow.com/questions/10123104/unknown-command-crawl-error)

### ghost.py的试用
安装基本顺利，步骤如下：

1. 先安装easy_install，参考：[how to use webkit code in scrapy/python](http://stackoverflow.com/questions/13069100/how-to-use-webkit-code-in-scrapy-python)
2. easy_install pip
3. pip install -U PySide
4. pip install Ghost.py

ghost.py的文档参考：http://carrerasrodrigo.github.io/Ghost.py/

总结的功能如下，ghost.py主要功能是用于前端页面模拟访问测试，有专门的测试类；打开页面，加载js，在页面模拟执行js代码；在页面模拟表单提交。

最开始的时候写了一个程序采集http://talk.xinli001.com/lastest/页面的话题，结果发现采集100条后python的占用内存用到300M了！而且电脑网络越慢的话占用内存越高，和web服务器有些类似，就是一个web请求处理时间越长越占系统资源。但是对python完全不熟不知道怎么改进，于是决定每次只采集固定条数，再写一个守护进程不断重新执行。测试了一晚上，只采集了1000多条，一方面是电脑上网慢的原因，另一方面是ghost是基于webkit而程序也有待改进，可喜的是it works！代码如下：

### 采集程序collect.py
{% highlight python %}
#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
from ghost import Ghost
ROOT_PATH = "E:\\wwwroot\\dxslaw\\caiji\\"

GHOST = Ghost(wait_timeout = 30, download_images = False, display = False, cache_dir = './')
GHOST2 = Ghost(wait_timeout = 8, download_images = False, display = False, cache_dir = './')
base_url = 'http://talk.xinli001.com/lastest/'
page, resources = GHOST.open(base_url)
print page.url, page.http_status, page.headers
GHOST.evaluate_js_file(ROOT_PATH + "jquery172.js", encoding='utf-8')
GHOST.evaluate("var current_item = null;")

def collect_list():
    talk_url = GHOST.evaluate_js_file(ROOT_PATH + 'collect_list.js', encoding='utf-8')
    if talk_url[0] != '':
        collect_item(talk_url[0])
        return 1
    else:
        return 0
        
def collect_item(talk_url):
    try:
        page, resources = GHOST2.open(talk_url)
        GHOST2.evaluate_js_file(ROOT_PATH + 'jquery172.js', encoding='utf-8')
        talk_id = GHOST2.evaluate_js_file(ROOT_PATH + 'collect_item.js', encoding='utf-8')
        GHOST2.wait_for_text("caiji_success")
        print talk_url, talk_id
    except EOFError:
        print 'eof error'
    except:
        print 'error'
    return 1

#backing out
restore_point = 0
f = open(ROOT_PATH + "restore_point.txt", 'a')
f.close()
f = open(ROOT_PATH + "restore_point.txt", 'r')
restore_point = f.read()
restore_point = 0 if restore_point == '' else int(restore_point)
f.close()
if restore_point > 1:
    for i in range(1, restore_point):
        print '%s backing...' % (i)
        try:
            GHOST.click("#id_get_more")
            GHOST.wait_for_selector("#id_get_more")
        except:
            print 'click error'
            GHOST.click("#id_get_more")
            GHOST.wait_for_selector("#id_get_more")
    GHOST.evaluate("current_item = $('#id_topic_list div.items:last');")   

#collect start
for i in range(1, 24):
    rs = collect_list()
    if rs == 0:
        print '%s waiting...' % (i)
        f = open(ROOT_PATH + "restore_point.txt", 'r+')
        restore_point = restore_point + 1
        f.write(bytes(restore_point))
        f.close()
        try:
            GHOST.click("#id_get_more")
            GHOST.wait_for_selector("#id_get_more")
        except:
            print 'click error'
            GHOST.click("#id_get_more")
            GHOST.wait_for_selector("#id_get_more")

exit()
{% endhighlight %}

### 守护进程程序collect_daemon.py
{% highlight python %}
import os
import time
i = 0

while True:
    i = i + 1
    print i
    f = os.popen("C:\\python27\\python.exe E:\\wwwroot\\dxslaw\\caiji\\collect.py", 'r')
    #f = os.popen("exit 0")
    
    time.sleep(2)
    f.close()
{% endhighlight %}

### 参考文章
* https://pypi.python.org/pypi/setuptools#windows-7-or-graphical-install
* http://www.oschina.net/question/1788288_159909
* http://rfyiamcool.blog.51cto.com/blog/1030776/1287810