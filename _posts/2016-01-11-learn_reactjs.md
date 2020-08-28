---
layout: post
title: React 入门学习
category: think
---

### 简介
现阶段打算学习react和vue.js。react是facebook推出的基于ES6标准的javascript框架，关于ES6的由来可以看阮一峰的文章：[ECMAScript 6简介 - ECMAScript 6入门](http://es6.ruanyifeng.com/#docs/intro#ECMAScript%E7%9A%84%E5%8E%86%E5%8F%B2)。要学习它需要学习它制定的一种新的语法JSX，简单介绍一下环境：

一，需要安装label来编译jsx：npm install -g babel@5

二，编辑器设置file watcher，前端应该是用webstorm，我一直用的phpstorm，在settings——File Watchers新建一个file watcher：

1. name和description自填，file type选择jsx，没有的话在settings——File Types里面添加一个
2. program：lebal.bat的路径
3. arguments：--source-maps --out-file $FileNameWithoutExtension$-compiled.js $FilePath$
4. output paths：$FileNameWithoutExtension$-compiled.js:$FileNameWithoutExtension$-compiled.js.map

以上，环境就算完成了，附上一个简单的demo
{% highlight javascript %}
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="content"></div>
<!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/es5-shim/4.4.1/es5-shim.js"></script>
    <script src="//cdn.bootcss.com/es5-shim/4.4.1/es5-sham.js"></script>
<![endif]-->
<script src="lib/react-with-addons.js"></script>
<script src="lib/react-dom.js"></script>
<script src="demo1-compiled.js"></script>
</body>
</html>
{% endhighlight %}
这里的demo1-compiled.js是file watcher自动监控demo1.jsx生成的，demo1.jsx代码如下：
{% highlight javascript %}
var MainBox = React.createClass({
    render: function () {
        return <div>Hello React</div>
    }
});

ReactDOM.render(<MainBox/>, document.getElementById('content'));
{% endhighlight %}
