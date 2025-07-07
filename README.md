# 香水定制系统 - 原料信息展示功能

## 功能概述

此更新为香水定制系统添加了丰富的原料信息展示功能。当用户点击配方成分时，不仅会显示基本信息，还会展示：

- ✅ **英文名称** - 原料的国际通用名称
- ✅ **阿拉伯名称** - 原料的阿拉伯语名称
- ✅ **原料图片** - 可视化的原料图像
- ✅ **香气强度** - 1-10分的星级评分
- ✅ **持久度** - 1-10分的星级评分
- ✅ **子类别** - 更细致的分类信息

## 系统架构

### 1. 数据库结构
- **ingredients表** 已扩展，新增字段：
  - `name_ar` - 阿拉伯名称
  - `image_url` - 图片路径
  - `subcategory` - 子类别
  - `strength` - 香气强度
  - `longevity` - 持久度

### 2. 后端API (ingredient_api.py)
- **Flask服务器** 提供原料数据API
- **跨域支持** 允许前端访问
- **多语言查询** 支持中文、英文、阿拉伯文搜索

### 3. 前端增强 (script.js)
- **异步数据获取** 从API动态加载原料信息
- **回退机制** API不可用时使用本地数据
- **丰富UI** 包含图片、多语言名称、评分显示

### 4. 样式更新 (styles.css)
- **响应式设计** 适配不同屏幕尺寸
- **阿拉伯文支持** 正确的RTL文本显示
- **图片展示** 圆形头像样式
- **评分显示** 星级评分组件

## 文件结构

```
web/
├── index.html              # 主页面
├── script.js              # 前端逻辑（已更新）
├── styles.css             # 样式表（已更新）
├── perfume_system.db      # SQLite数据库（已扩展）
├── ingredient_api.py      # Flask API服务器（新增）
├── update_database.py     # 数据库更新脚本（新增）
├── create_placeholder_images.py  # 图片生成脚本（新增）
├── create_default_image.py       # 默认图片生成（新增）
├── start_system.py        # 系统启动脚本（新增）
└── images/
    └── ingredients/       # 原料图片目录
        ├── rose.jpg
        ├── jasmine.jpg
        ├── bergamot.jpg
        └── ...
```

## 快速开始

### 方法1: 一键启动（推荐）
```bash
python start_system.py
```

### 方法2: 手动启动
1. **更新数据库**
   ```bash
   python update_database.py
   ```

2. **创建图片**
   ```bash
   python create_placeholder_images.py
   python create_default_image.py
   ```

3. **启动API服务器**
   ```bash
   python ingredient_api.py
   ```

4. **打开浏览器访问**
   ```
   file:///path/to/your/project/index.html
   ```

## 使用说明

### 查看原料详情

#### 配方展示界面
1. 在配方展示界面，直接点击任意配方成分
2. 弹窗将显示完整的原料信息

#### 自由定制界面  
1. **右键点击**原料芯片查看详情
2. **双击**原料芯片查看详情（移动设备友好）
3. **左键点击**选择/取消选择原料

#### 原料详情包含
- 🖼️ 圆形原料图片
- 🌍 中文、英文、阿拉伯文名称
- 📊 香调类别和子类别
- ⭐ 香气强度和持久度评分（星级显示）
- 📝 香味特点、用途和详细描述

#### 使用提示
- 点击右下角的帮助按钮 (?) 查看详细使用说明
- 原料芯片悬停时会显示🔍图标提示可查看详情

### API端点
- `GET /api/ingredients/<name>` - 获取特定原料详情
- `GET /api/ingredients` - 获取所有原料列表
- `GET /api/ingredients/search?q=<query>&category=<category>` - 搜索原料

## 技术特性

### 多语言支持
- **中文** - 主要界面语言
- **英文** - 国际标准名称
- **阿拉伯文** - RTL文本显示支持

### 响应式设计
- 桌面端完整体验
- 移动端友好适配
- 自适应布局

### 错误处理
- API不可用时自动回退到本地数据
- 图片加载失败时显示默认图片
- 用户友好的错误提示

### 性能优化
- 图片懒加载
- 数据缓存
- 异步请求

## 数据库示例

### 原料记录示例
```sql
INSERT INTO ingredients (
    name, name_en, name_ar, category, subcategory,
    characteristics, description, source, uses,
    strength, longevity, price_per_ml, image_url
) VALUES (
    '玫瑰', 'Rose', 'وردة', '花香调', '经典花香',
    '优雅、浪漫、多层次', '玫瑰精油是香水界最古老和最珍贵的原料之一...',
    '玫瑰花瓣', '经典的中调成分', 8, 7, 15.0,
    '/images/ingredients/rose.jpg'
);
```

## 自定义扩展

### 添加新原料
1. 在数据库中插入新记录
2. 添加对应的图片文件
3. 重启API服务器

### 修改界面样式
1. 编辑 `styles.css` 中的相关类
2. 刷新浏览器查看效果

### 扩展API功能
1. 在 `ingredient_api.py` 中添加新的路由
2. 在前端JavaScript中调用新的端点

## 依赖包

- `Flask` - Web服务器框架
- `Flask-CORS` - 跨域支持
- `Pillow` - 图片处理
- `sqlite3` - 数据库（Python内置）

## 故障排除

### 常见问题

1. **API服务器启动失败**
   - 检查端口5000是否被占用
   - 确认Flask已正确安装

2. **图片无法显示**
   - 检查images/ingredients目录是否存在
   - 运行create_default_image.py创建默认图片

3. **数据库错误**
   - 运行update_database.py更新数据库结构
   - 检查perfume_system.db文件权限

4. **浏览器跨域错误**
   - 确认API服务器正在运行
   - 检查Flask-CORS是否正确配置

### 联系支持
如有问题，请检查控制台错误信息并参考上述故障排除指南。

---

## 更新日志

### v2.1.0 (当前版本)
- ✅ 添加多语言原料名称支持
- ✅ 集成原料图片展示
- ✅ 新增香气强度和持久度评分
- ✅ 实现Flask API后端
- ✅ **自由定制界面原料详情支持**
- ✅ **右键/双击查看原料详情**
- ✅ **内置使用帮助系统**
- ✅ 优化用户界面体验
- ✅ 添加完整的错误处理机制 