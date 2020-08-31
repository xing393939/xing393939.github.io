---
layout: post
title: 学习 Laravel 的 artisan 工具命令
category: 技术
---

<pre>
clear-compiled      清除类库缓存文件
down                关闭网站，让网站处于维护模式
env                 列出.env配置信息
help                列出help列表
inspire             随机一个名言警句
list                列出artisan命令列表
migrate             初始化数据库表，跑database/migrations下的脚本
optimize            优化项目
serve               创建一个Web服务，默认端口为8000
tinker              进入PHP环境命令，且可以调用laravel资源
up                  打开网站

app
app:name            设置应用的命名，默认是App

auth
auth:clear-resets   清除过期的密码，重置密钥

cache
cache:clear         清除应用的缓存
cache:table         创建一个migration，作为缓存表

config
config:cache        为配置文件设置缓存
config:clear        删除配置文件的缓存

db
db:seed             初始化数据库数据

event
event:generate      初始化一个events和listeners

handler
handler:command     创建一个命令类
handler:event       创建一个事件类

key
key:generate        重置应用的全局密钥

make
make:command        创建command class
make:console        创建Artisan command
make:controller     创建controller class
make:event          创建event class
make:job            创建job class
make:listener       创建listener class
make:middleware     创建middleware class
make:migration      创建migration file
make:model          创建model class
make:provider       创建provider class
make:request        创建request class
make:seeder         创建seeder class

migrate
migrate:install     创建数据库迁移版本库
migrate:refresh     Reset and re-run all migrations
migrate:reset       Rollback all database migrations
migrate:rollback    Rollback the last database migration
migrate:status      Show the status of each migration

queue
queue:failed        列出失败的队列
queue:failed-table  创建一个migration，用于存失败队列的表
queue:flush         清除所有的失败队列
queue:forget        Delete a failed queue job
queue:listen        Listen to a given queue
queue:restart       Restart queue worker daemons after their current job
queue:retry         Retry a failed queue job
queue:subscribe     Subscribe a URL to an Iron.io push queue
queue:table         Create a migration for the queue jobs database table
queue:work          Process the next job on a queue

route
route:cache         为路由配置设置缓存
route:clear         清除路由配置的缓存
route:list          列出所有的路由配置

schedule
schedule:run        开始跑定时任务

session
session:table       创建一个migration，用于存session表

vendor
vendor:publish      从依赖库copy出需要发布的文件出来

view
view:clear          清除模板缓存
</pre>