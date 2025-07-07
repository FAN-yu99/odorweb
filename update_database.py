import sqlite3

def update_ingredients_table():
    """更新ingredients表，添加阿拉伯名和图片字段"""
    conn = sqlite3.connect('perfume_system.db')
    cursor = conn.cursor()
    
    try:
        # 检查是否已经存在name_ar和image_url字段
        cursor.execute("PRAGMA table_info(ingredients)")
        columns = [col[1] for col in cursor.fetchall()]
        
        if 'name_ar' not in columns:
            cursor.execute("ALTER TABLE ingredients ADD COLUMN name_ar VARCHAR(100)")
            print("✓ 已添加阿拉伯名字段 (name_ar)")
        
        if 'image_url' not in columns:
            cursor.execute("ALTER TABLE ingredients ADD COLUMN image_url VARCHAR(255)")
            print("✓ 已添加图片URL字段 (image_url)")
        
        # 更新现有数据，添加阿拉伯名和图片URL
        ingredients_data = [
            (1, 'وردة', '/images/ingredients/rose.jpg'),
            (2, 'ياسمين', '/images/ingredients/jasmine.jpg'),
            (3, 'إيلانغ إيلانغ', '/images/ingredients/ylang-ylang.jpg'),
            (4, 'برغموت', '/images/ingredients/bergamot.jpg'),
            (5, 'ليمون', '/images/ingredients/lemon.jpg'),
            (6, 'زهر البرتقال', '/images/ingredients/orange-blossom.jpg'),
            (7, 'خشب الأرز', '/images/ingredients/cedarwood.jpg'),
            (8, 'خشب الصندل', '/images/ingredients/sandalwood.jpg'),
            (9, 'باتشولي', '/images/ingredients/patchouli.jpg'),
        ]
        
        for ingredient_id, name_ar, image_url in ingredients_data:
            cursor.execute("""
                UPDATE ingredients 
                SET name_ar = ?, image_url = ? 
                WHERE id = ?
            """, (name_ar, image_url, ingredient_id))
        
        conn.commit()
        print("✓ 已更新现有原料的阿拉伯名和图片URL")
        
        # 如果需要添加更多原料数据
        add_more_ingredients(cursor)
        conn.commit()
        
    except Exception as e:
        print(f"更新失败: {e}")
        conn.rollback()
    finally:
        conn.close()

def add_more_ingredients(cursor):
    """添加更多原料数据"""
    additional_ingredients = [
        ('佛手柑', 'Bergamot', 'برغموت', '柑橘调', '柑橘', '清新、明亮、微苦', 
         '佛手柑精油带有独特的柑橘香气，同时混合了微妙的花香和辛辣的气息。', 
         '佛手柑果皮', '用于提供清新的顶部香气', 7, 4, 10.0, 
         '/images/ingredients/bergamot.jpg'),
        ('柠檬', 'Lemon', 'ليمون', '柑橘调', '柑橘', '酸甜、清新、明亮',
         '柠檬精油提供了明亮愉悦的香气，能够给香水带来活力感。',
         '柠檬果皮', '用于提供活力四溢的顶部香气', 6, 3, 8.0,
         '/images/ingredients/lemon.jpg'),
        ('橙花', 'Orange Blossom', 'زهر البرتقال', '花香调', '白花香', '甜美、清新、温暖',
         '橙花油带有柔和甜美的花香，略带蜜糖气息。',
         '苦橙树的花朵', '优雅的中调成分', 7, 6, 18.0,
         '/images/ingredients/orange-blossom.jpg'),
        ('雪松', 'Cedarwood', 'خشب الأرز', '木质调', '温和木质', '温暖、干燥、木质感',
         '雪松精油有着温暖干燥的木质香气，带有一丝辛辣感。',
         '雪松木', '稳定的基调成分', 6, 8, 12.0,
         '/images/ingredients/cedarwood.jpg'),
        ('檀香木', 'Sandalwood', 'خشب الصندل', '木质调', '奶油木质', '奶油质感、温暖、平衡',
         '檀香木有着独特的奶油木质香气，温暖而持久。',
         '檀香木心材', '珍贵的基调成分', 8, 9, 25.0,
         '/images/ingredients/sandalwood.jpg'),
        ('广藿香', 'Patchouli', 'باتشولي', '东方调', '土质', '土壤感、木质、深沉',
         '广藿香有着独特的泥土气息和木质香气，带有一丝甜感。',
         '广藿香植物叶片', '持久的基调成分', 9, 9, 15.0,
         '/images/ingredients/patchouli.jpg'),
    ]
    
    # 检查这些原料是否已经存在
    for ingredient in additional_ingredients:
        cursor.execute("SELECT id FROM ingredients WHERE name = ?", (ingredient[0],))
        if not cursor.fetchone():
            cursor.execute("""
                INSERT INTO ingredients (
                    name, name_en, name_ar, category, subcategory, 
                    characteristics, description, source, uses, 
                    strength, longevity, price_per_ml, image_url,
                    is_active, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, datetime('now'))
            """, ingredient)
            print(f"✓ 已添加原料: {ingredient[0]}")

if __name__ == "__main__":
    update_ingredients_table()
    print("\n数据库更新完成！") 