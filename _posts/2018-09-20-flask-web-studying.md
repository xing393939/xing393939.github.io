---
layout: post
title: Flask Web 开发相关知识点
category: tech
---

### 参考资料

1. [使用pipenv管理你的项目](http://www.dongwm.com/archives/%E4%BD%BF%E7%94%A8pipenv%E7%AE%A1%E7%90%86%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE/)
1. [新版本的Flask中如何启动开发服务器和开启调试模式](https://zhuanlan.zhihu.com/p/40782238)
1. [命令行接口](https://dormousehole.readthedocs.io/en/latest/cli.html)
1. [Flask最佳实践](https://zhuanlan.zhihu.com/p/22774028)

### 开发模式+配置

1. 使用flask run命令来取代app.run()方法运行开发服务器
1. 使用flask 内置的命令行 app.cli.command, 弃用Flask-Script
1. Flask > 0.11时，支持flask run运行开发服务器
1. .env文件，pipenv shell时加载
1. .env和.flaskenv，在flask > 1.0，pip install python-dotenv后，flask run时会自动加载，这里约定.env在GIT仓库之外
1. 在flask > 1.0，flask run会自动自动探测wsgi.py和app.py文件，而不需要设置FLASK_APP环境变量
1. linux shell下export FLASK_APP=app 后，将不会使用.flaskenv设置的FLASK_APP（flask==1.0测试是这样）

### 单元测试
1. 运行 unittest discover，即可把tests目录下的测试用例都跑一次
1. 运行 coverage run -m unittest discover 或者 coverage run -m tests.test_admin 跑用例，配置文件是.coverage。coverage report 输出报告，coverage html --omit="*site-packages*" 生成html详细报告
1. flake8 . 静态检查，检查代码逻辑和 PEP 8 编码规范

### 两种装饰器的用法

``` python
# -*- coding: utf-8 -*-
class Car:

    num = 1

    def price(self):
        raise NotImplementedError

    def decorator_for_price(self, func):
        self.price = func
        return func

    def decorator_for_num(self, func):
        def wrapper(*args, **kwargs):
            ret = func(*args, **kwargs)
            return ret
        return wrapper


bench = Car()


@bench.decorator_for_price
def f1():
    print "decorator_for_price called"
    return 20000


@bench.decorator_for_num
def f2():
    print "decorator_for_num called"
    bench.num += 1


print bench.price()
print bench.num
f2()
```

### logging

logging 模块中：logger可以看做是一个记录日志的人，对于记录的每个日志，他需要有一套规则，比如记录的格式（formatter），等级（level）等等，这个规则就是handler。使用logger.addHandler(handler)添加多个规则，就可以让一个logger记录多个日志。可以安装 logging_tree 模块来打印当前已添加的 handler。

flask 日志记录，日志系统被极大的简化，日志器总是命名为flask.app，它只会在没有日志处理器注册的情况下才添加处理器，而且不会移除已经存在的处理器。使用如下：

``` python
app.logger.debug('log ...')
app.logger.error('log ...')
``` 

### 引用蓝图对象

常规的引用蓝图对象是一个一个的引入，比如：

``` python
app.register_blueprint(admin, url_prefix='/admin')
app.register_blueprint(blog, url_prefix='/blog')
app.register_blueprint(auth, url_prefix='/auth')
``` 

可以简化成：

``` python
from werkzeug.utils import find_modules, import_string


def register_blueprints(root, app):
    for name in find_modules(root, recursive=True):
        mod = import_string(name)
        if hasattr(mod, 'bp'):
            urls = name.split('.')
            prefix = '/{}/{}'.format(urls[-2], urls[-1])
            app.register_blueprint(
                mod.bp, url_prefix=prefix)


def create_app():
    ...
    register_blueprints('views', app)
``` 
