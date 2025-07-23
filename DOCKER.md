# Cantian Docker 部署指南

## 快速开始

### 方式一：一键部署脚本

**Linux/Mac:**
```bash
./deploy-docker.sh
```

**Windows:**
```cmd
deploy-docker.bat
```

### 方式二：手动部署

1. **创建环境配置**
```bash
cp .env.example .env
```

2. **构建并启动**
```bash
docker compose build
docker compose up -d
```

3. **访问应用**
```
http://localhost:80
```

## 配置说明

### 环境变量 (.env)

```env
# 构建环境 (dev/sandbox/prod)
BUILD_ENV=sandbox

# 项目名称
COMPOSE_PROJECT_NAME=cantian

# 端口配置
HTTP_PORT=80
HTTPS_PORT=443

# 时区
TZ=Asia/Shanghai
```

## 常用命令

```bash
# 查看服务状态
docker compose ps

# 查看日志
docker compose logs -f

# 重启服务
docker compose restart

# 停止服务
docker compose down

# 重新构建
docker compose build --no-cache
```

## 项目结构

```
├── dockerfile              # Docker镜像构建文件
├── docker-compose.yml      # Docker Compose配置
├── .env.example           # 环境变量模板
├── deploy-docker.sh       # Linux/Mac部署脚本
├── deploy-docker.bat      # Windows部署脚本
└── default.conf          # Nginx配置文件
```

## 故障排除

### 1. 端口被占用
```bash
# 查看端口占用
netstat -tulpn | grep :80
# 修改 .env 中的 HTTP_PORT
```

### 2. 构建失败
```bash
# 清理Docker缓存
docker system prune -f
docker compose build --no-cache
```

### 3. 应用无法访问
```bash
# 检查容器状态
docker compose ps
# 查看详细日志
docker compose logs cantian-app
```