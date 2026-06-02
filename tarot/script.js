function isEditableTarget(target) {
    if (!target) return false;
    const tag = (target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return true;
    if (tag === 'select') return true;
    return !!target.isContentEditable;
}

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('dragstart', e => e.preventDefault());
document.addEventListener('copy', e => {
    if (!isEditableTarget(e.target)) e.preventDefault();
});
document.addEventListener('cut', e => {
    if (!isEditableTarget(e.target)) e.preventDefault();
});

document.addEventListener('keydown', e => {
    if (!e.ctrlKey) return;
    if (e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        return;
    }
    if ((e.key === 'c' || e.key === 'C') && !isEditableTarget(e.target)) {
        e.preventDefault();
    }
});

const majorArcana = [
    { id: 0, name: '愚者', symbol: '🃏', number: '0', upright: '新的开始、冒险、天真、自由、自发性', reversed: '鲁莽、冒险带来的风险、愚蠢、疏忽' },
    { id: 1, name: '魔术师', symbol: '✨', number: 'I', upright: '意志力、技能、专注、创造力、自信', reversed: '操纵、欺骗、意志薄弱、潜力未发挥' },
    { id: 2, name: '女祭司', symbol: '🌙', number: 'II', upright: '直觉、神秘、无意识、内在知识、智慧', reversed: '秘密、压抑直觉、表面肤浅、忽略内心声音' },
    { id: 3, name: '女皇', symbol: '🌺', number: 'III', upright: '丰饶、母性、自然、创造力、感官享受', reversed: '依赖、创造力受阻、空虚、不安全感' },
    { id: 4, name: '皇帝', symbol: '👑', number: 'IV', upright: '权威、结构、控制、父性、稳定', reversed: '暴政、僵化、冷酷、缺乏纪律、过度控制' },
    { id: 5, name: '教皇', symbol: '⛪', number: 'V', upright: '传统、精神指引、宗教、信仰、教育', reversed: '挑战传统、新的信仰、束缚、虚伪' },
    { id: 6, name: '恋人', symbol: '💕', number: 'VI', upright: '爱情、和谐、关系、价值观的选择、伴侣', reversed: '不和谐、失衡、错误的选择、分离' },
    { id: 7, name: '战车', symbol: '🏛️', number: 'VII', upright: '胜利、意志力、决心、自我控制、行动', reversed: '失去控制、缺乏方向、攻击性、失败' },
    { id: 8, name: '力量', symbol: '🦁', number: 'VIII', upright: '勇气、耐心、控制、同情心、内在力量', reversed: '软弱、自我怀疑、缺乏自律、不安全感' },
    { id: 9, name: '隐士', symbol: '🏔️', number: 'IX', upright: '内省、孤独、寻求真理、指引、内在探索', reversed: '孤立、孤独、退缩、拒绝建议' },
    { id: 10, name: '命运之轮', symbol: '🎡', number: 'X', upright: '运气、命运、转折点、循环、变化', reversed: '厄运、抗拒变化、失控、坏运气' },
    { id: 11, name: '正义', symbol: '⚖️', number: 'XI', upright: '公正、真理、因果、法律、平衡', reversed: '不公、不诚实、缺乏问责、不平衡' },
    { id: 12, name: '倒吊人', symbol: '🙃', number: 'XII', upright: '牺牲、新视角、放手、等待、启示', reversed: '拖延、无谓牺牲、停滞、抗拒改变' },
    { id: 13, name: '死神', symbol: '💀', number: 'XIII', upright: '结束、转变、重生、过渡、放下', reversed: '抗拒改变、停滞、无法放下、恐惧变化' },
    { id: 14, name: '节制', symbol: '⚗️', number: 'XIV', upright: '平衡、适度、耐心、目的、调和', reversed: '失衡、过度、缺乏长远眼光、不和谐' },
    { id: 15, name: '恶魔', symbol: '😈', number: 'XV', upright: '束缚、成瘾、物质主义、性、阴暗面', reversed: '解脱、摆脱束缚、重获力量、独立' },
    { id: 16, name: '高塔', symbol: '🗼', number: 'XVI', upright: '突变、觉醒、破坏、启示、解放', reversed: '避免灾难、恐惧改变、延迟不可避免的事' },
    { id: 17, name: '星星', symbol: '⭐', number: 'XVII', upright: '希望、灵感、宁静、精神更新、信心', reversed: '绝望、缺乏信心、消极、失去希望' },
    { id: 18, name: '月亮', symbol: '🌕', number: 'XVIII', upright: '幻觉、恐惧、焦虑、潜意识、直觉', reversed: '释放恐惧、压抑情绪、混乱、神秘被揭示' },
    { id: 19, name: '太阳', symbol: '☀️', number: 'XIX', upright: '成功、欢乐、活力、积极、清晰', reversed: '暂时的失败、过度乐观、内心阴郁' },
    { id: 20, name: '审判', symbol: '📯', number: 'XX', upright: '审判、重生、内心召唤、宽恕、救赎', reversed: '自我怀疑、拒绝召唤、忽略教训' },
    { id: 21, name: '世界', symbol: '🌍', number: 'XXI', upright: '完成、整合、成就、旅行、圆满', reversed: '未完成、缺乏闭环、停滞、延迟' }
];

const minorArcana = {
    wands: [
        { id: 'w1', name: '权杖一', symbol: '🔥', upright: '新开始、灵感、创造力、潜力', reversed: '延迟、缺乏方向、错过机会' },
        { id: 'w2', name: '权杖二', symbol: '🏆', upright: '规划、决定、发现、未来', reversed: '恐惧未知、缺乏计划、犹豫' },
        { id: 'w3', name: '权杖三', symbol: '⛵', upright: '扩张、远见、领导力、进步', reversed: '缺乏远见、挫折、延迟' },
        { id: 'w4', name: '权杖四', symbol: '🏡', upright: '庆祝、和谐、家庭、稳定', reversed: '不和谐、缺乏支持、过渡期' },
        { id: 'w5', name: '权杖五', symbol: '⚔️', upright: '竞争、冲突、紧张、多样性', reversed: '内心冲突、避免冲突、释放紧张' },
        { id: 'w6', name: '权杖六', symbol: '🎖️', upright: '胜利、成功、骄傲、认可', reversed: '虚假成功、骄傲自大、失败' },
        { id: 'w7', name: '权杖七', symbol: '🛡️', upright: '挑战、防御、坚持、勇气', reversed: '感到不知所措、放弃、自我怀疑' },
        { id: 'w8', name: '权杖八', symbol: '💨', upright: '速度、变化、行动、旅行', reversed: '延迟、挫折、等待' },
        { id: 'w9', name: '权杖九', symbol: '🏰', upright: '韧性、决心、最后冲刺、毅力', reversed: '偏执、防御、精疲力竭' },
        { id: 'w10', name: '权杖十', symbol: '🎒', upright: '负担、责任、压力、完成', reversed: '释放负担、授权、不堪重负' },
        { id: 'wp', name: '权杖侍从', symbol: '🧑', upright: '探索、热情、发现、信使', reversed: '坏消息、缺乏方向、犹豫' },
        { id: 'wk', name: '权杖骑士', symbol: '🏇', upright: '行动、冒险、冲动、能量', reversed: '鲁莽、愤怒、延迟、挫折' },
        { id: 'wq', name: '权杖王后', symbol: '👸', upright: '自信、独立、温暖、决心', reversed: '自我怀疑、嫉妒、专横' },
        { id: 'wki', name: '权杖国王', symbol: '🤴', upright: '领导力、愿景、企业家、荣誉', reversed: '专横、冲动、缺乏纪律' }
    ],
    cups: [
        { id: 'c1', name: '圣杯一', symbol: '💧', upright: '新感情、直觉、精神新开始', reversed: '情感阻塞、压抑感受、空虚' },
        { id: 'c2', name: '圣杯二', symbol: '💞', upright: '结合、伙伴关系、互相吸引', reversed: '失衡、沟通不良、分手' },
        { id: 'c3', name: '圣杯三', symbol: '🎉', upright: '庆祝、友谊、创造力、社交', reversed: '过度放纵、孤立、不和' },
        { id: 'c4', name: '圣杯四', symbol: '😔', upright: '冷漠、沉思、机会未被抓住', reversed: '觉醒、新机会、重新连接' },
        { id: 'c5', name: '圣杯五', symbol: '😢', upright: '失落、悲伤、悔恨、接受', reversed: '继续前进、接受帮助、找到希望' },
        { id: 'c6', name: '圣杯六', symbol: '👶', upright: '怀旧、童年、纯真、给予', reversed: '活在过去、不成熟、需要放下' },
        { id: 'c7', name: '圣杯七', symbol: '🎭', upright: '幻想、选择、白日梦、想象力', reversed: '混乱、诱惑、清晰' },
        { id: 'c8', name: '圣杯八', symbol: '🚶', upright: '放弃、寻找更深意义、继续前进', reversed: '恐惧离开、逃避、迷茫' },
        { id: 'c9', name: '圣杯九', symbol: '😊', upright: '满足、愿望成真、感恩、快乐', reversed: '贪婪、不满、物质主义' },
        { id: 'c10', name: '圣杯十', symbol: '👨‍👩‍👧‍👦', upright: '和谐、幸福、家庭、情感满足', reversed: '不和谐、家庭冲突、价值观破碎' },
        { id: 'cp', name: '圣杯侍从', symbol: '🧒', upright: '创意、直觉、敏感、梦想家', reversed: '情绪不稳定、不成熟、逃避现实' },
        { id: 'ck', name: '圣杯骑士', symbol: '🐴', upright: '浪漫、魅力、想象力、美', reversed: '情绪化、失望、不可靠' },
        { id: 'cq', name: '圣杯王后', symbol: '👑', upright: '同情、疗愈、直觉、情感安全', reversed: '情绪不稳定、依赖、不安全' },
        { id: 'cki', name: '圣杯国王', symbol: '👔', upright: '情绪控制、智慧、 diplomacy、平衡', reversed: '情绪操纵、压抑、冷酷' }
    ],
    swords: [
        { id: 's1', name: '宝剑一', symbol: '⚡', upright: '突破、清晰、真理、新想法', reversed: '困惑、缺乏清晰、隐瞒、失败' },
        { id: 's2', name: '宝剑二', symbol: '👁️', upright: '决策、僵局、平衡、避免冲突', reversed: '做出决定、释放恐惧、欺骗' },
        { id: 's3', name: '宝剑三', symbol: '💔', upright: '心痛、悲伤、分离、背叛', reversed: '恢复、宽恕、释放痛苦' },
        { id: 's4', name: '宝剑四', symbol: '😴', upright: '休息、恢复、沉思、静止', reversed: '觉醒、恢复、重新行动' },
        { id: 's5', name: '宝剑五', symbol: '🏳️', upright: '冲突、失败、竞争、紧张', reversed: '放下冲突、承认失败、和解' },
        { id: 's6', name: '宝剑六', symbol: '🚣', upright: '过渡、离开、平静的旅程', reversed: '抗拒改变、未解决的问题、困难' },
        { id: 's7', name: '宝剑七', symbol: '🎭', upright: '欺骗、策略、隐藏的敌人', reversed: '被抓住、承认、诚实' },
        { id: 's8', name: '宝剑八', symbol: '🔒', upright: '束缚、自我设限、受害者心态', reversed: '释放、新视角、自由' },
        { id: 's9', name: '宝剑九', symbol: '😰', upright: '焦虑、担忧、噩梦、痛苦', reversed: '释放焦虑、面对恐惧、恢复' },
        { id: 's10', name: '宝剑十', symbol: '💀', upright: '结束、痛苦、背叛、失败', reversed: '恢复、重生、克服痛苦' },
        { id: 'sp', name: '宝剑侍从', symbol: '📝', upright: '好奇、求知、新想法、沟通', reversed: '八卦、不诚实、缺乏方向' },
        { id: 'sk', name: '宝剑骑士', symbol: '🏍️', upright: '行动、野心、冲动、速度', reversed: '鲁莽、无方向、浪费精力' },
        { id: 'sq', name: '宝剑王后', symbol: '🧥', upright: '独立、清晰、边界、真相', reversed: '冷酷、依赖、过度批判' },
        { id: 'ski', name: '宝剑国王', symbol: '🧐', upright: '智力、权威、真相、公正', reversed: '滥用权力、操控、残酷' }
    ],
    pentacles: [
        { id: 'p1', name: '星币一', symbol: '💰', upright: '新机会、繁荣、财富、稳定', reversed: '错过机会、贪婪、缺乏规划' },
        { id: 'p2', name: '星币二', symbol: '⚖️', upright: '平衡、优先级、适应、灵活性', reversed: '失衡、不堪重负、混乱' },
        { id: 'p3', name: '星币三', symbol: '🏗️', upright: '团队合作、学习、技能、质量', reversed: '缺乏团队合作、平庸、学习困难' },
        { id: 'p4', name: '星币四', symbol: '🪙', upright: '保护、安全、控制、节约', reversed: '吝啬、不安全感、贪婪' },
        { id: 'p5', name: '星币五', symbol: '🏚️', upright: '贫困、困难、挣扎、缺乏', reversed: '恢复、慈善、找到希望' },
        { id: 'p6', name: '星币六', symbol: '🎁', upright: '慷慨、分享、财富、给予', reversed: '债务、自私、不平等' },
        { id: 'p7', name: '星币七', symbol: '🌱', upright: '耐心、投资、长期愿景', reversed: '焦虑、缺乏回报、 impatience' },
        { id: 'p8', name: '星币八', symbol: '🔨', upright: '技能、勤奋、质量、专注', reversed: '缺乏热情、懒惰、低质量' },
        { id: 'p9', name: '星币九', symbol: '🌸', upright: '奢华、自给自足、成就、独立', reversed: '过度工作、贪婪、不安全' },
        { id: 'p10', name: '星币十', symbol: '🏰', upright: '财富、家庭、传承、成功', reversed: '失败、损失、家庭冲突' },
        { id: 'pp', name: '星币侍从', symbol: '📚', upright: '学习、实用、专注、脚踏实地', reversed: '缺乏进展、不切实际、懒惰' },
        { id: 'pk', name: '星币骑士', symbol: '🐂', upright: '可靠、耐心、责任、稳定', reversed: '无聊、固执、缺乏冒险' },
        { id: 'pq', name: '星币王后', symbol: '🌿', upright: '实际、养育、自然、富裕', reversed: '自私、不安全感、嫉妒' },
        { id: 'pki', name: '星币国王', symbol: '💼', upright: '商业、领导、安全、能力', reversed: '腐败、物质主义、固执' }
    ]
};

function showPage(e, page) {
    if (e) e.preventDefault();
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    
    document.getElementById(`page-${page}`).classList.add('active');
    if (e && e.currentTarget) {
        e.currentTarget.classList.add('active');
    }
}

function showArcana(type) {
    document.querySelectorAll('.arcana-container').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(`arcana-${type}`).classList.add('active');
    document.getElementById(`tab-${type}`).classList.add('active');
    
    if (type === 'major') {
        renderMajorCards();
    } else {
        showSuit(currentMinorSuit);
    }
}

function showSuit(suit) {
    currentMinorSuit = suit;
    renderMinorCards(suit);
    syncSuitDesc();
}

let currentMinorSuit = 'wands';

const majorArcanaEn = {
    0: 'The Fool',
    1: 'The Magician',
    2: 'The High Priestess',
    3: 'The Empress',
    4: 'The Emperor',
    5: 'The Hierophant',
    6: 'The Lovers',
    7: 'The Chariot',
    8: 'Strength',
    9: 'The Hermit',
    10: 'Wheel of Fortune',
    11: 'Justice',
    12: 'The Hanged Man',
    13: 'Death',
    14: 'Temperance',
    15: 'The Devil',
    16: 'The Tower',
    17: 'The Star',
    18: 'The Moon',
    19: 'The Sun',
    20: 'Judgement',
    21: 'The World'
};

const suitEn = {
    wands: 'Wands',
    cups: 'Cups',
    swords: 'Swords',
    pentacles: 'Pentacles'
};

const rankEn = {
    1: 'Ace',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine',
    10: 'Ten',
    p: 'Page',
    k: 'Knight',
    q: 'Queen',
    ki: 'King'
};

function getMinorRankKey(id) {
    const m = id.match(/^(?:w|c|s|p)(\d+|p|k|q|ki)$/);
    return m ? m[1] : id;
}

function getCardDisplayName(type, suit, card) {
    if (currentLang !== 'en') return card.name;

    if (type === 'major') {
        return majorArcanaEn[card.id] || card.name;
    }

    const rankKey = getMinorRankKey(card.id);
    const rank = rankEn[rankKey] || rankKey;
    const suitName = suitEn[suit] || suit;
    return `${rank} of ${suitName}`;
}

function renderMajorCards() {
    const container = document.getElementById('major-cards');
    container.innerHTML = majorArcana.map(card => `
        <div class="tarot-card" onclick="showCardDetail('major', ${card.id})">
            <div class="card-number">${card.number}</div>
            <div class="card-symbol">${card.symbol}</div>
            <div class="card-name">${getCardDisplayName('major', null, card)}</div>
        </div>
    `).join('');
}

function renderMinorCards(suit) {
    const container = document.getElementById('minor-cards');
    const cards = minorArcana[suit];
    container.innerHTML = cards.map(card => `
        <div class="tarot-card" onclick="showCardDetail('minor', '${suit}', '${card.id}')">
            <div class="card-symbol">${card.symbol}</div>
            <div class="card-name">${getCardDisplayName('minor', suit, card)}</div>
        </div>
    `).join('');
}

function showCardDetail(type, param1, param2) {
    let card;
    if (type === 'major') {
        card = majorArcana.find(c => c.id === param1);
    } else {
        card = minorArcana[param1].find(c => c.id === param2);
    }
    
    const modalBody = document.getElementById('modal-body');
    const lang = t();
    const title = type === 'major'
        ? getCardDisplayName('major', null, card)
        : getCardDisplayName('minor', param1, card);
    modalBody.innerHTML = `
        <div class="modal-card-header">
            <div class="modal-card-symbol">${card.symbol}</div>
            <div class="modal-card-name">${title}</div>
            ${card.number ? `<div class="modal-card-number">${card.number}</div>` : ''}
        </div>
        <div class="meaning-section">
            <h3>${lang.modalUpright}</h3>
            <p>${card.upright}</p>
        </div>
        <div class="meaning-section">
            <h3>${lang.modalReversed}</h3>
            <p>${card.reversed}</p>
        </div>
    `;
    
    document.getElementById('card-modal').classList.add('show');
}

function closeModal() {
    document.getElementById('card-modal').classList.remove('show');
}

document.getElementById('card-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

function handleBooking(e) {
    e.preventDefault();
    alert('预约已提交！我们会尽快与您联系。');
    e.target.reset();
}

let currentLang = 'zh';

const i18n = {
    zh: {
        nav: {
            home: '首页',
            manual: '塔罗手册',
            course: '加入魔法世界',
            booking: '预约资讯'
        },
        homeSubtitle: '你没有卡在任何地方，你只是在体验各种能量',
        spreadLabel: '选择牌阵',
        spreadOptions: {
            daily: '1张牌 - 今日运势',
            choice: '2张牌 - 选择牌阵',
            timeline: '3张牌 - 时间之流牌阵'
        },
        choicesLabel: '两个选择',
        choiceAPlaceholder: '选项 A（例如：工作A）',
        choiceBPlaceholder: '选项 B（例如：工作B）',
        questionLabel: '写下你的问题',
        questionPlaceholder: {
            daily: '',
            choice: '例如：我应该选 A 还是 B？我最在意的是什么？',
            timeline: '例如：这件事接下来会如何发展？'
        },
        startBtn: '开始洗牌',
        shuffling: '正在洗牌...',
        alertNeedQuestion: '请先写下你的问题。',
        alertNeedChoices: '请输入两个选项（A 和 B）。',
        analysisTheme: '本次主题',
        analysisConclusion: '关系与建议',
        metaQuestionPrefix: '你的问题：',
        metaChoiceAPrefix: '选择 A：',
        metaChoiceBPrefix: '选择 B：',
        spreadTitles: {
            daily: '今日运势',
            choice: '选择牌阵',
            timeline: '时间之流牌阵'
        },
        spreadPositions: {
            daily: ['今日指引'],
            choice: ['选择 A', '选择 B'],
            timeline: ['过去 / 根源', '现在 / 现状', '未来 / 走向']
        },
        upright: '正位',
        reversed: '逆位',
        modalUpright: '正位含义',
        modalReversed: '逆位含义',
        manualTitle: '塔罗手册',
        manualTabs: {
            major: '大阿卡纳 (22张)',
            minor: '小阿卡纳 (56张)'
        },
        suits: {
            wands: '权杖',
            cups: '圣杯',
            swords: '宝剑',
            pentacles: '星币'
        },
        suitDesc: {
            wands: '权杖：动力、行动、意志与点燃。',
            cups: '圣杯：情感、关系、直觉与流动。',
            swords: '宝剑：思考、真相、抉择与界限。',
            pentacles: '星币：现实、金钱、资源与落地。'
        },
        features: {
            f1Title: '完整塔罗手册',
            f1Desc: '78张塔罗牌详细解读，包含大阿卡纳和小阿卡纳',
            f2Title: '正逆位解析',
            f2Desc: '每张牌的正位和逆位完整含义，助你深入学习',
            f3Title: '1对1咨询',
            f3Desc: '专业塔罗师为你提供一对一详细解读服务'
        },
        humanReading: {
            title: '真人解牌',
            btn: 'WhatsApp 真人解牌',
            otherPricing: '语音解牌可预约时间<br>10分钟 / USD5.9'
        },
        bookingTitle: '预约资讯',
        bookingDesc: '填写以下表单，我们将尽快与您联系',
        booking: {
            name: '姓名',
            phone: '联系电话',
            email: '电子邮箱',
            consultType: '咨询类型',
            consultPlaceholder: '请选择咨询类型',
            message: '备注信息',
            submit: '提交预约',
            consultOptions: {
                love: '情感与关系类',
                career: '个人成长类',
                finance: '财运事业',
                health: '身心健康类',
                general: '流年运势'
            }
        },
        services: {
            topTitle: '塔罗 / 占星术',
            topDesc: '选取任何课程即可免费加入付费群',
            s1Title: '1 对 1 客制化占卜课程',
            s1Desc: '专属 1 对 1・私人定制・按你需求设计占卜方式，赠送适合您的塔罗牌/神谕卡',
            s1Fit: '适合：想系统学习、希望量身打造学习路径、追求个人化指导的你。',
            s2Title: '塔罗入门影片',
            s2Desc: '随时随地学习・零基础友好・轻松入门塔罗',
            s2Fit: '适合：对塔罗感兴趣、想自学基础、时间弹性的初学者。',
            s3Title: '付费占卜交流群（年度）',
            s3Price: 'USD 25 / 年',
            s3Fit: '适合：已有塔罗基础，想要进阶实战、深入解析复杂问题、同频交流、自我提升与修心的伙伴。',
            s3Desc: '一起研讨案例、练习解牌、互相反馈，共同成长。',
            contactDesc: '想了解更多或报名，请通过 WhatsApp 联络我们。',
            whatsappBtn: 'WhatsApp',
            linkBtn: 'Link'
        },
        contact: {
            title: '联络方式',
            phone: '电话/WhatsApp：+60127710829',
            email: '邮箱：ycommunitystudio@gmail.com',
            ig: 'Instagram：@gugu.artlab'
        },
        course: {
            title: '加入魔法世界',
            videosTitle: '塔罗入门影片',
            desc: '请输入 code 进入课程页面',
            codeLabel: 'Course Code',
            enter: 'Enter',
            empty: '内容尚未上线',
            invalid: 'code 不正确。',
            oneOnOneTitle: '1对1专属',
            oneOnOneDesc: '预约后请按时加入线上视频。',
            oneOnOneBtn: '视讯链接'
        }
    },
    en: {
        nav: {
            home: 'Home',
            manual: 'Tarot Manual',
            course: 'Join the Magic World',
            booking: 'Booking'
        },
        homeSubtitle: "You're not stuck anywhere — you're simply moving through different energies.",
        spreadLabel: 'Select Spread',
        spreadOptions: {
            daily: '1 Card - Daily Guidance',
            choice: '2 Cards - Choice Spread',
            timeline: '3 Cards - Timeline Spread'
        },
        choicesLabel: 'Two Options',
        choiceAPlaceholder: 'Option A (e.g., Job A)',
        choiceBPlaceholder: 'Option B (e.g., Job B)',
        questionLabel: 'Your Question',
        questionPlaceholder: {
            daily: '',
            choice: 'e.g., Should I choose A or B? What matters most?',
            timeline: 'e.g., How will this situation develop?'
        },
        startBtn: 'Shuffle & Draw',
        shuffling: 'Shuffling...',
        alertNeedQuestion: 'Please write your question first.',
        alertNeedChoices: 'Please fill in both options (A and B).',
        analysisTheme: 'Focus',
        analysisConclusion: 'Links & Guidance',
        metaQuestionPrefix: 'Question: ',
        metaChoiceAPrefix: 'Option A: ',
        metaChoiceBPrefix: 'Option B: ',
        spreadTitles: {
            daily: 'Daily Guidance',
            choice: 'Choice Spread',
            timeline: 'Timeline Spread'
        },
        spreadPositions: {
            daily: ['Guidance'],
            choice: ['Option A', 'Option B'],
            timeline: ['Past / Root', 'Present / Now', 'Future / Direction']
        },
        upright: 'Upright',
        reversed: 'Reversed',
        modalUpright: 'Upright Meaning',
        modalReversed: 'Reversed Meaning',
        manualTitle: 'TAROT MANUAL',
        manualTabs: {
            major: 'Major Arcana (22)',
            minor: 'Minor Arcana (56)'
        },
        suits: {
            wands: 'Wands',
            cups: 'Cups',
            swords: 'Swords',
            pentacles: 'Pentacles'
        },
        suitDesc: {
            wands: 'Wands: drive, action, will, ignition.',
            cups: 'Cups: feelings, bonds, intuition, flow.',
            swords: 'Swords: mind, truth, choices, boundaries.',
            pentacles: 'Pentacles: reality, money, resources, grounding.'
        },
        features: {
            f1Title: 'Complete Tarot Manual',
            f1Desc: 'A full 78-card guide covering Major & Minor Arcana',
            f2Title: 'Upright / Reversed',
            f2Desc: 'Clear meanings for both upright and reversed positions',
            f3Title: '1-on-1 Reading',
            f3Desc: 'Private sessions with a reader for deeper guidance'
        },
        humanReading: {
            title: 'Human Reading',
            btn: 'WhatsApp Human Reading',
            otherPricing: 'Voice reading by appointment<br>10 min / USD 5.9'
        },
        bookingTitle: 'BOOKING',
        bookingDesc: 'Fill in the form and we will contact you soon.',
        booking: {
            name: 'Name',
            phone: 'Phone / WhatsApp',
            email: 'Email',
            consultType: 'Reading Type',
            consultPlaceholder: 'Select a type',
            message: 'Notes',
            submit: 'Submit',
            consultOptions: {
                love: 'Love & Relationships',
                career: 'Personal Growth',
                finance: 'Wealth & Career',
                health: 'Body & Mind',
                general: 'Yearly Fortune'
            }
        },
        services: {
            topTitle: 'Tarot / Astrology',
            topDesc: 'Pick any course and get free access to the paid group',
            s1Title: '1-on-1 Customized Divination Course',
            s1Desc: 'Private & tailored. We design the learning path and reading style around your needs, with a curated tarot/oracle deck gift.',
            s1Fit: 'For: structured learning, personalized guidance, and a path made for you.',
            s2Title: 'Tarot Starter Videos',
            s2Desc: 'Learn anytime, beginner-friendly, a gentle start into tarot.',
            s2Fit: 'For: curious beginners who want flexible self-paced learning.',
            s3Title: 'Paid Divination Study Group (Yearly)',
            s3Price: 'USD 25 / year',
            s3Fit: 'For: readers with basics who want advanced practice, deeper case analysis, and growth through aligned exchange.',
            s3Desc: 'We discuss cases, practice interpretations, and give each other feedback to grow together.',
            contactDesc: 'To learn more or enroll, please contact us on WhatsApp.',
            whatsappBtn: 'WhatsApp',
            linkBtn: 'Link'
        },
        contact: {
            title: 'Contact',
            phone: 'Phone / WhatsApp: +60127710829',
            email: 'Email: ycommunitystudio@gmail.com',
            ig: 'Instagram: @gugu.artlab'
        },
        course: {
            title: 'Join the Magic World',
            videosTitle: 'Tarot Starter Videos',
            desc: 'Enter the code to access',
            codeLabel: 'Course Code',
            enter: 'Enter',
            empty: 'Coming soon',
            invalid: 'Invalid code.',
            oneOnOneTitle: '1-on-1 Exclusive',
            oneOnOneDesc: 'After booking, please join the online video on time.',
            oneOnOneBtn: 'Video Link'
        }
    }
};

const spreadBase = {
    daily: {
        key: 'daily',
        count: 1,
        needsQuestion: false,
        needsChoices: false
    },
    timeline: {
        key: 'timeline',
        count: 3,
        needsQuestion: true,
        needsChoices: false
    },
    choice: {
        key: 'choice',
        count: 2,
        needsQuestion: true,
        needsChoices: true
    }
};

function t() {
    return i18n[currentLang] || i18n.en;
}

function getSpreadConfig(key) {
    const base = spreadBase[key] || spreadBase.daily;
    const lang = t();
    return {
        ...base,
        title: lang.spreadTitles[base.key],
        positions: lang.spreadPositions[base.key],
        questionPlaceholder: lang.questionPlaceholder[base.key]
    };
}

let fullDeckCache = null;

function getFullDeck() {
    if (fullDeckCache) return fullDeckCache;
    const deck = [];

    majorArcana.forEach(card => {
        deck.push({
            arcana: 'major',
            suit: null,
            id: card.id,
            name: card.name,
            symbol: card.symbol,
            number: card.number,
            upright: card.upright,
            reversed: card.reversed
        });
    });

    Object.keys(minorArcana).forEach(suit => {
        minorArcana[suit].forEach(card => {
            deck.push({
                arcana: 'minor',
                suit,
                id: card.id,
                name: card.name,
                symbol: card.symbol,
                number: null,
                upright: card.upright,
                reversed: card.reversed
            });
        });
    });

    fullDeckCache = deck;
    return deck;
}

function getReadingCardName(card) {
    if (card.arcana === 'major') {
        return getCardDisplayName('major', null, { id: card.id, name: card.name });
    }
    return getCardDisplayName('minor', card.suit, { id: card.id, name: card.name });
}

function pickCards(count) {
    const deck = [...getFullDeck()];
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck.slice(0, count).map(card => ({
        ...card,
        isReversed: Math.random() < 0.5
    }));
}

function meaningFor(card) {
    return card.isReversed ? card.reversed : card.upright;
}

function orientationText(card) {
    const lang = t();
    return card.isReversed ? lang.reversed : lang.upright;
}

function summarizeMeaning(text) {
    return text.split(/[、,，]/).map(s => s.trim()).filter(Boolean).slice(0, 3).join('、');
}

function conceptSummaryFromMeaning(text, card, langKey) {
    const raw = String(text || '');
    const s = raw.toLowerCase();
    const key = langKey || 'zh';

    const zhRules = [
        { re: /活在过去|怀旧|过去的影子/, phrase: '旧事牵扯' },
        { re: /不成熟|幼稚|不够成熟/, phrase: '还没真正定型' },
        { re: /需要放下|放下|结束|告别|离开/, phrase: '该把手松开' },
        { re: /探索|发现|学习|好奇/, phrase: '愿意重新尝试' },
        { re: /热情|动力|行动|冲劲|能量/, phrase: '行动力回温' },
        { re: /信使|消息|沟通|表达/, phrase: '有讯号在靠近' },
        { re: /转机|机会|突破|新开始/, phrase: '出现转折口' },
        { re: /界限|自律|控制|耐心|平衡/, phrase: '需要稳住边界' },
        { re: /焦虑|担忧|恐惧|不安/, phrase: '内心容易紧绷' },
        { re: /冲突|争执|竞争/, phrase: '外界摩擦增多' },
        { re: /延迟|等待|停滞/, phrase: '节奏会放慢' },
        { re: /成功|胜利|认可|成就/, phrase: '更容易被看见' },
        { re: /贪婪|不满|空虚/, phrase: '容易越想越不够' },
        { re: /物质主义|金钱|资源|利益/, phrase: '把价值绑在结果上' },
        { re: /依赖|成瘾|束缚/, phrase: '有黏住的惯性' }
    ];

    const enRules = [
        { re: /past|nostalg|memory/, phrase: 'pulled by the past' },
        { re: /immature|naive|inexperience/, phrase: 'still forming' },
        { re: /let go|release|endings?/, phrase: 'time to loosen your grip' },
        { re: /explor|discover|learn|curious/, phrase: 'ready to try again' },
        { re: /passion|drive|action|energy/, phrase: 'momentum returns' },
        { re: /message|communicat|signal/, phrase: 'signals come in' },
        { re: /opportun|turning point|breakthrough|new start/, phrase: 'a turning point opens' },
        { re: /boundar|discipline|balance|patience/, phrase: 'hold your boundaries' },
        { re: /anxiet|worry|fear/, phrase: 'nervous tension rises' },
        { re: /conflict|argument|competition/, phrase: 'friction increases' },
        { re: /delay|wait|stuck/, phrase: 'the pace slows' },
        { re: /success|victory|recognition|achievement/, phrase: 'visibility increases' },
        { re: /greed|dissatisfaction|empty/, phrase: 'the “not enough” loop' },
        { re: /material|money|resource|profit/, phrase: 'tying worth to outcomes' },
        { re: /attachment|addiction|bondage/, phrase: 'sticky patterns' }
    ];

    const rules = key === 'en' ? enRules : zhRules;
    const picked = [];
    for (const r of rules) {
        if (picked.length >= 2) break;
        if (r.re.test(s) && !picked.includes(r.phrase)) picked.push(r.phrase);
    }

    if (picked.length) return picked.join(key === 'en' ? ', ' : '、');

    if (!card) return key === 'en' ? 'a subtle inner shift' : '一种微妙的内在转向';
    if (card.isReversed) return key === 'en' ? 'a quieter, more inward friction' : '更偏向内在的卡点';
    return key === 'en' ? 'a clearer, more workable flow' : '更容易推进的能量';
}

function detectQuestionTheme(question, langKey) {
    const q = String(question || '').trim();
    if (!q) return 'general';
    const s = q.toLowerCase();
    const key = langKey || 'zh';

    if (key === 'en') {
        if (/(career|job|work|promotion|boss|interview|resign|startup|business|offer)/i.test(s)) return 'career';
        if (/(love|relationship|dating|partner|crush|ex|marriage|breakup)/i.test(s)) return 'love';
        if (/(money|finance|salary|income|investment|stock|debt|rent|budget)/i.test(s)) return 'finance';
        if (/(health|sleep|anxiety|stress|body|therapy|healing)/i.test(s)) return 'health';
        if (/(study|exam|school|university|grade|thesis)/i.test(s)) return 'study';
        return 'general';
    }

    if (/(事业|工作|升职|加薪|跳槽|离职|转职|面试|offer|老板|同事|客户|创业|项目|绩效|职场)/.test(q)) return 'career';
    if (/(感情|爱情|恋爱|关系|对象|暧昧|前任|复合|结婚|离婚|分手|喜欢谁|他|她)/.test(q)) return 'love';
    if (/(财|钱|收入|投资|股票|基金|债|贷款|房租|预算|生意|资源|订单)/.test(q)) return 'finance';
    if (/(健康|身体|睡眠|焦虑|压力|抑郁|情绪|疗愈|病|疼|恢复)/.test(q)) return 'health';
    if (/(学业|考试|学校|论文|绩点|上岸|考研|留学)/.test(q)) return 'study';
    return 'general';
}

function getQuestionContext(question, langKey) {
    const theme = detectQuestionTheme(question, langKey);
    const key = langKey || 'zh';

    if (key === 'en') {
        if (theme === 'career') {
            return {
                theme,
                scope: 'in your career/work context, ',
                guidance: [
                    'Translate the insight into one concrete action: one message, one application, one conversation, one deliverable.',
                    'Focus on what you can influence today: your output, your boundaries, and your pacing.',
                    'Don’t overidentify with results. Treat this as skill-building and positioning, not self-worth.'
                ]
            };
        }
        if (theme === 'love') {
            return {
                theme,
                scope: 'in your relationship context, ',
                guidance: [
                    'Choose clarity over guessing. Say one honest sentence instead of testing the other person.',
                    'Let boundaries be loving. If it’s a yes, it will survive a clear “no” to what drains you.',
                    'Don’t chase intensity. Look for consistency and emotional safety.'
                ]
            };
        }
        if (theme === 'finance') {
            return {
                theme,
                scope: 'in your money/resources context, ',
                guidance: [
                    'Keep it practical: check cashflow, terms, and hidden costs before committing.',
                    'Avoid “all in” thinking. Protect your downside first, then expand.',
                    'Make decisions from clarity, not urgency or comparison.'
                ]
            };
        }
        if (theme === 'health') {
            return {
                theme,
                scope: 'in your wellbeing context, ',
                guidance: [
                    'Your body is the metric. Prioritize rest, hydration, and a calmer rhythm.',
                    'Name the feeling before you fix it. The right change is often smaller than you think.',
                    'Gentle consistency beats dramatic resets.'
                ]
            };
        }
        if (theme === 'study') {
            return {
                theme,
                scope: 'in your study/exam context, ',
                guidance: [
                    'Break it down: one topic, one page, one practice set. Momentum comes from small wins.',
                    'Study in blocks and protect your attention. Consistency matters more than mood.',
                    'Ask for feedback early instead of perfecting in isolation.'
                ]
            };
        }
        return { theme, scope: '', guidance: ['Keep it simple. Focus on what you can control today.'] };
    }

    if (theme === 'career') {
        return {
            theme,
            scope: '放在事业/工作上看，',
            guidance: [
                '把这份解读落到一个具体动作：发一封讯息、投一份简历、约一次沟通、推进一个交付。',
                '今天只抓你能掌控的三件事：产出、界限、节奏。',
                '别把结果当成自我价值评估，先把自己放在“练功与布局”的位置。'
            ]
        };
    }
    if (theme === 'love') {
        return {
            theme,
            scope: '放在感情/关系上看，',
            guidance: [
                '用清晰替代猜测：说一句真话，比反复试探更有力量。',
                '界限不等于冷淡，它是在告诉对方：什么是你愿意长期生活的方式。',
                '别追强烈，去看稳定：对方是否能持续回应、持续在场。'
            ]
        };
    }
    if (theme === 'finance') {
        return {
            theme,
            scope: '放在金钱/资源上看，',
            guidance: [
                '先看现实面：现金流、条款、隐性成本，再谈期待与愿景。',
                '先保下限再扩张，别被“一把梭”带走判断。',
                '用清醒做决定，不用焦虑、攀比或紧迫感做决定。'
            ]
        };
    }
    if (theme === 'health') {
        return {
            theme,
            scope: '放在身心状态上看，',
            guidance: [
                '身体就是指标：休息、喝水、慢一点的节奏，会比硬撑更有效。',
                '先命名感受，再处理问题；很多改变其实不需要很大。',
                '温柔的持续，比激烈的重启更管用。'
            ]
        };
    }
    if (theme === 'study') {
        return {
            theme,
            scope: '放在学业/考试上看，',
            guidance: [
                '把目标切成小块：一页、一题、一轮练习，先把手感找回来。',
                '用时间块保护注意力；稳定比心情更重要。',
                '早点要反馈，不要一个人憋到完美。'
            ]
        };
    }
    return { theme, scope: '', guidance: ['把重心放回当下：先做你能掌控的最小一步。'] };
}

function toneScore(card) {
    const base = card.isReversed ? -1 : 1;
    const majorBonus = card.arcana === 'major' ? 0.2 : 0;
    return base + majorBonus;
}

function resetReadingResult() {
    const result = document.getElementById('reading-result');
    const cards = document.getElementById('reading-cards');
    const analysis = document.getElementById('reading-analysis');
    if (!result || !cards || !analysis) return;
    result.style.display = 'none';
    cards.innerHTML = '';
    analysis.innerHTML = '';
}

function syncReadingForm() {
    const spreadTypeEl = document.getElementById('spread-type');
    const questionGroup = document.getElementById('question-group');
    const questionEl = document.getElementById('reading-question');
    const choiceInputs = document.getElementById('choice-inputs');
    const choiceA = document.getElementById('choice-a');
    const choiceB = document.getElementById('choice-b');

    if (!spreadTypeEl) return;
    const config = getSpreadConfig(spreadTypeEl.value);

    if (questionGroup && questionEl) {
        questionGroup.style.display = config.needsQuestion ? 'block' : 'none';
        questionEl.placeholder = config.questionPlaceholder || '';
        if (!config.needsQuestion) questionEl.value = '';
    }

    if (choiceInputs && choiceA && choiceB) {
        choiceInputs.style.display = config.needsChoices ? 'block' : 'none';
        if (!config.needsChoices) {
            choiceA.value = '';
            choiceB.value = '';
        }
    }

    resetReadingResult();
}

function renderReadingCards(config, cards) {
    const container = document.getElementById('reading-cards');
    if (!container) return;

    const cardHtml = cards.map((card, idx) => {
        const position = config.positions[idx] || '';
        const orient = orientationText(card);
        const name = getReadingCardName(card);
        const onclick = card.arcana === 'major'
            ? `showCardDetail('major', ${card.id})`
            : `showCardDetail('minor', '${card.suit}', '${card.id}')`;

        return `
            <div class="tarot-card" onclick="${onclick}">
                <div class="card-number">${position}</div>
                <div class="card-symbol">${card.symbol}</div>
                <div class="card-name">${name}</div>
                <div class="card-number">${orient}</div>
            </div>
        `;
    }).join('');

    container.innerHTML = cardHtml;
}

function buildTimelineConclusion(cards, meta) {
    const past = cards[0];
    const present = cards[1];
    const future = cards[2];
    const reversedCount = cards.filter(c => c.isReversed).length;

    const pastHint = conceptSummaryFromMeaning(meaningFor(past), past, currentLang);
    const presentHint = conceptSummaryFromMeaning(meaningFor(present), present, currentLang);
    const futureHint = conceptSummaryFromMeaning(meaningFor(future), future, currentLang);
    const q = meta && meta.question ? String(meta.question).trim() : '';
    const ctx = getQuestionContext(q, currentLang);
    const seed = hashSeed(`${q}|${past.arcana}:${past.suit || ''}:${past.id}:${past.isReversed ? 'R' : 'U'}|${present.arcana}:${present.suit || ''}:${present.id}:${present.isReversed ? 'R' : 'U'}|${future.arcana}:${future.suit || ''}:${future.id}:${future.isReversed ? 'R' : 'U'}`);

    if (currentLang === 'en') {
        const reversedNote = reversedCount
            ? `You drew ${reversedCount} reversed card(s). Read them as friction points: where energy is blocked, delayed, or needs a different approach.`
            : `Most cards are upright, so the overall flow is smoother. The outcome depends on how consistently you act on the “present” message.`;

        const qPrefix = q ? `About “${q}”, ` : '';
        const scope = ctx.scope || '';
        const extra = (ctx.guidance && ctx.guidance.length) ? pickFrom(ctx.guidance, seed + 17) : '';

        const pastTemplates = [
            `${qPrefix}${scope}the past sets the baseline: ${pastHint}. It explains what your nervous system defaults to.`,
            `${qPrefix}${scope}the story starts in ${pastHint}—an old atmosphere that colors how you read everything else.`,
            `${qPrefix}${scope}the root layer is ${pastHint}. That’s the lens you’ve been using, even if quietly.`
        ];
        const presentTemplates = [
            `Now, when ${pastHint} meets ${presentHint}, the tone shifts. ${scope}this is the moment you respond differently instead of replaying the old loop.`,
            `In the present, ${pastHint} collides with ${presentHint}. ${scope}that’s where the “turn” happens: you can engage, experiment, and regain agency.`,
            `Right now, the bridge is ${presentHint}. ${scope}it’s how you move out of ${pastHint} without forcing or denying what you feel.`
        ];
        const futureTemplates = [
            `Next, ${presentHint} flows into ${futureHint}. ${scope}progress is possible, but it also tests restraint and self-worth.`,
            `As this continues, the present energy tends to land in ${futureHint}. ${scope}momentum grows—and overreaching can sneak in.`,
            `The direction points toward ${futureHint}. ${scope}it’s not a verdict—more like the weather you walk into if nothing changes.`
        ];
        const guidanceTemplates = [
            `Guidance: Keep your actions anchored in ${presentHint}. Choose steady pace over intensity, and the best side of ${futureHint} shows up.${extra ? ` ${extra}` : ''}`,
            `Guidance: Let “now” do the heavy lifting. If you act from ${presentHint}, you won’t be dragged back by ${pastHint} or pulled into the excess of ${futureHint}.${extra ? ` ${extra}` : ''}`,
            `Guidance: Make one clean choice today that reflects ${presentHint}. That’s the simplest way to steer the story away from the shadow side of ${futureHint}.${extra ? ` ${extra}` : ''}`
        ];

        const step1 = pickFrom(pastTemplates, seed);
        const step2 = pickFrom(presentTemplates, seed + 3);
        const step3 = pickFrom(futureTemplates, seed + 7);
        const step4 = pickFrom(guidanceTemplates, seed + 11);
        return `${reversedNote}<br><br>${step1}<br><br>${step2}<br><br>${step3}<br><br>${step4}`;
    }

    const reversedNote = reversedCount
        ? `这次出现 ${reversedCount} 张${t().reversed}。它不是“坏”，而是把阻力点点亮：哪里卡住、哪里该换路。`
        : `这次多为${t().upright}，整体更顺。方向并不复杂，复杂的是你愿不愿意照着做。`;

    const qPrefix = q ? `围绕你问的「${q}」，` : '';
    const scope = ctx.scope || '';
    const extra = (ctx.guidance && ctx.guidance.length) ? pickFrom(ctx.guidance, seed + 17) : '';

    const pastTemplates = [
        `${qPrefix}${scope}过去更像是一层底色：${pastHint}。它解释了你为什么会用某一种熟悉的方式去理解这件事。`,
        `${qPrefix}${scope}过去带着 ${pastHint} 的气味。你不一定在“做错”，只是很自然地沿用了旧的反应模式。`,
        `${qPrefix}${scope}这件事的根部在 ${pastHint}。那是一种你很熟、也很容易自动启动的状态。`
    ];
    const presentTemplates = [
        `现在是转折点：当 ${pastHint} 遇上 ${presentHint}，你开始换一种处理方式。${scope}不是硬推，而是愿意再试一次。`,
        `现在这张牌把你往 ${presentHint} 拉了一下：你在从 ${pastHint} 里抽身。${scope}你开始更主动、更清醒地参与。`,
        `现在的关键在 ${presentHint}。${scope}它让你不必继续困在 ${pastHint}，而是用更可执行的方式把局面往前带。`
    ];
    const futureTemplates = [
        `未来会更容易落在 ${futureHint}。${scope}推进会有，但它会考验你：你是稳稳地走，还是被“想要更快更好”的心推着跑。`,
        `未来的方向指向 ${futureHint}。${scope}它像提醒：机会在，但也容易出现不满足、过度用力或把价值绑在结果上。`,
        `未来走向是 ${futureHint}。${scope}它不是判决，更像一个提示：如果现在继续这样处理，下一步大概率会走到这里。`
    ];
    const guidanceTemplates = [
        `建议：把力量收回到“现在”。用 ${presentHint} 的方式去做事、去说话、去设定节奏与界限，你就更不容易被 ${futureHint} 的陷阱带偏。${extra ? `${extra}` : ''}`,
        `建议：今天不要追求一次到位。抓住 ${presentHint} 这个当下动作，未来就更可能呈现 ${futureHint} 的“清醒那一面”，而不是焦虑与过度。${extra ? `${extra}` : ''}`,
        `建议：你只要做一件事——让当下更像 ${presentHint}。这会自然把你从 ${pastHint} 往外带，也会让未来的 ${futureHint} 更稳、更不失控。${extra ? `${extra}` : ''}`
    ];

    const step1 = pickFrom(pastTemplates, seed);
    const step2 = pickFrom(presentTemplates, seed + 3);
    const step3 = pickFrom(futureTemplates, seed + 7);
    const step4 = pickFrom(guidanceTemplates, seed + 11);
    return `${reversedNote}<br><br>${step1}<br><br>${step2}<br><br>${step3}<br><br>${step4}`;
}

function buildChoiceConclusion(cards, meta) {
    const a = cards[0];
    const b = cards[1];

    const aKey = summarizeMeaning(meaningFor(a));
    const bKey = summarizeMeaning(meaningFor(b));
    const q = meta && meta.question ? String(meta.question).trim() : '';
    const ctx = getQuestionContext(q, currentLang);
    const seed = hashSeed(`${q}|${a.arcana}:${a.suit || ''}:${a.id}:${a.isReversed ? 'R' : 'U'}|${b.arcana}:${b.suit || ''}:${b.id}:${b.isReversed ? 'R' : 'U'}`);

    const scoreA = toneScore(a);
    const scoreB = toneScore(b);
    const aName = getReadingCardName(a);
    const bName = getReadingCardName(b);

    if (currentLang === 'en') {
        const labelA = meta.choiceA || 'Option A';
        const labelB = meta.choiceB || 'Option B';
        const reversedCount = cards.filter(c => c.isReversed).length;
        const reversedNote = reversedCount
            ? `There is ${reversedCount} reversed card in this spread. Treat it as “hidden cost” or an internal hesitation that needs clarity.`
            : `Both cards are mostly upright, so the decision is less about “good vs bad” and more about alignment and timing.`;
        const qPrefix = q ? `About “${q}”, ` : '';
        const scope = ctx.scope || '';
        const extra = (ctx.guidance && ctx.guidance.length) ? pickFrom(ctx.guidance, seed + 19) : '';

        if (Math.abs(scoreA - scoreB) < 0.25) {
            return `${reversedNote}<br><br>${qPrefix}${scope}If you choose ${labelA}, the situation leans toward ${aKey}. If you choose ${labelB}, it leans toward ${bKey}. The energies are very close, so the best choice is the one whose cost you can carry consistently. Pick the option that supports your next 6–12 months, not just what feels urgent today.${extra ? ` ${extra}` : ''}`;
        }

        const pickA = scoreA > scoreB;
        const preferred = pickA ? labelA : labelB;
        const preferredCard = pickA ? a : b;
        const otherCard = pickA ? b : a;
        const preferredKey = pickA ? aKey : bKey;
        const otherKey = pickA ? bKey : aKey;
        const preferredName = pickA ? aName : bName;
        const otherName = pickA ? bName : aName;

        return `${reversedNote}<br><br>${qPrefix}${scope}${labelA}: ${aKey}. ${labelB}: ${bKey}. More supportive direction: ${preferred}. It tends to move with ${preferredKey} more smoothly when you commit and act, while the other path carries more of ${otherKey} and may ask for extra negotiation, patience, or inner work. If you want cleaner momentum today, lean toward ${preferred}.${extra ? ` ${extra}` : ''}`;
    }

    if (Math.abs(scoreA - scoreB) < 0.25) {
        const reversedCount = cards.filter(c => c.isReversed).length;
        const reversedNote = reversedCount
            ? `这组牌里出现 ${reversedCount} 张${t().reversed}。提醒你：有一边的隐性成本更高，或者你心里还没完全准备好。`
            : `这组牌能量非常接近。别急着要“标准答案”，先把自己的标准立出来。`;

        const labelA = meta.choiceA || '选择 A';
        const labelB = meta.choiceB || '选择 B';
        const qPrefix = q ? `围绕你问的「${q}」，` : '';
        const scope = ctx.scope || '';
        const extra = (ctx.guidance && ctx.guidance.length) ? pickFrom(ctx.guidance, seed + 19) : '';

        return `${reversedNote}<br><br>${qPrefix}${scope}${labelA} 这条路更像「${aKey}」，${labelB} 更靠近「${bKey}」。两边势均力敌时，就别用“对不对”来选，用“我愿意长期承担哪一种代价”来选。把两边的时间、金钱、精力、情绪负担写出来，选那个你能持续投入、也不会在未来怨自己的版本。${extra ? `${extra}` : ''}`;
    }

    const pickA = scoreA > scoreB;
    const pickLabel = pickA ? (meta.choiceA || '选择 A') : (meta.choiceB || '选择 B');
    const otherLabel = pickA ? (meta.choiceB || '选择 B') : (meta.choiceA || '选择 A');
    const pickCard = pickA ? a : b;
    const otherCard = pickA ? b : a;
    const pickKey = pickA ? aKey : bKey;
    const otherKey = pickA ? bKey : aKey;
    const pickName = pickA ? aName : bName;
    const otherName = pickA ? bName : aName;
    const reversedCount = cards.filter(c => c.isReversed).length;
    const reversedNote = reversedCount
        ? `这组牌里出现 ${reversedCount} 张${t().reversed}。说明你并不是没有方向，而是有顾虑：信息不完整、边界不清，或心里还在拉扯。`
        : `这组牌整体很清楚：你已经具备做决定的条件。剩下的，是把选择落地。`;
    const qPrefix = q ? `围绕你问的「${q}」，` : '';
    const scope = ctx.scope || '';
    const extra = (ctx.guidance && ctx.guidance.length) ? pickFrom(ctx.guidance, seed + 19) : '';

    return `${reversedNote}<br><br>${qPrefix}${scope}${pickLabel}：更像「${pickKey}」，比较容易推进；${otherLabel}：更像「${otherKey}」，通常需要先谈清楚或先处理一个前置条件。若你想要今天就出现更顺的回音，可以优先走 ${pickLabel}。关键不是选完就结束，而是把选择落到行动：用「${pickKey}」的方式去做一件具体的小事，局面会跟着动起来。${extra ? `${extra}` : ''}`;
}

function buildDailyConclusion(card) {
    const seed = hashSeed(`${card.arcana}:${card.suit || ''}:${card.id}:${card.isReversed ? 'R' : 'U'}`);
    const key = summarizeMeaning(meaningFor(card));
    const name = getReadingCardName(card);

    const luckyItemsZh = [
        '金色饰品', '银色戒指', '薄荷茶', '黑咖啡', '白纸与笔', '香氛', '耳机', '围巾',
        '一支好写的笔', '小蜡烛', '一本书', '一杯温水'
    ];
    const luckyItemsEn = [
        'a gold accessory', 'a silver ring', 'mint tea', 'black coffee', 'a blank notebook', 'a gentle scent',
        'headphones', 'a scarf', 'a smooth pen', 'a small candle', 'a book', 'a warm glass of water'
    ];
    const luckyNumbers = [1, 3, 5, 6, 7, 8, 9, 11, 13, 17, 21, 33];

    const focusZhUpright = [
        '适合把事情推进到下一步', '适合整理思路、做清单', '适合沟通、把话说清楚', '适合收尾、把未完成补齐',
        '适合做决定，但要慢一点', '适合学习、复盘与修正', '适合约人见面、交换信息', '适合把界限讲明白'
    ];
    const focusZhReversed = [
        '今天别硬推，先把卡住的点找出来', '先把情绪放到一边，再谈决定', '别急着证明自己，先求稳', '信息不够就不要下结论',
        '别一口气答应太多，留余地', '先收回能量，别被外界节奏带走', '先把误会澄清，再往下走', '今天更适合休整与观察'
    ];
    const cautionZh = [
        '别把话说满', '别冲动消费', '别熬夜', '别把自己逼太紧', '别跟人硬碰硬', '别拖延到最后一刻',
        '别反复纠结同一个点', '别把别人的情绪当成你的责任'
    ];
    const luckyTipsZh = [
        '靠近安静的地方会更顺', '把手机静音一小时会很有用', '写下来，比想更快', '先做最小的一步', '给自己留一点空间',
        '先完成，再完美', '先确认事实，再谈感受', '慢一点，反而更准'
    ];

    const focusEnUpright = [
        'Good for moving things forward', 'Good for clearing your head and listing priorities', 'Good for honest communication',
        'Good for wrapping up loose ends', 'Good for making a decision—slowly', 'Good for learning and refining',
        'Good for meeting people and exchanging info', 'Good for setting boundaries with grace'
    ];
    const focusEnReversed = [
        'Don’t force it. Find the real blockage first', 'Separate emotion from decision', 'Stability first—no need to prove anything today',
        'If information is missing, don’t conclude', 'Don’t overpromise. Leave room', 'Pull your energy back from noise',
        'Clear the misunderstanding before moving', 'Better for rest and observation'
    ];
    const cautionEn = [
        'don’t overcommit', 'don’t impulse-buy', 'don’t stay up too late', 'don’t push yourself too hard',
        'don’t argue to win', 'don’t leave it to the last minute', 'don’t loop the same thought', 'don’t carry other people’s moods'
    ];
    const luckyTipsEn = [
        'Quiet spaces bring clarity', 'One hour of phone-off helps', 'Write it down—it moves faster', 'Take the smallest next step',
        'Leave yourself breathing room', 'Done first, perfect later', 'Confirm facts before feelings', 'Slower is sharper'
    ];

    const luckyItem = currentLang === 'en'
        ? pickFrom(luckyItemsEn, seed)
        : pickFrom(luckyItemsZh, seed);
    const luckyNumber = luckyNumbers[seed % luckyNumbers.length];

    const focus = currentLang === 'en'
        ? (card.isReversed ? pickFrom(focusEnReversed, seed + 3) : pickFrom(focusEnUpright, seed + 3))
        : (card.isReversed ? pickFrom(focusZhReversed, seed + 3) : pickFrom(focusZhUpright, seed + 3));
    const caution = currentLang === 'en'
        ? pickFrom(cautionEn, seed + 7)
        : pickFrom(cautionZh, seed + 7);
    const tip = currentLang === 'en'
        ? pickFrom(luckyTipsEn, seed + 11)
        : pickFrom(luckyTipsZh, seed + 11);

    if (currentLang === 'en') {
        return `Card: ${name} (${orientationText(card)})<br><br>Today’s vibe: ${focus}. The keyword sits on ${key}—keep it simple and let the day respond.<br><br>Lucky item: ${luckyItem}<br>Lucky number: ${luckyNumber}<br>Watch out: ${caution}<br>Note: ${tip}<br><br>Takeaway: Keep ${key} as your anchor today. Focus on the smallest controllable step and let the rest unfold.`;
    }

    return `今日牌：${name}（${orientationText(card)}）<br><br>今日运势：${focus}。关键词落在「${key}」，今天别把自己拉太满，让事情自然回音。<br><br>幸运物：${luckyItem}<br>幸运号码：${luckyNumber}<br>注意事项：${caution}<br>小提醒：${tip}<br><br>今日提醒：把「${key}」当成今天的锚点，先做你能掌控的最小一步。剩下的别硬推，让它顺着你的节奏展开。`;
}

function hashSeed(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return Math.abs(h);
}

function pickFrom(arr, seed) {
    return arr[seed % arr.length];
}

function buildWhatsAppMessage(config, cards, meta) {
    const lines = [];

    if (currentLang === 'en') {
        lines.push(`Hi, I’d like a human reading.`);
        lines.push(`Spread: ${config.title}`);
        if (config.needsQuestion && meta.question) lines.push(`Question: ${meta.question}`);
        if (config.needsChoices) {
            if (meta.choiceA) lines.push(`Option A: ${meta.choiceA}`);
            if (meta.choiceB) lines.push(`Option B: ${meta.choiceB}`);
        }
        lines.push(`Cards:`);
        cards.forEach((c, idx) => {
            const pos = config.positions[idx] || '';
            lines.push(`- ${pos}: ${getReadingCardName(c)} (${orientationText(c)})`);
        });
        lines.push(``);
        lines.push(`Voice reading by appointment, 10 min / USD 5.9`);
        return lines.join('\n');
    }

    lines.push('你好，我想预约真人解牌。');
    lines.push(`牌阵：${config.title}`);
    if (config.needsQuestion && meta.question) lines.push(`问题：${meta.question}`);
    if (config.needsChoices) {
        if (meta.choiceA) lines.push(`选择A：${meta.choiceA}`);
        if (meta.choiceB) lines.push(`选择B：${meta.choiceB}`);
    }
    lines.push('抽到的牌：');
    cards.forEach((c, idx) => {
        const pos = config.positions[idx] || '';
        lines.push(`- ${pos}：${getReadingCardName(c)}（${orientationText(c)}）`);
    });
    lines.push('');
    lines.push('语音解牌可预约时间，10分钟 / USD5.9');
    return lines.join('\n');
}

function buildWhatsAppUrl(config, cards, meta) {
    const text = encodeURIComponent(buildWhatsAppMessage(config, cards, meta));
    return `https://wa.me/60127710829?text=${text}`;
}

function renderReadingAnalysis(config, cards, meta) {
    const container = document.getElementById('reading-analysis');
    if (!container) return;
    const lang = t();

    const metaLines = [];
    if (config.needsQuestion && meta.question) {
        metaLines.push(`${lang.metaQuestionPrefix}${meta.question}`);
    }
    if (config.needsChoices) {
        if (meta.choiceA) metaLines.push(`${lang.metaChoiceAPrefix}${meta.choiceA}`);
        if (meta.choiceB) metaLines.push(`${lang.metaChoiceBPrefix}${meta.choiceB}`);
    }

    const metaHtml = metaLines.length
        ? `<div class="analysis-block"><h3>${lang.analysisTheme}</h3><p>${metaLines.join('<br>')}</p></div>`
        : '';

    const blocks = cards.map((card, idx) => {
        const title = `${config.positions[idx]} · ${getReadingCardName(card)}（${orientationText(card)}）`;
        const text = meaningFor(card);
        return `<div class="analysis-block"><h3>${title}</h3><p>${text}</p></div>`;
    }).join('');

    let conclusion = '';
    if (config.key === 'timeline') conclusion = buildTimelineConclusion(cards, meta);
    if (config.key === 'choice') conclusion = buildChoiceConclusion(cards, meta);
    if (config.key === 'daily') conclusion = buildDailyConclusion(cards[0]);

    const conclusionHtml = `<div class="analysis-block"><h3>${lang.analysisConclusion}</h3><p>${conclusion}</p></div>`;
    let humanHtml = '';
    if (config.key !== 'daily') {
        const waUrl = buildWhatsAppUrl(config, cards, meta);
        const pricingText = lang.humanReading.otherPricing;
        humanHtml = `<div class="analysis-block"><h3>${lang.humanReading.title}</h3><p>${pricingText}</p><a class="btn-primary extra-btn" href="${waUrl}" target="_blank" rel="noopener">${lang.humanReading.btn}</a></div>`;
    }

    container.innerHTML = `<div class="analysis-title">${config.title}</div>${metaHtml}${blocks}${conclusionHtml}${humanHtml}`;
}

function startReading() {
    const spreadTypeEl = document.getElementById('spread-type');
    const questionEl = document.getElementById('reading-question');
    const choiceAEl = document.getElementById('choice-a');
    const choiceBEl = document.getElementById('choice-b');
    const btn = document.getElementById('start-reading');
    const result = document.getElementById('reading-result');

    if (!spreadTypeEl || !btn || !result) return;

    const config = getSpreadConfig(spreadTypeEl.value);
    const meta = {
        question: questionEl ? questionEl.value.trim() : '',
        choiceA: choiceAEl ? choiceAEl.value.trim() : '',
        choiceB: choiceBEl ? choiceBEl.value.trim() : ''
    };

    if (config.needsQuestion && !meta.question) {
        alert(t().alertNeedQuestion);
        return;
    }

    if (config.needsChoices && (!meta.choiceA || !meta.choiceB)) {
        alert(t().alertNeedChoices);
        return;
    }

    btn.disabled = true;
    const originalText = btn.innerText;
    btn.innerText = t().shuffling;
    resetReadingResult();

    setTimeout(() => {
        const cards = pickCards(config.count);
        renderReadingCards(config, cards);
        renderReadingAnalysis(config, cards, meta);
        result.style.display = 'block';
        btn.disabled = false;
        btn.innerText = originalText;
    }, 900);
}

function renderSpreadOptions() {
    const spreadTypeEl = document.getElementById('spread-type');
    if (!spreadTypeEl) return;
    const selected = spreadTypeEl.value || 'daily';
    const lang = t();
    spreadTypeEl.innerHTML = `
        <option value="daily">${lang.spreadOptions.daily}</option>
        <option value="choice">${lang.spreadOptions.choice}</option>
        <option value="timeline">${lang.spreadOptions.timeline}</option>
    `;
    spreadTypeEl.value = selected;
}

function syncHomeText() {
    const lang = t();
    const spreadLabel = document.getElementById('spread-label');
    const choicesLabel = document.getElementById('choices-label');
    const questionLabel = document.getElementById('question-label');
    const choiceA = document.getElementById('choice-a');
    const choiceB = document.getElementById('choice-b');
    const questionEl = document.getElementById('reading-question');
    const btn = document.getElementById('start-reading');
    const subtitle = document.getElementById('home-subtitle');

    if (spreadLabel) spreadLabel.innerText = lang.spreadLabel;
    if (choicesLabel) choicesLabel.innerText = lang.choicesLabel;
    if (questionLabel) questionLabel.innerText = lang.questionLabel;
    if (choiceA) choiceA.placeholder = lang.choiceAPlaceholder;
    if (choiceB) choiceB.placeholder = lang.choiceBPlaceholder;
    if (questionEl) questionEl.placeholder = lang.questionPlaceholder[getCurrentSpreadKey()] || '';
    if (btn) btn.innerText = lang.startBtn;
    if (subtitle) subtitle.innerText = lang.homeSubtitle;

    renderSpreadOptions();
    syncReadingForm();
}

function getCurrentSpreadKey() {
    const spreadTypeEl = document.getElementById('spread-type');
    return (spreadTypeEl && spreadTypeEl.value) ? spreadTypeEl.value : 'daily';
}

function setLanguage(langKey) {
    currentLang = langKey === 'zh' ? 'zh' : 'en';
    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
        toggle.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLang);
        });
    }
    syncHomeText();
    syncSiteText();
}

