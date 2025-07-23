@echo off
setlocal enabledelayedexpansion

echo 🚀 开始 Docker 部署...

REM 检查 Docker 是否安装
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker 未安装，请先安装 Docker
    exit /b 1
)

REM 检查 Docker Compose 是否可用
docker compose version >nul 2>&1
if errorlevel 1 (
    docker-compose --version >nul 2>&1
    if errorlevel 1 (
        echo ❌ Docker Compose 未安装，请先安装 Docker Compose
        exit /b 1
    )
    set COMPOSE_CMD=docker-compose
) else (
    set COMPOSE_CMD=docker compose
)

REM 创建 .env 文件（如果不存在）
if not exist .env (
    echo 📝 创建 .env 文件...
    copy .env.example .env >nul
    echo ✅ 请编辑 .env 文件配置您的环境变量
)

REM 构建镜像
echo 🏗️  构建 Docker 镜像...
%COMPOSE_CMD% build

REM 启动服务
echo 🚀 启动服务...
%COMPOSE_CMD% up -d

REM 检查服务状态
echo 🔍 检查服务状态...
%COMPOSE_CMD% ps

echo ✅ 部署完成！

REM 读取端口配置
for /f "tokens=2 delims==" %%a in ('findstr HTTP_PORT .env 2^>nul') do set PORT=%%a
if not defined PORT set PORT=80

echo 🌐 访问地址: http://localhost:!PORT!

REM 显示日志
echo 📋 最近的日志:
%COMPOSE_CMD% logs --tail=20

pause