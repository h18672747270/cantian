# 使用node镜像作为构建环境
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制package文件
COPY package*.json pnpm-lock.yaml ./

# 安装pnpm
RUN npm install -g pnpm

# 设置npm镜像源
RUN pnpm config set registry https://registry.npmmirror.com/

# 安装依赖
RUN pnpm install --frozen-lockfile

# 传递构建参数，默认为sandbox
ARG BUILD_ENV=sandbox

# 复制所有文件
COPY . .

# 构建前端项目
RUN pnpm run build:${BUILD_ENV}

# 使用nginx镜像作为运行环境
FROM nginx:alpine

# 复制nginx配置
COPY default.conf /etc/nginx/conf.d/default.conf

# 复制构建的文件到nginx的html目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 创建日志目录
RUN mkdir -p /var/log/nginx

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
