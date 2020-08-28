---
layout: post
title: Ubuntu 下设置 vnc 远程桌面和 python 远程 selenium 调用
category: tech
---

#### 参考资料
1. [xrdp完美实现Windows远程访问Ubuntu 16.04](https://www.cnblogs.com/xuliangxing/p/7560723.html)
1. [使用VNC远程连接Amazon EC2的Ubuntu实例](https://kuyur.info/blog/archives/2593)
1. [ubuntu安装vnc，远程链接时出现灰屏，配置文档不对吗？](https://www.zhihu.com/question/35487467)

#### vnc 远程桌面
linux 可视化界面远程访问有 xrdp 和 vnc 两种方式，这里只记录vnc的配置方法。步骤如下：

{% highlight bash %}
# ubuntu 14.04 和 16.04 测试ok
sudo apt-get update
sudo apt-get install vnc4server
sudo vnc4server
sudo vnc4server -kill :1
sudo vim ~/.vnc/xstartup
# 如果不是以 root 用户启动 vnc 服务还需要创建 samba 共享目录
mkdir -p /var/lib/samba/usershares
sudo apt-get install ubuntu-desktop gnome-panel gnome-settings-daemon metacity nautilus gnome-terminal
sudo vnc4server -geometry 1280x1024 -depth 24
{% endhighlight %}

其中 ~/.vnc/xstartup 的配置如下：
{% highlight bash %}
#!/bin/sh
export XKL_XMODMAP_DISABLE=1
unset SESSION_MANAGER	
unset DBUS_SESSION_BUS_ADDRESS
gnome-panel &	
gnmoe-settings-daemon &	
metacity &	
nautilus &	
gnome-terminal &
{% endhighlight %}

安装好了，即可通过 [VNC Viewer](http://www.realvnc.com/download/viewer/) 这个软件去远程桌面了。也可以给写一个服务脚本实现开机自启动，参考如下：
{% highlight bash %}
#!/bin/bash
PATH="$PATH:/usr/bin/"
export USER="vnc4"
DISPLAY="1"
DEPTH="16"
GEOMETRY="800x600"
OPTIONS="-depth ${DEPTH} -geometry ${GEOMETRY} :${DISPLAY}"
. /lib/lsb/init-functions
case "$1" in
        start)
                log_action_begin_msg "Starting vncserver for user '${USER}' on localhost:${DISPLAY}"
                su ${USER} -c "/usr/bin/vnc4server ${OPTIONS}"
        ;;
        stop)
                log_action_begin_msg "Stopping vncserver for user '${USER}' on localhost:${DISPLAY}"
                su ${USER} -c "/usr/bin/vnc4server -kill :${DISPLAY}"
        ;;
        restart)
                $0 stop
                $0 start
        ;;
        *)
                echo "Usage: /etc/init.d/vnc.sh (start|stop|restart)"
                exit 1
        ;;
esac
exit 0
{% endhighlight %}

#### python selenium 开发
通过 python selenium 可以很方便的实现程序对浏览器的操作控制。环境配置步骤如下：
{% highlight bash %}
# ubuntu 14.04 和 16.04 测试ok
# ChromeDriver 2.26.436382 和 Chrome 54.0.2840.59 测试ok
# ChromeDriver 2.38.552522 和 Chrome 66.0.3359.181 测试ok
apt install xvfb
apt install libnss3-dev
apt install libgconf-2-4
apt install libfontconfig
apt-get install xfonts-75dpi
apt-get install xfonts-100dpi
dpkg -P google-chrome-stable #卸载老的chrome
wget http://mirror.glendaleacademy.org/chrome/pool/main/g/google-chrome-stable/google-chrome-stable_54.0.2840.59-1_amd64.deb
dpkg -i google-chrome-stable_54.0.2840.59-1_amd64.deb
apt-get -f install

pip install selenium==3.3.3
pip install PyVirtualDisplay==0.2.1
{% endhighlight %}

若 chrome 不能安装也许还需要安装其他依赖：
{% highlight bash %}
apt install libappindicator1 libdbusmenu-glib4 libdbusmenu-gtk4 libindicator7 libpango1.0-0 libpangox-1.0-0
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
dpkg -i google-chrome-stable_current_amd64.deb
apt-get -f install
{% endhighlight %}

安装完成可以用程序测试一下：
{% highlight python %}
from pyvirtualdisplay import Display
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
# visible=1 可以直接桌面展示效果
display = Display(visible=0, size=(1024, 768))
display.start()
chrome_options = Options()
chrome_options.add_argument('--no-sandbox')
browser = webdriver.Chrome("/usr/bin/chromedriver", chrome_options=chrome_options)
browser.get("https://ip.cn")
browser.save_screenshot("ip_cn.jpg")
browser.quit()
{% endhighlight %}

#### python 远程 selenium 调用
安装完上述环境，已经可以本机程序调用 chrome 浏览器了。如果想实现远程调用，还需要启动两个服务([chromedriver下载](https://sites.google.com/a/chromium.org/chromedriver/downloads))：
{% highlight bash %}
# 不能用 root 用户运行
Xvfb -ac :7 -screen 0 1280x1024x8 > /dev/null 2>&1 &
DISPLAY=:7 chromedriver --whitelisted-ips="" --port=4444 > /dev/null 2>&1 &
{% endhighlight %}

接着就是程序调用：
{% highlight python %}
from selenium import webdriver
browser = webdriver.Remote(command_executor='http://10.0.1.145:4444', desired_capabilities=webdriver.DesiredCapabilities.CHROME)
browser.get("https://ip.cn")
print browser.page_source
{% endhighlight %}