function initLanguageToggle() {
    const toggle = document.getElementById('lang-toggle');
    if (!toggle) return;
    toggle.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
    setLanguage(currentLang);
}

const COURSE_CODES = [
    'n9KxP4VqL7#sT2',
    'Q2m!8ZrWc5@Hj9',
    'tX6$Lp3Nw8^aR1',
    '7Gv#k2MZp9&dS4',
    'u5J@c8Yq1*Bn6F',
    'P8^sV4x!D2hK7m',
    'c3R#T9w@L6pX1q',
    'Z1!n7Kp^Q5vS8d',
    'm6@H2x#P9rV3t',
    'V9^q1S!w7c#K4p'
];

function initCourseGate() {
    const input = document.getElementById('course-code');
    const btn = document.getElementById('course-enter');
    const placeholder = document.getElementById('course-placeholder');
    if (!input || !btn || !placeholder) return;

    const enter = () => {
        const code = input.value.trim();
        if (!COURSE_CODES.includes(code)) {
            alert(t().course.invalid);
            return;
        }
        placeholder.style.display = 'block';
        placeholder.innerText = t().course.empty;
        input.value = '';
    };

    btn.addEventListener('click', enter);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            enter();
        }
    });
}

function syncSuitDesc() {
    const el = document.getElementById('suit-desc');
    if (!el) return;
    const desc = t().suitDesc[currentMinorSuit];
    el.innerText = desc || '';
}

