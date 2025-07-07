#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import subprocess
import sys
import time
import webbrowser
from pathlib import Path

def check_dependencies():
    """检查依赖包"""
    required_packages = ['flask', 'flask-cors', 'pillow']
    
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
        except ImportError:
            print(f"正在安装缺失的包: {package}")
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', package])

def start_api_server():
    """启动API服务器"""
    print("启动原料API服务器...")
    try:
        process = subprocess.Popen([sys.executable, 'ingredient_api.py'], 
                                 stdout=subprocess.PIPE, 
                                 stderr=subprocess.PIPE)
        return process
    except Exception as e:
        print(f"启动API服务器失败: {e}")
        return None

def main():
    print("=== 香水定制系统启动 ===")
    print()
    
    # 检查依赖
    print("1. 检查依赖包...")
    check_dependencies()
    print("✓ 依赖包检查完成")
    
    # 检查数据库
    print("\n2. 检查数据库...")
    if Path('perfume_system.db').exists():
        print("✓ 数据库文件存在")
    else:
        print("❌ 数据库文件不存在，请先运行数据库初始化脚本")
        return
    
    # 检查图片目录
    print("\n3. 检查图片目录...")
    images_dir = Path('images/ingredients')
    if images_dir.exists():
        image_count = len(list(images_dir.glob('*.jpg')))
        print(f"✓ 图片目录存在，包含 {image_count} 张图片")
    else:
        print("⚠ 图片目录不存在，创建中...")
        images_dir.mkdir(parents=True, exist_ok=True)
        subprocess.run([sys.executable, 'create_default_image.py'])
    
    # 启动API服务器
    print("\n4. 启动API服务器...")
    api_process = start_api_server()
    
    if api_process:
        print("✓ API服务器启动成功")
        print("   服务地址: http://localhost:5000")
        
        # 等待服务器启动
        print("\n5. 等待服务器准备就绪...")
        time.sleep(3)
        
        # 打开浏览器
        print("\n6. 打开浏览器...")
        try:
            webbrowser.open('file://' + str(Path('index.html').absolute()))
            print("✓ 浏览器已打开")
        except Exception as e:
            print(f"⚠ 无法自动打开浏览器: {e}")
            print(f"请手动打开: file://{Path('index.html').absolute()}")
        
        print("\n=== 系统启动完成 ===")
        print("使用说明:")
        print("1. 在右侧输入框描述您想要的香水气味")
        print("2. 点击配方成分查看详细信息（包括英文名、阿拉伯名和图片）")
        print("3. 使用自由定制功能创建个性化配方")
        print("\n按 Ctrl+C 停止服务器")
        
        try:
            api_process.wait()
        except KeyboardInterrupt:
            print("\n正在停止服务器...")
            api_process.terminate()
            api_process.wait()
            print("✓ 服务器已停止")
    else:
        print("❌ API服务器启动失败")
        print("请检查是否有其他程序占用端口5000")

if __name__ == "__main__":
    main() 