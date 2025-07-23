#!/bin/bash

# Docker 一键部署脚本
set -e

echo "🚀 开始 Docker 部署..."

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

# 检查 Docker Compose 是否安装
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose 未安装，请先安装 Docker Compose"
    exit 1
fi

# 创建 .env 文件（如果不存在）
if [ ! -f .env ]; then
    echo "📝 创建 .env 文件..."
    cp .env.example .env
    echo "✅ 请编辑 .env 文件配置您的环境变量"
fi

# 构建镜像
echo "🏗️  构建 Docker 镜像..."
docker compose build

# 启动服务
echo "🚀 启动服务..."
docker compose up -d

# 检查服务状态
echo "🔍 检查服务状态..."
docker compose ps

echo "✅ 部署完成！"
echo "🌐 访问地址: http://localhost:$(grep HTTP_PORT .env | cut -d'=' -f2 || echo 80)"

# 显示日志
echo "📋 最近的日志:"
docker compose logs --tail=20