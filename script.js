const tarotCards = [
    { name: '愚者', suit: '大阿尔克那', keywords: ['探索', '勇气', '新开始'], meaning: '你正站在未知的门槛，勇敢迈出第一步会带来新的机遇。' },
    { name: '魔术师', suit: '大阿尔克那', keywords: ['创造力', '掌控', '能量'], meaning: '你拥有将想法转化为现实的能量，现在是行动的时刻。' },
    { name: '女祭司', suit: '大阿尔克那', keywords: ['直觉', '秘密', '内在智慧'], meaning: '你的直觉会引导你揭示隐藏的真相，倾听内心的声音。' },
    { name: '皇后', suit: '大阿尔克那', keywords: ['滋养', '丰饶', '创造'], meaning: '你正在孕育一个结果，耐心和细心会带来稳健的成长。' },
    { name: '皇帝', suit: '大阿尔克那', keywords: ['权威', '结构', '稳定'], meaning: '建立清晰计划和规则，将为你带来更强的掌控感。' },
    { name: '恋人', suit: '大阿尔克那', keywords: ['选择', '连接', '合作'], meaning: '关键在于与你或他人的关系中找到平衡与真诚。' },
    { name: '战车', suit: '大阿尔克那', keywords: ['意志', '胜利', '决心'], meaning: '只要你坚定向前，当前的阻碍会被你的决心推开。' },
    { name: '隐者', suit: '大阿尔克那', keywords: ['沉思', '内省', '独立'], meaning: '花点时间反思，你会从沉静中获取深刻的答案。' },
    { name: '力量', suit: '大阿尔克那', keywords: ['勇气', '耐心', '温柔'], meaning: '用温柔与坚韧并行，内在力量会化解外在挑战。' },
    { name: '正义', suit: '大阿尔克那', keywords: ['平衡', '因果', '真理'], meaning: '事态正朝向公平结果发展，保持诚实会让你占据有利位置。' },
    { name: '节制', suit: '大阿尔克那', keywords: ['协调', '节制', '流动'], meaning: '平衡你的节奏和资源，适度会让你更快抵达目标。' },
    { name: '命运之轮', suit: '大阿尔克那', keywords: ['转变', '循环', '机遇'], meaning: '变化正在到来，抓住契机会让你在新的阶段中获益。' },
    { name: '倒吊人', suit: '大阿尔克那', keywords: ['停顿', '视角', '放下'], meaning: '暂时的停滞并非失败，它为你提供了从不同角度观察的机会。' },
    { name: '死神', suit: '大阿尔克那', keywords: ['结束', '重生', '释放'], meaning: '旧模式正在结束，新的开始正在酝酿，放下才能迎来新生。' },
    { name: '星星', suit: '大阿尔克那', keywords: ['希望', '灵感', '治愈'], meaning: '你正被温柔的希望照亮，继续保持信念与开放。' },
    { name: '月亮', suit: '大阿尔克那', keywords: ['幻象', '直觉', '潜意识'], meaning: '注意内心深处的声音，它会帮助你分辨真相与迷雾。' },
    { name: '太阳', suit: '大阿尔克那', keywords: ['喜悦', '成功', '清晰'], meaning: '前路充满明朗的能量，乐观与努力会带来丰盛回报。' },
    { name: '审判', suit: '大阿尔克那', keywords: ['觉醒', '审视', '蜕变'], meaning: '你正在经历一次重要觉醒，拥抱改变会让你更接近真实的自己。' },
    { name: '世界', suit: '大阿尔克那', keywords: ['完成', '成就', '圆满'], meaning: '一个阶段的完成带来圆满收获，你更接近自己理想的图景。' }
];

const cardElements = document.querySelectorAll('.card-card');
const oracleForm = document.getElementById('oracleForm');
const questionInput = document.getElementById('question');
const resultPanel = document.getElementById('resultPanel');
const resultQuestion = document.getElementById('resultQuestion');
const resultCards = document.getElementById('resultCards');
const resultText = document.getElementById('resultText');
let isAnimating = false;

oracleForm.addEventListener('submit', event => {
    event.preventDefault();
    if (isAnimating) return;
    const question = questionInput.value.trim();
    if (!question) {
        questionInput.focus();
        questionInput.setAttribute('placeholder', '请先输入一个问题，再开始占卜。');
        return;
    }
    startDivination(question);
});

function startDivination(question) {
    isAnimating = true;
    resetCards();
    resultPanel.classList.remove('revealed');
    resultQuestion.textContent = '';
    resultCards.innerHTML = '';
    resultText.textContent = '';

    const selection = drawCards(3);
    const flipDelay = 600;

    selection.forEach((card, index) => {
        const cardEl = cardElements[index];
        setTimeout(() => {
            flipCard(cardEl, card);
            if (index === selection.length - 1) {
                setTimeout(() => showResult(question, selection), 1000);
            }
        }, index * flipDelay);
    });
}

function resetCards() {
    cardElements.forEach(cardEl => {
        cardEl.classList.remove('flipped');
        const front = cardEl.querySelector('.card-front');
        front.innerHTML = '';
    });
}

function drawCards(count) {
    const deck = [...tarotCards];
    const result = [];
    for (let i = 0; i < count; i += 1) {
        const index = Math.floor(Math.random() * deck.length);
        result.push(deck.splice(index, 1)[0]);
    }
    return result;
}

function flipCard(cardEl, card) {
    const front = cardEl.querySelector('.card-front');
    front.innerHTML = `
    <div class="card-preview">
      <span class="card-name">${card.name}</span>
      <span class="card-suit">${card.suit}</span>
      <p class="card-keywords">${card.keywords.join(' · ')}</p>
    </div>
  `;
    cardEl.classList.add('flipped');
}

function showResult(question, cards) {
    const intro = generateIntro(question, cards);
    const cardSummary = cards.map(card => `<span>${card.name}</span>`).join('');
    const interpretation = cards
        .map((card, index) => `第 ${index + 1} 张：${card.name} — ${card.meaning}`)
        .join('\n\n');

    resultQuestion.textContent = `问题：${question}`;
    resultCards.innerHTML = cardSummary;
    resultText.textContent = `${intro}\n\n${interpretation}`;
    resultPanel.classList.add('revealed');
    isAnimating = false;
}

function generateIntro(question, cards) {
    const cardNames = cards.map(card => card.name).join('、');
    return `你的问题“${question}”被星辰捕捉，三张塔罗牌依次显现：${cardNames}。它们将共同揭示当前的能量流动和未来的关键点。`;
}
