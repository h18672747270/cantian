#!/bin/bash
set -e

echo "🚀 开始一键部署到云服务器..."

# 加载环境配置
if [ -f .env.production ]; then
    source .env.production
    echo "✅ 已加载生产环境配置"
else
    echo "⚠️  未找到.env.production配置文件，使用默认配置"
    SERVER_IP=${SERVER_IP:-"localhost"}
    PROJECT_NAME=${PROJECT_NAME:-"cantian"}
fi

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker未安装，正在安装..."
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
    echo "✅ Docker安装完成"
fi

# 检查Docker Compose是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose未安装，正在安装..."
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "✅ Docker Compose安装完成"
fi

# 创建必要的目录
echo "📁 创建必要目录..."
mkdir -p logs
mkdir -p dist

# 停止旧容器
echo "🛑 停止旧容器..."
docker-compose down 2>/dev/null || true

# 清理旧镜像（可选）
echo "🧹 清理旧镜像..."
docker system prune -f

# 构建并启动服务
echo "🔨 构建并启动服务..."
COMPOSE_PROJECT_NAME=${PROJECT_NAME} docker-compose up -d --build

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 10

# 检查服务状态
echo "🔍 检查服务状态..."
docker-compose ps

# 检查服务健康状态
echo "🏥 检查服务健康状态..."
if curl -f http://localhost/health >/dev/null 2>&1; then
    echo "✅ 服务健康检查通过"
else
    echo "⚠️  服务健康检查失败，请检查日志"
fi

# 显示日志
echo "📋 最新日志:"
docker-compose logs --tail=20

echo "✅ 部署完成!"
echo "🌐 本地访问: http://localhost"
if [ "$SERVER_IP" != "localhost" ]; then
    echo "🌐 服务器访问: http://${SERVER_IP}"
fi
echo "📊 查看状态: docker-compose ps"
echo "📋 查看日志: docker-compose logs -f"
echo "🔧 重启服务: docker-compose restart"
echo "🛑 停止服务: docker-compose down"