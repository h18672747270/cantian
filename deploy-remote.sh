#!/bin/bash
set -e

# 服务器配置
SERVER_IP="8.148.237.148"
SERVER_USER="root"
PROJECT_NAME="cantian"
REMOTE_PATH="/var/www/${PROJECT_NAME}"

echo "🚀 开始部署到远程服务器 ${SERVER_IP}..."

# 检查SSH连接
echo "🔍 检查SSH连接..."
ssh -o ConnectTimeout=10 ${SERVER_USER}@${SERVER_IP} "echo '✅ SSH连接成功'" || {
    echo "❌ SSH连接失败，请检查:"
    echo "   1. 服务器IP是否正确: ${SERVER_IP}"
    echo "   2. SSH密钥是否已配置"
    echo "   3. 服务器是否开放22端口"
    exit 1
}

# 本地构建项目
echo "🔨 本地构建项目..."
pnpm install
pnpm run build:prod

# 检查构建结果
if [ ! -d "dist" ]; then
    echo "❌ 构建失败，dist目录不存在"
    exit 1
fi

# 创建部署包
echo "📦 创建部署包..."
tar -czf deploy.tar.gz dist/ docker-compose.yml default.conf

# 上传到服务器
echo "📤 上传文件到服务器..."
scp deploy.tar.gz ${SERVER_USER}@${SERVER_IP}:/tmp/

# 在服务器上执行部署命令
echo "🔧 在服务器上部署..."
ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
    # 创建目标目录
    mkdir -p /workspace/hlzx/test
    cd /tmp
    
    # 解压文件
    tar -xzf deploy.tar.gz
    
    # 备份旧文件（如果存在）
    if [ -d "/workspace/hlzx/test/dist" ]; then
        mv /workspace/hlzx/test/dist /workspace/hlzx/test/dist.backup.$(date +%Y%m%d_%H%M%S)
    fi
    
    # 移动新文件到Nginx配置的目录
    mv dist /workspace/hlzx/test/
    chmod -R 755 /workspace/hlzx/test/dist
    
    # 清理临时文件
    rm -f /tmp/deploy.tar.gz
    
    echo "✅ 文件部署完成"
EOF

# 清理本地临时文件
rm -f deploy.tar.gz

echo "🔄 重启Nginx..."
ssh ${SERVER_USER}@${SERVER_IP} "systemctl restart nginx || service nginx restart"

echo "✅ 部署完成!"
echo "🌐 访问地址: http://${SERVER_IP}"
echo "📋 查看Nginx状态: ssh ${SERVER_USER}@${SERVER_IP} 'systemctl status nginx'"