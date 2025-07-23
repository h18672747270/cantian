@echo off
setlocal enabledelayedexpansion

echo 🚀 开始 Cantian Docker 部署...

REM 检查 Docker 是否安装
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker 未安装，请先安装 Docker
    echo 💡 安装提示: https://docs.docker.com/get-docker/
    pause
    exit /b 1
)

REM 检查 Docker Compose 是否可用
set COMPOSE_CMD=
docker compose version >nul 2>&1
if not errorlevel 1 (
    set COMPOSE_CMD=docker compose
    echo ✅ 使用命令: docker compose
) else (
    docker-compose --version >nul 2>&1
    if not errorlevel 1 (
        set COMPOSE_CMD=docker-compose
        echo ✅ 使用命令: docker-compose
    ) else (
        echo ❌ Docker Compose 未安装，请先安装 Docker Compose
        pause
        exit /b 1
    )
)

REM 创建 .env 文件（如果不存在）
if not exist .env (
    echo 📝 创建 .env 文件...
    copy .env.example .env >nul
    echo ✅ 已创建 .env 文件，使用默认配置
)

REM 停止现有服务（如果存在）
echo 🛑 停止现有服务...
%COMPOSE_CMD% down >nul 2>&1

REM 构建镜像
echo 🏗️ 构建 Docker 镜像...
%COMPOSE_CMD% build --no-cache

REM 启动服务
echo 🚀 启动服务...
%COMPOSE_CMD% up -d

REM 等待服务启动
echo ⏳ 等待服务启动...
timeout /t 5 /nobreak >nul

REM 检查服务状态
echo 🔍 检查服务状态...
%COMPOSE_CMD% ps

REM 检查健康状态
echo 💚 检查应用健康状态...
REM 读取端口配置
set PORT=80
for /f "tokens=2 delims==" %%a in ('findstr HTTP_PORT .env 2^>nul') do set PORT=%%a

REM 简单的健康检查
for /l %%i in (1,1,5) do (
    timeout /t 3 /nobreak >nul
    echo ⏳ 等待应用启动... (%%i/5)
)

echo.
echo 🎉 部署完成！
echo 🌐 访问地址: http://localhost:!PORT!
echo.
echo 📋 常用命令:
echo   查看日志: %COMPOSE_CMD% logs -f
echo   停止服务: %COMPOSE_CMD% down
echo   重启服务: %COMPOSE_CMD% restart
echo.

REM 显示最近日志
echo 📋 最近的日志:
%COMPOSE_CMD% logs --tail=20

echo.
echo 按任意键退出...
pause >nul