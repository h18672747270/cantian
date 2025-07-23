#!/bin/bash

# Docker 一键部署脚本
set -e

echo "🚀 开始 Cantian Docker 部署..."

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    echo "💡 安装提示: https://docs.docker.com/get-docker/"
    exit 1
fi

# 检查 Docker Compose 是否可用
COMPOSE_CMD=""
if command -v docker &> /dev/null && docker compose version &> /dev/null 2>&1; then
    COMPOSE_CMD="docker compose"
elif command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
else
    echo "❌ Docker Compose 未安装，请先安装 Docker Compose"
    exit 1
fi

echo "✅ 使用命令: $COMPOSE_CMD"

# 创建 .env 文件（如果不存在）
if [ ! -f .env ]; then
    echo "📝 创建 .env 文件..."
    cp .env.example .env
    echo "✅ 已创建 .env 文件，使用默认配置"
fi

# 停止现有服务（如果存在）
echo "🛑 停止现有服务..."
$COMPOSE_CMD down 2>/dev/null || true

# 构建镜像
echo "🏗️  构建 Docker 镜像..."
$COMPOSE_CMD build --no-cache

# 启动服务
echo "🚀 启动服务..."
$COMPOSE_CMD up -d

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 5

# 检查服务状态
echo "🔍 检查服务状态..."
$COMPOSE_CMD ps

# 检查健康状态
echo "💚 检查应用健康状态..."
PORT=$(grep HTTP_PORT .env 2>/dev/null | cut -d'=' -f2 || echo 80)
for i in {1..10}; do
    if curl -f -s http://localhost:$PORT/ > /dev/null 2>&1; then
        echo "✅ 应用启动成功！"
        break
    fi
    if [ $i -eq 10 ]; then
        echo "⚠️  应用可能未完全启动，请检查日志"
    else
        echo "⏳ 等待应用启动... ($i/10)"
        sleep 3
    fi
done

echo ""
echo "🎉 部署完成！"
echo "🌐 访问地址: http://localhost:$PORT"
echo ""
echo "📋 常用命令:"
echo "  查看日志: $COMPOSE_CMD logs -f"
echo "  停止服务: $COMPOSE_CMD down"
echo "  重启服务: $COMPOSE_CMD restart"
echo ""

# 显示最近日志
echo "📋 最近的日志:"
$COMPOSE_CMD logs --tail=20