# train-ticket-client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Docker部署项目
### 获取Nignx镜像
sudo docker pull nginx

### 基于项目中的Dockfile构建Vue应用镜像（注意不要少了命令最后的 “.” ）
sudo docker build -t train-ticket-client .

### 启动train-ticket-client容器
#### 基于train-ticket-client镜像启动容器
sudo docker run -p 8081:80 -d --name train-ticket-client train-ticket-client