@echo off
echo 🚀 开始一键部署...

REM 检查Docker是否运行
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker未安装或未启动，请先安装并启动Docker Desktop
    pause
    exit /b 1
)

REM 检查pnpm是否安装
pnpm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ pnpm未安装，正在安装...
    npm install -g pnpm
)

REM 安装依赖
echo 📦 安装依赖...
pnpm install

REM 构建项目
echo 🔨 构建项目...
pnpm run build:antd

REM 检查构建结果
if not exist "apps\web-antd\dist" (
    echo ❌ 构建失败，dist目录不存在
    pause
    exit /b 1
)

REM 复制构建结果到根目录
echo 📁 复制构建文件...
if exist "dist" rmdir /s /q "dist"
xcopy "apps\web-antd\dist" "dist\" /s /e /i

REM 停止旧容器
echo 🛑 停止旧容器...
docker-compose down 2>nul

REM 清理旧镜像
echo 🧹 清理旧镜像...
docker system prune -f

REM 构建并启动服务
echo 🔨 构建并启动Docker服务...
docker-compose up -d --build

REM 等待服务启动
echo ⏳ 等待服务启动...
timeout /t 10

REM 检查服务状态
echo 🔍 检查服务状态...
docker-compose ps

REM 显示访问信息
echo.
echo ✅ 部署完成!
echo 🌐 本地访问: http://localhost
echo 📊 查看状态: docker-compose ps
echo 📋 查看日志: docker-compose logs -f
echo.
pause