# 使用node镜像作为构建环境
FROM node:22 AS builder

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

RUN npm config set registry https://registry.npmmirror.com/

# 安装依赖
RUN npm install

#传递构建参数
ARG NPM_BUILD_TARGET

# 复制所有文件
COPY . .

# 构建前端项目
RUN npm run build:${NPM_BUILD_TARGET}

# 使用nginx镜像作为运行环境
FROM nginx:latest

# 复制构建的文件到nginx的html目录
COPY --from=builder /app/dist /usr/share/nginx/html


# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
