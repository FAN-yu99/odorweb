document.addEventListener('DOMContentLoaded', function() {
    // DOM元素
    const resultSection = document.getElementById('result-section');
    const inputSection = document.getElementById('input-section');
    const resizer = document.getElementById('resizer');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const voiceInputButton = document.getElementById('voice-input');
    const conversationHistory = document.getElementById('conversation-history');
    const recommendation = document.getElementById('recommendation');
    const generatePerfumeButton = document.getElementById('generate-perfume');
    const formulaDisplay = document.getElementById('formula-display');
    const customFormulaSection = document.getElementById('custom-formula');
    const ingredientModal = document.getElementById('ingredient-modal');
    const modalIngredientName = document.getElementById('modal-ingredient-name');
    const modalIngredientDetails = document.getElementById('modal-ingredient-details');
    const closeModal = document.querySelector('.close-modal');
    const finalFormulaScreen = document.getElementById('final-formula-screen');
    const customizeButton = document.getElementById('customize-button');
    const backToFormulaButton = document.getElementById('back-to-formula');
    const optimizeCustomButton = document.getElementById('optimize-custom');
    const completeButton = document.getElementById('complete-button');
    const optimizeButton = document.getElementById('optimize-button');
    const startOverButton = document.getElementById('start-over');
    const welcomeMessage = document.querySelector('.welcome-message');
    const helpButton = document.getElementById('help-button');
    const helpModal = document.getElementById('help-modal');
    const closeHelpModal = document.querySelector('.close-help-modal');

    // 调整器功能
    let isResizing = false;
    let initialX;
    let initialLeftWidth;

    resizer.addEventListener('mousedown', function(e) {
        isResizing = true;
        initialX = e.clientX;
        initialLeftWidth = resultSection.offsetWidth;
        document.body.style.cursor = 'col-resize';
    });

    document.addEventListener('mousemove', function(e) {
        if (!isResizing) return;
        
        const containerWidth = resizer.parentNode.offsetWidth;
        const newLeftWidth = initialLeftWidth + (e.clientX - initialX);
        
        // 设置最小宽度限制
        const minWidth = 200;
        if (newLeftWidth > minWidth && (containerWidth - newLeftWidth) > minWidth) {
            const leftPercentage = (newLeftWidth / containerWidth) * 100;
            resultSection.style.width = `${leftPercentage}%`;
            inputSection.style.width = `${100 - leftPercentage}%`;
        }
    });

    document.addEventListener('mouseup', function() {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = 'default';
        }
    });

    // 发送消息功能
    sendButton.addEventListener('click', function() {
        sendMessage();
    });

    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // 添加用户消息到对话历史
        addMessageToHistory(message, 'user');
        
        // 清空输入框
        userInput.value = '';
        
        // 隐藏欢迎信息
        welcomeMessage.classList.add('hidden');
        
        // 模拟系统响应（在实际应用中，这里会有API调用）
        setTimeout(() => {
            // 模拟系统回复
            const systemResponse = simulateSystemResponse(message);
            
            // 添加系统回复到对话历史
            addMessageToHistory(systemResponse, 'system');
            
            // 显示推荐结果
            showRecommendation();
        }, 1000);
    }

    function addMessageToHistory(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = message;
        
        conversationHistory.appendChild(messageElement);
        conversationHistory.scrollTop = conversationHistory.scrollHeight;
    }

    function simulateSystemResponse(userMessage) {
        // 根据用户输入生成回复（实际应用中会有更复杂的逻辑）
        const responses = [
            "根据您的描述，我认为您可能喜欢带有花香调和柑橘香调的香水。",
            "您的气味偏好似乎倾向于木质调和东方调的组合。",
            "您描述的香味让我想到了带有清新海洋调和淡淡花香的组合。"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function showRecommendation() {
        recommendation.classList.remove('hidden');
        recommendation.innerHTML = `
            <p>根据您的描述，我为您推荐以下香调组合：</p>
            <ul>
                <li>前调：佛手柑、柠檬、橙花</li>
                <li>中调：茉莉、依兰依兰、玫瑰</li>
                <li>后调：雪松、檀香木、广藿香</li>
            </ul>
            <p>这款香水将带给您清新明亮的开场，随后转为优雅的花香，最后定格在温暖木质的基调。</p>
        `;
        
        generatePerfumeButton.classList.remove('hidden');
    }

    // 生成香水配方
    generatePerfumeButton.addEventListener('click', function() {
        recommendation.classList.add('hidden');
        generatePerfumeButton.classList.add('hidden');
        formulaDisplay.classList.remove('hidden');
        
        // 填充配方内容
        document.getElementById('ingredients').innerHTML = `
            <li data-ingredient="bergamot" data-percentage="15">
                <span class="ingredient-name">佛手柑</span>
                <span class="ingredient-percentage">15%</span>
            </li>
            <li data-ingredient="lemon" data-percentage="10">
                <span class="ingredient-name">柠檬</span>
                <span class="ingredient-percentage">10%</span>
            </li>
            <li data-ingredient="orange_blossom" data-percentage="8">
                <span class="ingredient-name">橙花</span>
                <span class="ingredient-percentage">8%</span>
            </li>
            <li data-ingredient="jasmine" data-percentage="18">
                <span class="ingredient-name">茉莉</span>
                <span class="ingredient-percentage">18%</span>
            </li>
            <li data-ingredient="ylang" data-percentage="12">
                <span class="ingredient-name">依兰依兰</span>
                <span class="ingredient-percentage">12%</span>
            </li>
            <li data-ingredient="rose" data-percentage="10">
                <span class="ingredient-name">玫瑰</span>
                <span class="ingredient-percentage">10%</span>
            </li>
            <li data-ingredient="cedarwood" data-percentage="12">
                <span class="ingredient-name">雪松</span>
                <span class="ingredient-percentage">12%</span>
            </li>
            <li data-ingredient="sandalwood" data-percentage="10">
                <span class="ingredient-name">檀香木</span>
                <span class="ingredient-percentage">10%</span>
            </li>
            <li data-ingredient="patchouli" data-percentage="5">
                <span class="ingredient-name">广藿香</span>
                <span class="ingredient-percentage">5%</span>
            </li>
        `;
        
        document.getElementById('fragrance-type').textContent = "花香调 / 柑橘调";
        document.getElementById('fragrance-structure').textContent = "前调：柑橘清新，中调：花香优雅，后调：木质温暖";
        document.getElementById('fragrance-description-text').textContent = "这款香水开始是明亮的柑橘香气，随后展现出优雅的花香，逐渐过渡到温暖的木质基调，整体感觉清新自然又不失优雅。";
        
        // 显示优化和完成按钮
        optimizeButton.classList.remove('hidden');
        completeButton.classList.remove('hidden');
        
        // 添加成分点击事件
        const ingredients = document.querySelectorAll('.ingredients-list li');
        ingredients.forEach(ingredient => {
            ingredient.addEventListener('click', function() {
                showIngredientDetails(this.dataset.ingredient, this.querySelector('.ingredient-name').textContent);
            });
        });
    });

    // 显示原料详情
    async function showIngredientDetails(ingredientId, ingredientName) {
        modalIngredientName.textContent = ingredientName;
        
        // 显示加载状态
        modalIngredientDetails.innerHTML = `
            <div class="loading-state">
                <p>正在加载原料信息...</p>
            </div>
        `;
        
        ingredientModal.classList.remove('hidden');
        
        try {
            // 从API获取原料详情
            const response = await fetch(`http://localhost:5000/api/ingredients/${encodeURIComponent(ingredientName)}`);
            
            if (response.ok) {
                const ingredient = await response.json();
                displayIngredientDetails(ingredient);
            } else {
                // 如果API不可用，使用本地数据
                console.warn('API不可用，使用本地数据');
                const details = getIngredientDetails(ingredientId);
                displayLocalIngredientDetails(ingredientName, details);
            }
        } catch (error) {
            console.error('获取原料信息失败:', error);
            // 回退到本地数据
            const details = getIngredientDetails(ingredientId);
            displayLocalIngredientDetails(ingredientName, details);
        }
    }

    // 显示从API获取的原料详情
    function displayIngredientDetails(ingredient) {
        const imageUrl = ingredient.image_url || '/images/ingredients/default.jpg';
        
        modalIngredientDetails.innerHTML = `
            <div class="ingredient-profile">
                <div class="ingredient-image">
                    <img src="${imageUrl}" alt="${ingredient.name}" 
                         onerror="this.src='/images/ingredients/default.jpg'">
                </div>
                <div class="ingredient-names">
                    <div class="name-group">
                        <label>中文名：</label>
                        <span>${ingredient.name}</span>
                    </div>
                    <div class="name-group">
                        <label>英文名：</label>
                        <span>${ingredient.name_en || '暂无'}</span>
                    </div>
                    <div class="name-group">
                        <label>阿拉伯名：</label>
                        <span class="arabic-text">${ingredient.name_ar || 'غير متوفر'}</span>
                    </div>
                </div>
                <div class="ingredient-details">
                    <p><strong>香调类别：</strong>${ingredient.category}</p>
                    <p><strong>子类别：</strong>${ingredient.subcategory || '暂无'}</p>
                    <p><strong>香味特点：</strong>${ingredient.characteristics}</p>
                    <p><strong>常见用途：</strong>${ingredient.uses}</p>
                    <p><strong>提取自：</strong>${ingredient.source}</p>
                    <div class="strength-longevity">
                        <div class="strength">
                            <label>香气强度：</label>
                            <div class="rating">
                                ${generateStarRating(ingredient.strength || 5)}
                                <span>(${ingredient.strength || 5}/10)</span>
                            </div>
                        </div>
                        <div class="longevity">
                            <label>持久度：</label>
                            <div class="rating">
                                ${generateStarRating(ingredient.longevity || 5)}
                                <span>(${ingredient.longevity || 5}/10)</span>
                            </div>
                        </div>
                    </div>
                    <p class="description">${ingredient.description}</p>
                </div>
            </div>
        `;
    }

    // 显示本地原料详情（API不可用时的备选方案）
    function displayLocalIngredientDetails(ingredientName, details) {
        modalIngredientDetails.innerHTML = `
            <div class="ingredient-profile">
                <div class="ingredient-image">
                    <img src="/images/ingredients/default.jpg" alt="${ingredientName}">
                </div>
                <div class="ingredient-names">
                    <div class="name-group">
                        <label>中文名：</label>
                        <span>${ingredientName}</span>
                    </div>
                    <div class="name-group">
                        <label>英文名：</label>
                        <span>${details.name_en || '暂无'}</span>
                    </div>
                    <div class="name-group">
                        <label>阿拉伯名：</label>
                        <span class="arabic-text">${details.name_ar || 'غير متوفر'}</span>
                    </div>
                </div>
                <div class="ingredient-details">
                    <p><strong>香调类别：</strong>${details.category}</p>
                    <p><strong>香味特点：</strong>${details.characteristics}</p>
                    <p><strong>常见用途：</strong>${details.uses}</p>
                    <p><strong>提取自：</strong>${details.source}</p>
                    <p class="description">${details.description}</p>
                </div>
            </div>
        `;
    }

    // 生成星级评分显示
    function generateStarRating(rating) {
        const fullStars = Math.floor(rating / 2);
        const halfStar = rating % 2;
        const emptyStars = 5 - fullStars - halfStar;
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '★';
        }
        if (halfStar) {
            stars += '☆';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '☆';
        }
        return stars;
    }

    function getIngredientDetails(ingredientId) {
        // 示例数据，实际应用中会从API获取
        const ingredientsData = {
            bergamot: {
                name_en: "Bergamot",
                name_ar: "برغموت",
                category: "柑橘调",
                characteristics: "清新、明亮、微苦",
                uses: "用于提供清新的顶部香气",
                source: "佛手柑果皮",
                description: "佛手柑精油带有独特的柑橘香气，同时混合了微妙的花香和辛辣的气息。它是经典古龙水不可或缺的成分，也是许多现代香水的重要组成部分。"
            },
            lemon: {
                name_en: "Lemon",
                name_ar: "ليمون",
                category: "柑橘调",
                characteristics: "酸甜、清新、明亮",
                uses: "用于提供活力四溢的顶部香气",
                source: "柠檬果皮",
                description: "柠檬精油提供了明亮愉悦的香气，能够给香水带来活力感。它通常作为前调使用，但因为其挥发性高，香气往往不会持续太久。"
            },
            orange_blossom: {
                name_en: "Orange Blossom",
                name_ar: "زهر البرتقال",
                category: "花香调",
                characteristics: "甜美、清新、温暖",
                uses: "优雅的中调成分",
                source: "苦橙树的花朵",
                description: "橙花油带有柔和甜美的花香，略带蜜糖气息。它是一种非常优雅的香气，能为香水增添温暖感和深度。"
            },
            jasmine: {
                name_en: "Jasmine",
                name_ar: "ياسمين",
                category: "花香调",
                characteristics: "浓郁、甜美、异国情调",
                uses: "珍贵的中调成分",
                source: "茉莉花",
                description: "茉莉花精油被称为'香水之王'，是许多高档香水的重要成分。它有着浓郁复杂的花香，同时带有一丝动物性的气息，能够为香水增添深度和性感感。"
            },
            ylang: {
                name_en: "Ylang Ylang",
                name_ar: "إيلانغ إيلانغ",
                category: "花香调",
                characteristics: "甜美、热带感、奶油质感",
                uses: "中调和后调的连接",
                source: "依兰依兰花",
                description: "依兰依兰有着独特的异国情调花香，带有甜美的奶油质感和微妙的水果气息。它能为香水带来温暖和柔和的感觉。"
            },
            rose: {
                name_en: "Rose",
                name_ar: "وردة",
                category: "花香调",
                characteristics: "优雅、浪漫、多层次",
                uses: "经典的中调成分",
                source: "玫瑰花瓣",
                description: "玫瑰精油是香水界最古老和最珍贵的原料之一。它的香气优雅复杂，有着多层次的花香，可以从清新绿意到甜美深沉，根据不同品种而有所差异。"
            },
            cedarwood: {
                name_en: "Cedarwood",
                name_ar: "خشب الأرز",
                category: "木质调",
                characteristics: "温暖、干燥、木质感",
                uses: "稳定的基调成分",
                source: "雪松木",
                description: "雪松精油有着温暖干燥的木质香气，带有一丝辛辣感。它是许多经典男香的基础，但在现代调香中也常用于中性和女性香水中。"
            },
            sandalwood: {
                name_en: "Sandalwood",
                name_ar: "خشب الصندل",
                category: "木质调",
                characteristics: "奶油质感、温暖、平衡",
                uses: "珍贵的基调成分",
                source: "檀香木心材",
                description: "檀香木有着独特的奶油木质香气，温暖而持久。它是一种珍贵的香料，能够为香水提供深度和持久度，同时具有良好的固香作用。"
            },
            patchouli: {
                name_en: "Patchouli",
                name_ar: "باتشولي",
                category: "东方调",
                characteristics: "土壤感、木质、深沉",
                uses: "持久的基调成分",
                source: "广藿香植物叶片",
                description: "广藿香有着独特的泥土气息和木质香气，带有一丝甜感。它在20世纪60年代嬉皮文化中变得流行，如今是许多东方调和木质调香水的重要成分。"
            }
        };
        
        // 为新增原料添加更多数据
        const additionalIngredientsData = {
            gardenia: {
                name_en: "Gardenia",
                name_ar: "الغاردينيا",
                category: "花香调",
                characteristics: "浓郁、奶油质感、甜美",
                uses: "中调的奢华成分",
                source: "栀子花",
                description: "栀子花有着浓郁的奶油花香，带有甜美和略带绿叶的气息。是一种珍贵的花香原料。"
            },
            lily_of_valley: {
                name_en: "Lily of the Valley",
                name_ar: "زنبق الوادي",
                category: "花香调",
                characteristics: "清新、绿叶感、春天气息",
                uses: "春季花香的经典成分",
                source: "铃兰花",
                description: "铃兰带有清新的春天气息，有着绿叶和花香的完美平衡，常用于清新花香调香水中。"
            },
            lavender: {
                name_en: "Lavender",
                name_ar: "الخزامى",
                category: "花香调",
                characteristics: "清香、舒缓、草本",
                uses: "平衡香调的经典成分",
                source: "薰衣草花",
                description: "薰衣草有着独特的草本花香，既清新又舒缓，是香水界最经典的原料之一。"
            },
            violet: {
                name_en: "Violet",
                name_ar: "البنفسج",
                category: "花香调",
                characteristics: "粉质、甜美、复古",
                uses: "复古花香调的重要成分",
                source: "紫罗兰花",
                description: "紫罗兰有着独特的粉质花香，带有甜美和略带脂粉的气息，常用于复古风格的香水中。"
            },
            vanilla: {
                name_en: "Vanilla",
                name_ar: "الفانيليا",
                category: "东方调",
                characteristics: "甜美、温暖、舒适",
                uses: "基调的甜美成分",
                source: "香草豆荚",
                description: "香草是最受欢迎的甜美原料，带有温暖舒适的气息，能为香水增添亲和力。"
            },
            amber: {
                name_en: "Amber",
                name_ar: "العنبر",
                category: "东方调",
                characteristics: "温暖、树脂感、神秘",
                uses: "东方调的经典基调",
                source: "琥珀树脂",
                description: "琥珀有着温暖的树脂香气，带有神秘和深沉的气息，是东方调香水的重要成分。"
            },
            musk: {
                name_en: "Musk",
                name_ar: "المسك",
                category: "动物调",
                characteristics: "温暖、性感、持久",
                uses: "增强香水魅力的基调",
                source: "麝香",
                description: "麝香有着独特的动物性香气，既温暖又性感，能够增强香水的魅力和持久度。"
            }
        };

        return ingredientsData[ingredientId] || additionalIngredientsData[ingredientId] || {
            name_en: "Unknown",
            name_ar: "غير معروف",
            category: "未分类",
            characteristics: "暂无数据",
            uses: "多用途",
            source: "多种来源",
            description: "暂无详细描述"
        };
    }

    // 关闭模态框
    closeModal.addEventListener('click', function() {
        ingredientModal.classList.add('hidden');
    });

    ingredientModal.addEventListener('click', function(e) {
        if (e.target === ingredientModal) {
            ingredientModal.classList.add('hidden');
        }
    });

    // 帮助功能
    helpButton.addEventListener('click', function() {
        helpModal.classList.remove('hidden');
    });

    closeHelpModal.addEventListener('click', function() {
        helpModal.classList.add('hidden');
    });

    helpModal.addEventListener('click', function(e) {
        if (e.target === helpModal) {
            helpModal.classList.add('hidden');
        }
    });

    // 自定义配方功能
    customizeButton.addEventListener('click', function() {
        formulaDisplay.classList.add('hidden');
        customFormulaSection.classList.remove('hidden');
        
        // 填充各香调类别的原料（实际应用中会从数据库获取）
        populateCategoryIngredients();
    });

    function populateCategoryIngredients() {
        // 示例数据
        const ingredientsByCategory = {
            flower: ["茉莉", "玫瑰", "依兰依兰", "栀子花", "铃兰", "薰衣草", "紫罗兰", "橙花", "晚香玉"],
            fruit: ["佛手柑", "柠檬", "苹果", "梨", "桃子", "黑醋栗", "覆盆子", "菠萝", "葡萄柚"],
            woody: ["雪松", "檀香木", "广藿香", "香根草", "乳香", "没药", "松木", "柏木", "沉香"],
            marine: ["海盐", "海洋气息", "海藻", "鸢尾根", "水莲花", "水仙子"],
            oriental: ["香草", "琥珀", "麝香", "肉桂", "丁香", "豆蔻", "辣椒", "咖啡", "烟草"],
            gourmand: ["焦糖", "杏仁", "可可", "椰子", "奶油", "蜂蜜", "棉花糖", "朗姆酒", "巧克力"]
        };
        
        // 填充所有类别
        for (const category in ingredientsByCategory) {
            const categoryContainer = document.querySelector(`.category[data-category="${category}"] .category-ingredients`);
            categoryContainer.innerHTML = '';
            
            ingredientsByCategory[category].forEach(ingredient => {
                const chip = document.createElement('div');
                chip.classList.add('ingredient-chip');
                chip.textContent = ingredient;
                chip.title = "左键选择/取消选择，右键查看详情"; // 添加提示
                
                // 左键点击：选择/取消选择原料
                chip.addEventListener('click', function(e) {
                    e.preventDefault();
                    this.classList.toggle('selected');
                });
                
                // 右键点击：显示原料详情
                chip.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                    const ingredientId = getIngredientIdByName(ingredient);
                    showIngredientDetails(ingredientId, ingredient);
                });
                
                // 双击：显示原料详情（移动设备友好）
                chip.addEventListener('dblclick', function(e) {
                    e.preventDefault();
                    const ingredientId = getIngredientIdByName(ingredient);
                    showIngredientDetails(ingredientId, ingredient);
                });
                
                categoryContainer.appendChild(chip);
            });
        }
    }

    // 根据原料名称获取对应的ID（用于查询详情）
    function getIngredientIdByName(ingredientName) {
        // 名称到ID的映射
        const nameToIdMap = {
            '茉莉': 'jasmine',
            '玫瑰': 'rose',
            '依兰依兰': 'ylang',
            '橙花': 'orange_blossom',
            '佛手柑': 'bergamot',
            '柠檬': 'lemon',
            '雪松': 'cedarwood',
            '檀香木': 'sandalwood',
            '广藿香': 'patchouli',
            // 对于没有具体映射的原料，使用通用ID
            '栀子花': 'gardenia',
            '铃兰': 'lily_of_valley',
            '薰衣草': 'lavender',
            '紫罗兰': 'violet',
            '晚香玉': 'tuberose',
            '苹果': 'apple',
            '梨': 'pear',
            '桃子': 'peach',
            '黑醋栗': 'blackcurrant',
            '覆盆子': 'raspberry',
            '菠萝': 'pineapple',
            '葡萄柚': 'grapefruit',
            '香根草': 'vetiver',
            '乳香': 'frankincense',
            '没药': 'myrrh',
            '松木': 'pine',
            '柏木': 'cypress',
            '沉香': 'agarwood',
            '海盐': 'sea_salt',
            '海洋气息': 'marine',
            '海藻': 'seaweed',
            '鸢尾根': 'iris',
            '水莲花': 'water_lily',
            '水仙子': 'narcissus',
            '香草': 'vanilla',
            '琥珀': 'amber',
            '麝香': 'musk',
            '肉桂': 'cinnamon',
            '丁香': 'clove',
            '豆蔻': 'cardamom',
            '辣椒': 'pepper',
            '咖啡': 'coffee',
            '烟草': 'tobacco',
            '焦糖': 'caramel',
            '杏仁': 'almond',
            '可可': 'cocoa',
            '椰子': 'coconut',
            '奶油': 'cream',
            '蜂蜜': 'honey',
            '棉花糖': 'marshmallow',
            '朗姆酒': 'rum',
            '巧克力': 'chocolate'
        };
        
        return nameToIdMap[ingredientName] || 'unknown';
    }

    // 返回配方显示
    backToFormulaButton.addEventListener('click', function() {
        customFormulaSection.classList.add('hidden');
        formulaDisplay.classList.remove('hidden');
    });

    // 优化自定义配方
    optimizeCustomButton.addEventListener('click', function() {
        // 选择所有被选中的原料
        const selectedIngredients = document.querySelectorAll('.ingredient-chip.selected');
        if (selectedIngredients.length === 0) {
            alert('请至少选择一种原料');
            return;
        }
        
        customFormulaSection.classList.add('hidden');
        formulaDisplay.classList.remove('hidden');
        
        // 在实际应用中，这里会有API调用，根据选择的原料生成优化配方
        // 这里使用示例数据更新显示
        updateFormulaWithCustomIngredients(selectedIngredients);
    });

    function updateFormulaWithCustomIngredients(selectedIngredients) {
        // 清空现有配方
        document.getElementById('ingredients').innerHTML = '';
        
        // 获取所有选中成分的名称
        const ingredientNames = Array.from(selectedIngredients).map(el => el.textContent);
        
        // 为每个成分分配随机百分比（实际应用中会有更复杂的算法）
        let totalPercentage = 0;
        const ingredients = [];
        
        ingredientNames.forEach(name => {
            // 为每个成分生成5%-20%之间的随机百分比
            const percentage = Math.floor(Math.random() * 16) + 5;
            ingredients.push({ name, percentage });
            totalPercentage += percentage;
        });
        
        // 调整百分比使总和为100%
        const adjustmentFactor = 100 / totalPercentage;
        let adjustedTotal = 0;
        
        ingredients.forEach((item, index) => {
            // 对于最后一个成分，确保总和正好是100%
            if (index === ingredients.length - 1) {
                item.percentage = 100 - adjustedTotal;
            } else {
                item.percentage = Math.round(item.percentage * adjustmentFactor);
                adjustedTotal += item.percentage;
            }
            
            // 创建新的列表项
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="ingredient-name">${item.name}</span>
                <span class="ingredient-percentage">${item.percentage}%</span>
            `;
            
            // 为生成的配方成分也添加点击事件
            li.addEventListener('click', function() {
                const ingredientId = getIngredientIdByName(item.name);
                showIngredientDetails(ingredientId, item.name);
            });
            
            // 添加点击事件
            li.addEventListener('click', function() {
                showIngredientDetails('custom', item.name);
            });
            
            document.getElementById('ingredients').appendChild(li);
        });
        
        // 更新香调信息
        updateFragranceProfile(ingredients);
    }

    function updateFragranceProfile(ingredients) {
        // 根据成分确定香调类型（在实际应用中会有更复杂的逻辑）
        const fragranceCategories = [];
        
        // 示例逻辑，实际应用中会更复杂
        const flowerIngredients = ["茉莉", "玫瑰", "依兰依兰", "栀子花", "铃兰", "薰衣草", "紫罗兰", "橙花", "晚香玉"];
        const fruitIngredients = ["佛手柑", "柠檬", "苹果", "梨", "桃子", "黑醋栗", "覆盆子", "菠萝", "葡萄柚"];
        const woodyIngredients = ["雪松", "檀香木", "广藿香", "香根草", "乳香", "没药", "松木", "柏木", "沉香"];
        
        // 检查是否包含花香调
        if (ingredients.some(item => flowerIngredients.includes(item.name))) {
            fragranceCategories.push("花香调");
        }
        
        // 检查是否包含果香调
        if (ingredients.some(item => fruitIngredients.includes(item.name))) {
            fragranceCategories.push("果香调");
        }
        
        // 检查是否包含木质调
        if (ingredients.some(item => woodyIngredients.includes(item.name))) {
            fragranceCategories.push("木质调");
        }
        
        // 如果没有匹配的类别，则设为混合调
        if (fragranceCategories.length === 0) {
            fragranceCategories.push("混合调");
        }
        
        document.getElementById('fragrance-type').textContent = fragranceCategories.join(" / ");
        
        // 生成香调结构描述（实际应用中会更准确）
        document.getElementById('fragrance-structure').textContent = "前调：明亮清新，中调：香气丰富，后调：持久温暖";
        
        // 生成香味描述
        document.getElementById('fragrance-description-text').textContent = `这款个性化香水融合了${ingredients.slice(0, 3).map(i => i.name).join('、')}等${ingredients.length}种成分，创造出独特的香气体验。每一种成分都经过精心配比，确保香水在不同阶段展现最佳的香气表现。`;
    }

    // 完成配置按钮功能
    completeButton.addEventListener('click', function() {
        // 播放混合动画（实际应用中可能会有CSS动画）
        showMixingAnimation().then(() => {
            // 显示最终配方
            showFinalFormula();
        });
    });

    function showMixingAnimation() {
        // 这里只是一个简单的延时模拟动画
        // 实际应用中可以使用CSS动画或JavaScript动画库
        return new Promise(resolve => {
            document.body.classList.add('mixing-animation');
            setTimeout(() => {
                document.body.classList.remove('mixing-animation');
                resolve();
            }, 2000);
        });
    }

    function showFinalFormula() {
        // 获取当前配方信息
        const fragranceType = document.getElementById('fragrance-type').textContent;
        const fragranceStructure = document.getElementById('fragrance-structure').textContent;
        const fragranceDescription = document.getElementById('fragrance-description-text').textContent;
        
        // 更新最终页面显示
        document.getElementById('final-fragrance-type').textContent = fragranceType;
        document.getElementById('final-fragrance-structure').textContent = fragranceStructure;
        document.getElementById('final-fragrance-description').textContent = fragranceDescription;
        
        // 显示最终页面
        finalFormulaScreen.classList.remove('hidden');
    }

    // 重新开始
    startOverButton.addEventListener('click', function() {
        // 重置界面状态
        finalFormulaScreen.classList.add('hidden');
        formulaDisplay.classList.add('hidden');
        customFormulaSection.classList.add('hidden');
        recommendation.classList.add('hidden');
        generatePerfumeButton.classList.add('hidden');
        welcomeMessage.classList.remove('hidden');
        
        // 清空对话历史
        conversationHistory.innerHTML = '';
        
        // 清空输入框
        userInput.value = '';
    });

    // 语音输入功能（示例，实际应用需要使用Web Speech API）
    voiceInputButton.addEventListener('click', function() {
        // 检查浏览器是否支持语音识别
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            recognition.lang = 'zh-CN';
            recognition.continuous = false;
            recognition.interimResults = false;
            
            recognition.onstart = function() {
                voiceInputButton.querySelector('.material-icons').textContent = 'mic_none';
                voiceInputButton.classList.add('recording');
            };
            
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                userInput.value = transcript;
            };
            
            recognition.onend = function() {
                voiceInputButton.querySelector('.material-icons').textContent = 'mic';
                voiceInputButton.classList.remove('recording');
            };
            
            recognition.onerror = function(event) {
                console.error('语音识别错误:', event.error);
                voiceInputButton.querySelector('.material-icons').textContent = 'mic';
                voiceInputButton.classList.remove('recording');
            };
            
            recognition.start();
        } else {
            alert('您的浏览器不支持语音识别功能');
        }
    });

    // 一键优化功能
    optimizeButton.addEventListener('click', function() {
        // 模拟优化过程（实际应用中会有API调用）
        alert('正在优化配方...');
        
        setTimeout(() => {
            // 更新配方（示例）
            document.getElementById('ingredients').innerHTML = `
                <li data-ingredient="bergamot" data-percentage="12">
                    <span class="ingredient-name">佛手柑</span>
                    <span class="ingredient-percentage">12%</span>
                </li>
                <li data-ingredient="lemon" data-percentage="8">
                    <span class="ingredient-name">柠檬</span>
                    <span class="ingredient-percentage">8%</span>
                </li>
                <li data-ingredient="orange_blossom" data-percentage="10">
                    <span class="ingredient-name">橙花</span>
                    <span class="ingredient-percentage">10%</span>
                </li>
                <li data-ingredient="jasmine" data-percentage="20">
                    <span class="ingredient-name">茉莉</span>
                    <span class="ingredient-percentage">20%</span>
                </li>
                <li data-ingredient="ylang" data-percentage="15">
                    <span class="ingredient-name">依兰依兰</span>
                    <span class="ingredient-percentage">15%</span>
                </li>
                <li data-ingredient="rose" data-percentage="10">
                    <span class="ingredient-name">玫瑰</span>
                    <span class="ingredient-percentage">10%</span>
                </li>
                <li data-ingredient="cedarwood" data-percentage="10">
                    <span class="ingredient-name">雪松</span>
                    <span class="ingredient-percentage">10%</span>
                </li>
                <li data-ingredient="sandalwood" data-percentage="10">
                    <span class="ingredient-name">檀香木</span>
                    <span class="ingredient-percentage">10%</span>
                </li>
                <li data-ingredient="patchouli" data-percentage="5">
                    <span class="ingredient-name">广藿香</span>
                    <span class="ingredient-percentage">5%</span>
                </li>
            `;
            
            document.getElementById('fragrance-description-text').textContent = "经过优化的配方使香水的层次感更加丰富，前调更为清新明亮，中调花香更加持久，后调木质香更加温暖协调。整体香气更加平衡，留香时间更长。";
            
            // 添加成分点击事件
            const ingredients = document.querySelectorAll('.ingredients-list li');
            ingredients.forEach(ingredient => {
                ingredient.addEventListener('click', function() {
                    showIngredientDetails(this.dataset.ingredient, this.querySelector('.ingredient-name').textContent);
                });
            });
            
            alert('配方已优化完成！');
        }, 1500);
    });
}); 