# Arch_work
架构大作业：火车票预定系统



### 新技术

###### 1、vue.js——前端页面

Vue 是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

本系统以Vue2.6为前端框架，前端主要使用了vue、vuex、vue-router、axios，另外引入了vant这个UI库和vue.js-datepicker模块（日期选择器）。

ES6——let命令；Arrow Function（箭头函数）



###### 2、axios——已有

###### 3、express——已有

###### 4、sequelize——sequelize是 Node 的一个 ORM(Object-Relational Mapping) 框架，用来方便数据库mysql操作；sequelize.op用来处理复杂操作。

###### 5、Bcrypt加密

 Bcrypt是一个跨平台的文件加密工具。由它加密的文件可在所有支持的操作系统和处理器上进行转移。它的口令必须是8至56个字符，并将在内部被转化为448位的密钥。


Bcrypt加密是单向Hash加密算法，不可反向破解生成明文。破解一个Bcrypt密码的时间比较长（比MD5更长），所以时间成本太高，比MD5更安全。

本系统，在注册和登陆时对用户密码使用了Bcrypt加密，最后保存到数据库中的是加密后的密码，所以即使开发者进入数据库也无法泄露用户密码，保障了用户信息安全。




###### 6、读写分离

MySQL读写分离基本原理是让master数据库处理写操作，slave数据库处理读操作。master将写操作的变更同步到各个slave节点。

MySQL读写分离能提高系统性能的原因在于：

- 物理服务器增加，机器处理能力提升。拿硬件换性能。
- 
  主从只负责各自的读和写，极大程度缓解X锁和S锁争用。

- 
  slave可以配置myiasm引擎，提升查询性能以及节约系统开销。

- 
  master直接写是并发的，slave通过主库发送来的binlog恢复数据是异步。

- slave可以单独设置一些参数来提升其读的性能。
- 增加冗余，提高可用性。

本系统，使用两个mysql数据库：

- 
  master： IP为127.0.0.1，端口为3306 

- slave： IP为127.0.0.1，端口为3307 

  


###### 7、mq——消息总线（Message Queue），是一种跨进程的通信机制，用于上下游传递消息。

###### 8、docker

###### 9、loaderbalence



#### 项目启动步骤

1、下载

2、cd train-ticket-client 

​	npm install

​	npm run serve 

3、修改 train-ticket-server/.env内容：你的数据库 用户名和密码

​	新建数据库  名称：train_ticket

4、新开终端

​	cd train-ticket-server

​	npm install

​	npm start

5、浏览器——开发者模式——Ctrl+Shift+M

#### 
