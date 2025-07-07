from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import json

app = Flask(__name__)
CORS(app)  # 允许跨域请求

def get_db_connection():
    """获取数据库连接"""
    conn = sqlite3.connect('perfume_system.db')
    conn.row_factory = sqlite3.Row  # 使结果可以像字典一样访问
    return conn

@app.route('/api/ingredients/<ingredient_name>', methods=['GET'])
def get_ingredient_details(ingredient_name):
    """根据原料名称获取详细信息"""
    conn = get_db_connection()
    
    try:
        # 首先尝试通过中文名查找
        ingredient = conn.execute(
            'SELECT * FROM ingredients WHERE name = ? AND is_active = 1',
            (ingredient_name,)
        ).fetchone()
        
        # 如果没找到，尝试通过英文名查找
        if not ingredient:
            ingredient = conn.execute(
                'SELECT * FROM ingredients WHERE name_en = ? AND is_active = 1',
                (ingredient_name,)
            ).fetchone()
        
        if ingredient:
            # 转换为字典
            ingredient_dict = dict(ingredient)
            return jsonify(ingredient_dict)
        else:
            return jsonify({'error': '未找到该原料'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/ingredients', methods=['GET'])
def get_all_ingredients():
    """获取所有原料列表"""
    conn = get_db_connection()
    
    try:
        ingredients = conn.execute(
            'SELECT * FROM ingredients WHERE is_active = 1 ORDER BY name'
        ).fetchall()
        
        ingredients_list = [dict(ingredient) for ingredient in ingredients]
        return jsonify(ingredients_list)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/ingredients/search', methods=['GET'])
def search_ingredients():
    """搜索原料"""
    query = request.args.get('q', '')
    category = request.args.get('category', '')
    
    conn = get_db_connection()
    
    try:
        sql = 'SELECT * FROM ingredients WHERE is_active = 1'
        params = []
        
        if query:
            sql += ' AND (name LIKE ? OR name_en LIKE ? OR name_ar LIKE ?)'
            params.extend([f'%{query}%', f'%{query}%', f'%{query}%'])
        
        if category:
            sql += ' AND category = ?'
            params.append(category)
        
        sql += ' ORDER BY name'
        
        ingredients = conn.execute(sql, params).fetchall()
        ingredients_list = [dict(ingredient) for ingredient in ingredients]
        return jsonify(ingredients_list)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

if __name__ == '__main__':
    print("启动原料API服务...")
    print("API端点:")
    print("- GET /api/ingredients/<name> - 获取特定原料详情")
    print("- GET /api/ingredients - 获取所有原料")
    print("- GET /api/ingredients/search?q=<query>&category=<category> - 搜索原料")
    
    app.run(debug=True, port=5000) 