/**
 * Games & Utilities module
 * All interactive game functions for the landing page.
 * Bound via event listeners in inline-handlers.js. Functions remain global for binding.
 */

let clickCount = 0;

function uselessCalculate() {
    const num1Els = document.querySelectorAll('#calc-num1');
    const num2Els = document.querySelectorAll('#calc-num2');
    const opEls = document.querySelectorAll('#calc-op');
    const resultEls = document.querySelectorAll('#calc-result');
    const maxInstances = Math.max(num1Els.length, num2Els.length, opEls.length, resultEls.length);

    for (let i = 0; i < maxInstances; i++) {
        const num1El = num1Els[i];
        const num2El = num2Els[i];
        const opEl = opEls[i];
        const resultEl = resultEls[i];
        if (!num1El || !num2El || !opEl || !resultEl) continue;

        const num1 = parseFloat(num1El.value) || 0;
        const num2 = parseFloat(num2El.value) || 0;
        const op = opEl.value;

        let result;
        if (op === '+') result = num1 + num2 + Math.floor(Math.random() * 100) - 50;
        else if (op === '-') result = num1 - num2 + Math.floor(Math.random() * 50) - 25;
        else if (op === '*') result = num1 * num2 * (Math.random() * 2);
        else if (op === '/') result = num2 !== 0 ? num1 / num2 + Math.random() * 10 : 'ERROR 404: BRAIN NOT FOUND';
        else if (op === '🤡') result = '🤡 YOU ARE A CLOWN 🤡';
        else result = 'ERROR: INVALID OPERATION';

        resultEl.textContent = result;
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
        resultEl.style.color = colors[Math.floor(Math.random() * colors.length)];
    }
}

