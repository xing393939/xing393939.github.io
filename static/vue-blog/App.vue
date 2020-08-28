<template>
<div>
    <div id="nav">
        <div class="wrapper">
            <div id="logo">
                <router-link to="/"><img src="/static/image/logo.png" /></router-link>
            </div>
            <ul>
                <li><router-link to="/">首页</router-link></li>
                <li><router-link to="/static/page/seen-and-heard">视听</router-link></li>
                <li><router-link to="/static/page/link">链接</router-link></li>
                <li><router-link to="/static/page/quote">诗词</router-link></li>
                <li><router-link to="/static/page/about">关于</router-link></li>
            </ul>
        </div>
    </div>
    <div class="wrapper main">
        <div id="content">
            <router-view></router-view>
        </div>
        <div id="footer">
            <p style="color:#ccc;font-size:12px;text-align:center;">make the world a little better and easier</p>
            <p style="clear:both"></p>
        </div>
    </div>
</div>
</template>

<style>
    @import './css/style.css';
    @import './css/syntax.css';
</style>
