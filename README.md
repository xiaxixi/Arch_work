# Arch_work
架构大作业：火车票预定系统


## 八种技术
1、读写分离——两个数据库</br>

2、vue——前端页面</br>

3、md5加密——数据库password加密存储 （我使用过sha1）</br>

4、ajax异步刷新——注册、登陆</br>

5、sequelize——连接数据库</br>

6、webpack——前端资源加载/打包工具</br>

7、less——动态样式语言</br>

8、element——组件库：前端UI</br>

9、Redis	</br>
是一个Key-Value的NoSQL数据库，开发维护很活跃，虽然它是一个Key-Value数据库存储系统，但它本身支持MQ功能，所以完全可以当做一个轻量级的队列服务来使用。对于RabbitMQ和Redis的入队和出队操作，各执行100万次，每10万次记录一次执行时间。测试数据分为128Bytes、512Bytes、1K和10K四个不同大小的数据。实验表明：入队时，当数据比较小时Redis的性能要高于RabbitMQ，而如果数据大小超过了10K，Redis则慢的无法忍受；出队时，无论数据大小，Redis都表现出非常好的性能，而RabbitMQ的出队性能则远低于Redis。</br>

10、restfulApi</br>
REST全称是Representational State Transfer，中文意思是表述（编者注：通常译为表征）性状态转移。REST本身并没有创造新的技术、组件或服务，而隐藏在RESTful背后的理念就是使用Web的现有特征和能力， 更好地使用现有Web标准中的一些准则和约束。虽然REST本身受Web技术的影响很深， 但是理论上REST架构风格并不是绑定在HTTP上，只不过目前HTTP是唯一与REST相关的实例。 所以我们这里描述的REST也是通过HTTP实现的REST。</br>



### 实际用的技术

1、vue——前端页面

vant——轻量、可靠的移动端 Vue 组件库

前后端分离——前端：vue、vuex、vant等；后端：express、sequelize、mysql等。前后端分离，通过api传输数据

ES6——let命令；Arrow Function（箭头函数作用：）

2、sequelize——sequelize是 Node 的一个 ORM(Object-Relational Mapping) 框架，用来方便数据库mysql操作；sequelize.op用来处理复杂操作。

3、Bcrypt加密——Bcrypt是单向Hash加密算法，不可反向破解生成明文。破解一个Bcrypt密码的时间比较长（比md5更长），所以时间成本太高，比MD5更安全。

4、读写分离——

5、axios——已有

6、express——已有

7、docker

8、mq——消息总线（Message Queue），是一种跨进程的通信机制，用于上下游传递消息。

9、loaderbalence



#### 步骤

1、下载

2、cd train-ticket-client 

   npm install
   
   npm run serve 

3、修改 train-ticket-server/.env内容：你的数据库 用户名和密码

   新建数据库  名称：train_ticket_save

4、新开终端

​   cd train-ticket-server

   npm install

​   npm start

5、打开浏览器使用

#### 