function initStarTrail() {
    if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;
    let last = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - last < 35) return;
        last = now;

        const star = document.createElement('div');
        star.className = 'star-trail';
        star.style.left = `${e.clientX}px`;
        star.style.top = `${e.clientY}px`;
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 950);
    });
}

function renderConsultOptions() {
    const select = document.getElementById('consult-type');
    const placeholder = document.getElementById('consult-placeholder');
    if (!select) return;
    const current = select.value;
    const lang = t();
    if (placeholder) placeholder.innerText = lang.booking.consultPlaceholder;

    select.querySelectorAll('option').forEach(opt => {
        if (!opt.value) return;
        const label = lang.booking.consultOptions[opt.value];
        if (label) opt.innerText = label;
    });

    select.value = current;
}

function syncSiteText() {
    const lang = t();

    const navHome = document.getElementById('nav-home');
    const navManual = document.getElementById('nav-manual');
    const navCourse = document.getElementById('nav-course');
    const navBooking = document.getElementById('nav-booking');
    if (navHome) navHome.innerText = lang.nav.home;
    if (navManual) navManual.innerText = lang.nav.manual;
    if (navCourse) navCourse.innerText = lang.nav.course;
    if (navBooking) navBooking.innerText = lang.nav.booking;

    const manualTitle = document.getElementById('manual-title');
    if (manualTitle) manualTitle.innerText = lang.manualTitle;

    const tabMajor = document.getElementById('tab-major');
    const tabMinor = document.getElementById('tab-minor');
    if (tabMajor) tabMajor.innerText = lang.manualTabs.major;
    if (tabMinor) tabMinor.innerText = lang.manualTabs.minor;

    const suitWands = document.getElementById('suit-wands');
    const suitCups = document.getElementById('suit-cups');
    const suitSwords = document.getElementById('suit-swords');
    const suitPentacles = document.getElementById('suit-pentacles');
    if (suitWands) suitWands.innerText = lang.suits.wands;
    if (suitCups) suitCups.innerText = lang.suits.cups;
    if (suitSwords) suitSwords.innerText = lang.suits.swords;
    if (suitPentacles) suitPentacles.innerText = lang.suits.pentacles;

    const feature1Title = document.getElementById('feature-1-title');
    const feature1Desc = document.getElementById('feature-1-desc');
    const feature2Title = document.getElementById('feature-2-title');
    const feature2Desc = document.getElementById('feature-2-desc');
    const feature3Title = document.getElementById('feature-3-title');
    const feature3Desc = document.getElementById('feature-3-desc');
    if (feature1Title) feature1Title.innerText = lang.features.f1Title;
    if (feature1Desc) feature1Desc.innerText = lang.features.f1Desc;
    if (feature2Title) feature2Title.innerText = lang.features.f2Title;
    if (feature2Desc) feature2Desc.innerText = lang.features.f2Desc;
    if (feature3Title) feature3Title.innerText = lang.features.f3Title;
    if (feature3Desc) feature3Desc.innerText = lang.features.f3Desc;

    const bookingTitle = document.getElementById('booking-title');
    const bookingDesc = document.getElementById('booking-desc');
    if (bookingTitle) bookingTitle.innerText = lang.bookingTitle;
    if (bookingDesc) bookingDesc.innerText = lang.bookingDesc;

    const courseTitle = document.getElementById('course-title');
    const courseVideosTitle = document.getElementById('course-videos-title');
    const courseDesc = document.getElementById('course-desc');
    const courseCodeLabel = document.getElementById('course-code-label');
    const courseEnter = document.getElementById('course-enter');
    const coursePlaceholder = document.getElementById('course-placeholder');
    const courseOneOnOneTitle = document.getElementById('course-1on1-title');
    const courseOneOnOneDesc = document.getElementById('course-1on1-desc');
    const courseOneOnOneLink = document.getElementById('course-1on1-link');
    if (courseTitle) courseTitle.innerText = lang.course.title;
    if (courseVideosTitle) courseVideosTitle.innerText = lang.course.videosTitle;
    if (courseDesc) courseDesc.innerText = lang.course.desc;
    if (courseCodeLabel) courseCodeLabel.innerText = lang.course.codeLabel;
    if (courseEnter) courseEnter.innerText = lang.course.enter;
    if (coursePlaceholder && coursePlaceholder.style.display !== 'none') coursePlaceholder.innerText = lang.course.empty;
    if (courseOneOnOneTitle) courseOneOnOneTitle.innerText = lang.course.oneOnOneTitle;
    if (courseOneOnOneDesc) courseOneOnOneDesc.innerText = lang.course.oneOnOneDesc;
    if (courseOneOnOneLink) courseOneOnOneLink.innerText = lang.course.oneOnOneBtn;

    const labelName = document.getElementById('label-name');
    const labelPhone = document.getElementById('label-phone');
    const labelEmail = document.getElementById('label-email');
    const labelConsult = document.getElementById('label-consult-type');
    const labelMessage = document.getElementById('label-message');
    const bookingSubmit = document.getElementById('booking-submit');
    if (labelName) labelName.innerText = lang.booking.name;
    if (labelPhone) labelPhone.innerText = lang.booking.phone;
    if (labelEmail) labelEmail.innerText = lang.booking.email;
    if (labelConsult) labelConsult.innerText = lang.booking.consultType;
    if (labelMessage) labelMessage.innerText = lang.booking.message;
    if (bookingSubmit) bookingSubmit.innerText = lang.booking.submit;

    renderConsultOptions();

    const serviceTopTitle = document.getElementById('service-top-title');
    const serviceTopDesc = document.getElementById('service-top-desc');
    const service1Title = document.getElementById('service-1-title');
    const service1Desc = document.getElementById('service-1-desc');
    const service1Fit = document.getElementById('service-1-fit');
    const service1Btn = document.getElementById('service-1-btn');
    const service2Title = document.getElementById('service-2-title');
    const service2Desc = document.getElementById('service-2-desc');
    const service2Fit = document.getElementById('service-2-fit');
    const service2Btn = document.getElementById('service-2-btn');
    const service3Title = document.getElementById('service-3-title');
    const service3Price = document.getElementById('service-3-price');
    const service3Fit = document.getElementById('service-3-fit');
    const service3Desc = document.getElementById('service-3-desc');
    const service3Btn = document.getElementById('service-3-btn');
    const serviceNote = document.getElementById('service-note');

    if (serviceTopTitle) serviceTopTitle.innerText = lang.services.topTitle;
    if (serviceTopDesc) serviceTopDesc.innerText = lang.services.topDesc;
    if (service1Title) service1Title.innerText = lang.services.s1Title;
    if (service1Desc) service1Desc.innerText = lang.services.s1Desc;
    if (service1Fit) service1Fit.innerText = lang.services.s1Fit;
    if (service1Btn) service1Btn.innerText = lang.services.whatsappBtn;
    if (service2Title) service2Title.innerText = lang.services.s2Title;
    if (service2Desc) service2Desc.innerText = lang.services.s2Desc;
    if (service2Fit) service2Fit.innerText = lang.services.s2Fit;
    if (service2Btn) service2Btn.innerText = lang.services.whatsappBtn;
    if (service3Title) service3Title.innerText = lang.services.s3Title;
    if (service3Price) service3Price.innerText = lang.services.s3Price;
    if (service3Fit) service3Fit.innerText = lang.services.s3Fit;
    if (service3Desc) service3Desc.innerText = lang.services.s3Desc;
    if (service3Btn) service3Btn.innerText = lang.services.linkBtn;
    if (serviceNote) serviceNote.innerText = lang.services.contactDesc;

    const contactTitle = document.getElementById('contact-title');
    const contactPhone = document.getElementById('contact-phone');
    const contactEmail = document.getElementById('contact-email');
    const contactIg = document.getElementById('contact-ig');
    if (contactTitle) contactTitle.innerText = lang.contact.title;
    if (contactPhone) contactPhone.innerText = lang.contact.phone;
    if (contactEmail) contactEmail.innerText = lang.contact.email;
    if (contactIg) contactIg.innerText = lang.contact.ig;

    renderMajorCards();
    const minorVisible = document.getElementById('arcana-minor')?.classList.contains('active');
    if (minorVisible) {
        renderMinorCards(currentMinorSuit);
        syncSuitDesc();
    }
}

function initHomeReading() {
    const spreadTypeEl = document.getElementById('spread-type');
    const btn = document.getElementById('start-reading');
    if (!spreadTypeEl || !btn) return;

    spreadTypeEl.addEventListener('change', syncReadingForm);
    btn.addEventListener('click', startReading);
    syncReadingForm();
}

document.addEventListener('DOMContentLoaded', function() {
    renderMajorCards();
    initLanguageToggle();
    syncSiteText();
    initHomeReading();
    initCourseGate();
    initStarTrail();
    syncSuitDesc();
});
