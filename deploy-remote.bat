@echo off
setlocal enabledelayedexpansion

REM 服务器配置
set SERVER_IP=8.148.237.148
set SERVER_USER=root
set PROJECT_NAME=vben-admin
set REMOTE_PATH=/var/www/%PROJECT_NAME%

echo 🚀 开始部署到远程服务器 %SERVER_IP%...

REM 检查必要工具
where scp >nul 2>&1
if errorlevel 1 (
    echo ❌ 未找到scp命令，请安装Git Bash或OpenSSH
    pause
    exit /b 1
)

REM 本地构建项目
echo 🔨 本地构建项目...
pnpm install
if errorlevel 1 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)

pnpm run build:antd
if errorlevel 1 (
    echo ❌ 项目构建失败
    pause
    exit /b 1
)

REM 检查构建结果
if not exist "apps\web-antd\dist" (
    echo ❌ 构建失败，dist目录不存在
    pause
    exit /b 1
)

REM 打包构建文件
echo 📦 打包构建文件...
cd apps\web-antd
tar -czf dist.tar.gz dist\
cd ..\..

REM 上传到服务器
echo 📤 上传文件到服务器...
scp apps\web-antd\dist.tar.gz %SERVER_USER%@%SERVER_IP%:/tmp/
if errorlevel 1 (
    echo ❌ 文件上传失败，请检查SSH连接
    pause
    exit /b 1
)

REM 在服务器上执行部署
echo 🔧 在服务器上部署...
ssh %SERVER_USER%@%SERVER_IP% "sudo mkdir -p /var/www/vben-admin && cd /tmp && tar -xzf dist.tar.gz && sudo rm -rf /var/www/vben-admin/dist.backup.* 2>/dev/null || true && test -d '/var/www/vben-admin/dist' && sudo mv /var/www/vben-admin/dist /var/www/vben-admin/dist.backup.$(date +%%Y%%m%%d_%%H%%M%%S) || true && sudo mv dist /var/www/vben-admin/ && sudo chown -R www-data:www-data /var/www/vben-admin && sudo chmod -R 755 /var/www/vben-admin && rm -f /tmp/dist.tar.gz && echo '✅ 文件部署完成'"

REM 重启Nginx
echo 🔄 重启Nginx...
ssh %SERVER_USER%@%SERVER_IP% "sudo systemctl reload nginx"

REM 清理本地临时文件
del apps\web-antd\dist.tar.gz

echo.
echo ✅ 部署完成!
echo 🌐 访问地址: http://%SERVER_IP%
echo 📋 查看状态: ssh %SERVER_USER%@%SERVER_IP% "sudo systemctl status nginx"
echo.
pause