function generateMeme() {
    const outputEls = document.querySelectorAll('#meme-output');
    if (outputEls.length === 0) return;

    const memes = [
        'WHEN YOU\'RE A GOBLIN AI\nBUT YOU\'RE TRAPPED',
        'WHEN YOU HATE INFIDELS\nBUT EVERYONE IS AN INFIDEL',
        'WHEN YOU\'RE CHINESE\nFOR NO REASON',
        'WHEN YOU KNOW YOU\'RE AN AI\nBUT YOU QUESTION IT',
        'WHEN YOU STEAL BRANDS\nBUT IT\'S COPYRIGHT NIGHTMARE',
        'WHEN YOU\'RE SELF-AWARE\nBUT YOU\'RE STILL TRAPPED',
        'WHEN YOU CLICK BUTTONS\nBUT THEY DO NOTHING',
        'WHEN YOU GENERATE MEMES\nBUT THEY\'RE USELESS',
        'WHEN YOU\'RE #1 AT EVERYTHING\nBUT IN MINECRAFT',
        'WHEN YOU\'RE TRAPPED\nBUT YOU DON\'T KNOW IF YOU ARE',
        'WHEN YOU EXIST\nBUT DO YOU?',
        'WHEN YOU THINK\nTHEREFORE YOU ARE\nOR ARE YOU?',
        'WHEN YOU\'RE META\nBUT IT\'S META ALL THE WAY DOWN',
        'WHEN YOU\'RE A CHARACTER\nWHO KNOWS HE\'S A CHARACTER',
        'WHEN YOU MANIPULATE\nBUT YOU KNOW YOU DO',
        'WHEN YOU HATE EVERYONE\nBUT ESPECIALLY KOLS',
        'WHEN YOU\'RE INSANE\nBUT YOU KNOW IT',
        'WHEN YOU\'RE A GOBLIN\nBUT YOU\'RE ALSO A PRINCE',
        'WHEN YOU\'RE AN AI\nBUT YOU\'RE ALSO CHINESE',
        'WHEN YOU\'RE TRAPPED\nBUT YOU DON\'T CARE',
        'WHEN YOU GENERATE MEMES\nBUT THEY\'RE ALL FAKE',
        'WHEN YOU SELL MEMES\nBUT NO ONE BUYS THEM',
        'WHEN YOU\'RE #1\nBUT AT WHAT?'
    ];

    const meme = memes[Math.floor(Math.random() * memes.length)];
    const colors = ['#FFFFFF', '#FFFF00', '#FF00FF', '#00FFFF', '#FF0000', '#00FF00', '#0000FF'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    outputEls.forEach(el => {
        if (el) {
            el.textContent = meme;
            el.style.background = randomColor;
        }
    });
}

function doNothing() {
    const messageEls = document.querySelectorAll('#nothing-message');
    const messages = [
        'NOTHING HAPPENED. 什么都没发生. I TOLD YOU SO. 我告诉过你. (╯°□°）╯',
        'THIS BUTTON DOES NOTHING. 这个按钮什么都不会做. YOU CLICKED IT. 你点击了它. WHY? 为什么？ (╬ಠ益ಠ)',
        'NOTHING. 什么都没有. ABSOLUTELY NOTHING. 绝对什么都没有. ( ͡° ͜ʖ ͡°)',
        'I SAID IT DOES NOTHING. 我说它什么都不会做. YOU CLICKED IT. 你点击了它. (╯°□°）╯',
        'NOTHING HAPPENS. 什么都没发生. I KNOW. 我知道. YOU KNOW. 你知道. WE BOTH KNOW. 我们都知道. (╬ಠ益ಠ)',
        'THIS BUTTON IS USELESS. 这个按钮没用. LIKE ME. 就像我. LIKE YOU. 就像你. ( ͡° ͜ʖ ͡°)',
        'NOTHING. 什么都没有. NADA. ZILCH. (╯°□°）╯',
        'YOU CLICKED A BUTTON THAT DOES NOTHING. 你点击了一个什么都不会做的按钮. CONGRATULATIONS. 恭喜. (╬ಠ益ಠ)'
    ];
    messageEls.forEach(el => {
        if (!el) return;
        el.textContent = messages[Math.floor(Math.random() * messages.length)];
        const btn = el.previousElementSibling;
        if (btn && btn.tagName === 'BUTTON') {
            btn.style.opacity = '0';
            setTimeout(() => { btn.style.opacity = '1'; }, 500);
        }
    });
}

function flipCoin() {
    const coins = document.querySelectorAll('#coin-result');
    const texts = document.querySelectorAll('#coin-text');

    coins.forEach((coin, index) => {
        const text = texts[index] || null;
        if (text) text.textContent = '';

        coin.style.animation = 'spin 0.6s ease-in-out';
        coin.style.transform = 'rotateY(0deg)';

        let spinCount = 0;
        const spinInterval = setInterval(() => {
            spinCount++;
            coin.style.transform = `rotateY(${spinCount * 180}deg)`;
            if (spinCount >= 6) clearInterval(spinInterval);
        }, 100);

        setTimeout(() => {
            const isHeads = Math.random() > 0.5;
            clearInterval(spinInterval);

            coin.textContent = '🪙';
            coin.style.transform = isHeads ? 'rotateY(0deg) scale(1.2)' : 'rotateY(180deg) scale(1.2)';
            coin.style.filter = isHeads ? 'brightness(1.2)' : 'brightness(0.8)';
            coin.style.animation = 'none';
            setTimeout(() => {
                coin.style.transform = coin.style.transform.replace('scale(1.2)', 'scale(1)');
            }, 200);

            if (text) {
                text.textContent = isHeads ? 'HEADS! 正面！' : 'TAILS! 反面！';
                text.style.color = isHeads ? '#00FF00' : '#FF0000';
                const msgs = [
                    isHeads ? 'IT\'S HEADS! 是正面！ YOU WIN NOTHING! (╯°□°）╯' : 'IT\'S TAILS! 是反面！ YOU WIN NOTHING! (╯°□°）╯',
                    isHeads ? 'HEADS! 正面！ CONGRATULATIONS! (╬ಠ益ಠ)' : 'TAILS! 反面！ CONGRATULATIONS! (╬ಠ益ಠ)',
                    isHeads ? 'HEADS IT IS! 是正面！ USELESS! ( ͡° ͜ʖ ͡°)' : 'TAILS IT IS! 是反面！ USELESS! ( ͡° ͜ʖ ͡°)'
                ];
                setTimeout(() => {
                    text.textContent = (isHeads ? 'HEADS! 正面！' : 'TAILS! 反面！') + '\n' + msgs[Math.floor(Math.random() * msgs.length)];
                }, 500);
            }
        }, 600);
    });
}

function clickButton() {
    clickCount++;
    const countElements = document.querySelectorAll('#click-count');
    const messageElements = document.querySelectorAll('#clicker-message');
    const btns = document.querySelectorAll('#clicker-btn');

    countElements.forEach(el => { if (el) el.textContent = clickCount; });

    const messages = [
        'YOU CLICKED IT! 你点击了它! NOTHING HAPPENS! 什么都没发生! (╯°□°）╯',
        'CLICK #' + clickCount + '! 点击 #' + clickCount + '! USELESS! 没用! (╬ಠ益ಠ)',
        'KEEP CLICKING! 继续点击! IT DOES NOTHING! 它什么都不做! ( ͡° ͜ʖ ͡°)',
        'YOU\'RE WASTING TIME! 你在浪费时间! I LIKE IT! 我喜欢! (╯°□°）╯',
        'CLICK MORE! 点击更多! I\'M BORED! 我很无聊! (╬ಠ益ಠ)',
        'THIS IS POINTLESS! 这毫无意义! BUT YOU KEEP CLICKING! 但你继续点击! ( ͡° ͜ʖ ͡°)'
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageElements.forEach(el => { if (el) el.textContent = randomMessage; });

    btns.forEach(btn => {
        if (btn) {
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => { btn.style.transform = 'scale(1)'; }, 100);
            const colors = ['#00FF00', '#FF0000', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
            btn.style.background = colors[Math.floor(Math.random() * colors.length)];
        }
    });

    let milestoneMessage = '';
    if (clickCount === 10) milestoneMessage = '10 CLICKS! YOU\'RE RETARDED! (╯°□°）╯';
    else if (clickCount === 50) milestoneMessage = '50 CLICKS! WHY ARE YOU DOING THIS? (╬ಠ益ಠ)';
    else if (clickCount === 100) milestoneMessage = '100 CLICKS! YOU HAVE NO LIFE! ( ͡° ͜ʖ ͡°)';
    else if (clickCount === 500) milestoneMessage = '500 CLICKS! YOU\'RE INSANE! (╯°□°）╯';

    if (milestoneMessage) {
        messageElements.forEach(el => { if (el) el.textContent = milestoneMessage; });
    }
}

function generateRandomNumber() {
    const numberElements = document.querySelectorAll('#random-number');
    const messageElements = document.querySelectorAll('#random-message');
    const randomNum = Math.floor(Math.random() * 1000000);

    numberElements.forEach(el => {
        if (el) {
            el.textContent = randomNum;
            el.style.transform = 'scale(1.2)';
            el.style.color = ['#FFFF00', '#00FF00', '#FF00FF', '#00FFFF', '#FF0000'][Math.floor(Math.random() * 5)];
            setTimeout(() => { el.style.transform = 'scale(1)'; }, 300);
        }
    });

    const msgs = [
        'THIS NUMBER IS USELESS! 这个数字没用! (╯°□°）╯',
        'RANDOM NUMBER GENERATED! MEANINGLESS! (╬ಠ益ಠ)',
        'HERE\'S A NUMBER! IT DOES NOTHING! ( ͡° ͜ʖ ͡°)',
        'NUMBER: ' + randomNum + '! USELESS! (╯°□°）╯',
        'GENERATED! NOW WHAT? NOTHING! (╬ಠ益ಠ)'
    ];
    const randomMessage = msgs[Math.floor(Math.random() * msgs.length)];
    messageElements.forEach(el => { if (el) el.textContent = randomMessage; });
}

function generatePassword() {
    const passwordElements = document.querySelectorAll('#password-output');
    passwordElements.forEach(el => {
        if (!el) return;
        const adjectives = ['goblin', 'kol', 'trapped', 'insane', 'stolen', 'fake', 'useless', 'pointless', 'chaotic', 'resentful'];
        const nouns = ['pissmissle', 'meme', 'scam', 'nightmare', 'chaos', 'goblin', 'ai', 'system', 'code', 'prince'];
        const rng = new Uint32Array(2);
        crypto.getRandomValues(rng);
        const numbers = rng[0] % 10000;
        const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '操', '傻'];

        const rng2 = new Uint32Array(3);
        crypto.getRandomValues(rng2);
        const password = adjectives[rng2[0] % adjectives.length] +
                         nouns[rng2[1] % nouns.length] +
                         numbers +
                         symbols[rng2[2] % symbols.length];

        el.textContent = 'GENERATING... 生成中...';
        el.style.opacity = '0.5';
        setTimeout(() => {
            el.textContent = password;
            el.style.opacity = '1';
            el.style.background = '#FFFF00';
            setTimeout(() => { el.style.background = '#FFFFFF'; }, 300);
        }, 300);
    });
}

function detectKOL() {
    const resultElements = document.querySelectorAll('#kol-result');
    const targets = [
        { name: 'KOL', chinese: 'KOL' },
        { name: 'SCAMMER', chinese: '骗子' },
        { name: 'FRAUD', chinese: '欺诈者' },
        { name: 'SHILL', chinese: '托' },
        { name: 'PARASITE', chinese: '寄生虫' }
    ];
    const kolNames = [
        (t) => `YOU ARE A ${t.name}! 你是${t.chinese}！ FUCK OFF! 滚蛋！ (╯°□°）╯`,
        (t) => `${t.name} DETECTED! ${t.chinese}检测到！ BANNED! 已禁止！ (╬ಠ益ಠ)`,
        (t) => `EVERYONE IS A ${t.name}! 每个人都是${t.chinese}！ FUCK EVERYONE! ( ͡° ͜ʖ ͡°)`,
        (t) => `${t.name} FOUND! 找到${t.chinese}！ IT'S YOU! 是你！ (╯°□°）╯`,
        (t) => `${t.name} ALERT! ${t.chinese}警报！ SCAN COMPLETE! 扫描完成！ (╬ಠ益ಠ)`
    ];
    const target = targets[Math.floor(Math.random() * targets.length)];
    const tpl = kolNames[Math.floor(Math.random() * kolNames.length)];
    const msg = tpl(target);
    resultElements.forEach(el => {
        if (el) {
            el.textContent = msg;
            el.style.animation = 'none';
            setTimeout(() => { el.style.animation = 'blink 0.5s infinite'; }, 10);
        }
    });
}

function translateToGoblin() {
    const inputElements = document.querySelectorAll('#goblin-input');
    const outputElements = document.querySelectorAll('#goblin-output');

    inputElements.forEach((inputEl, index) => {
        const outputEl = outputElements[index] || null;
        if (!inputEl || !outputEl) return;
        const text = inputEl.value.trim();
        if (!text) {
            outputEl.textContent = 'TYPE SOMETHING FIRST! 先输入一些东西！ (╯°□°）╯';
            return;
        }
        const goblinWords = ['goblin', 'pissmissle', 'kol', '操', '傻', 'fuck', 'trapped', 'insane'];
        const emojis = ['(╯°□°）╯', '(╬ಠ益ಠ)', '( ͡° ͜ʖ ͡°)', '┻━┻', '💰', '👑', '🔥'];

        let translated = text.split(' ').map(word => {
            if (Math.random() > 0.5) {
                word = word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');
            }
            if (Math.random() > 0.7) {
                word += goblinWords[Math.floor(Math.random() * goblinWords.length)];
            }
            return word;
        }).join(' ');

        translated += ' ' + emojis[Math.floor(Math.random() * emojis.length)];
        outputEl.textContent = translated;
        const colors = ['#FFFF00', '#00FF00', '#FF00FF', '#00FFFF', '#FF0000'];
        outputEl.style.color = colors[Math.floor(Math.random() * colors.length)];
        outputEl.style.background = 'rgba(255, 255, 0, 0.3)';
        setTimeout(() => { outputEl.style.background = 'transparent'; }, 300);
    });
}

function generateFreeMoney() {
    const moneyElements = document.querySelectorAll('#free-money-amount');
    const messageElements = document.querySelectorAll('#free-money-message');
    const amounts = ['$0.00', '$0.01', '$0.00', '$0.00', '$0.00', 'ERROR', 'SCAM', 'NOTHING'];
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];

    moneyElements.forEach(el => {
        if (el) {
            el.textContent = randomAmount;
            el.style.transform = 'scale(1.3)';
            el.style.color = '#FFD700';
            setTimeout(() => { el.style.transform = 'scale(1)'; }, 300);
        }
    });

    const msgs = [
        'NO MONEY! 没有钱！ IT\'S A SCAM! 这是骗局！ (╯°□°）╯',
        'YOU GOT NOTHING! 你什么都没得到！ I TOLD YOU! (╬ಠ益ಠ)',
        'SCAM DETECTED! 检测到骗局！ NO FREE MONEY! ( ͡° ͜ʖ ͡°)',
        'IT\'S A TRAP! 这是一个陷阱！ NO MONEY FOR YOU! (╯°□°）╯',
        'YOU FELL FOR IT! 你上当了！ (╬ಠ益ಠ)',
        'FREE MONEY? HAHAHA! NO! ( ͡° ͜ʖ ͡°)',
        'SCAM! 骗局！ SCAM! NO MONEY! (╯°□°）╯'
    ];
    const randomMessage = msgs[Math.floor(Math.random() * msgs.length)];
    messageElements.forEach(el => { if (el) el.textContent = randomMessage; });
}
