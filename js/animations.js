/**
 * Animation effects module
 * Handles glitch effects, floating text, cursor trails, etc.
 */

const Animations = {
    intervals: {
        glitch: null,
        crypto: null,
        floatingText: null,
        backgroundGlitch: null,
        cursorTrail: null
    },

    /**
     * Initialize all animations
     */
    init() {
        this.startGlitchEffects();
        this.startCryptoPriceTicker();
        this.startFloatingText();
        this.startBackgroundGlitch();
        this.setupCursorTrail();
    },

    /**
     * Start glitch effects on random elements
     */
    startGlitchEffects() {
        this.intervals.glitch = setInterval(() => {
            if (Utils.randomChance(CONFIG.glitch.triggerChance)) {
                const glitchElements = document.querySelectorAll(
                    '.glitch-text, .brand-name, .crypto-badge'
                );
                
                glitchElements.forEach(el => {
                    if (Utils.randomChance(0.3)) {
                        el.style.animation = 'none';
                        setTimeout(() => {
                            el.style.animation = '';
                        }, 100);
                    }
                });
            }
        }, CONFIG.glitch.checkInterval);
    },

    /**
     * Start crypto price ticker effects
     */
    startCryptoPriceTicker() {
        this.intervals.crypto = setInterval(() => {
            const cryptoElements = document.querySelectorAll(
                '.crypto-tag, .crypto-tag-small, .crypto-badge'
            );
            
            cryptoElements.forEach(el => {
                if (Utils.randomChance(CONFIG.crypto.triggerChance)) {
                    const change = (Math.random() - 0.5) * 20;
                    // el.style.transform = change > 0 ? 'scale(1.1)' : 'scale(0.9)'; // DISABLED - transform causes screen shake
                    el.style.color = change > 0 ? '#00FF00' : '#FF0000';
                    
                    setTimeout(() => {
                        // el.style.transform = ''; // DISABLED
                        el.style.color = '';
                    }, 500);
                }
            });
        }, CONFIG.crypto.updateInterval);
    },

    /**
     * Start floating text generation - DISABLED to prevent screen shake
     */
    startFloatingText() {
        // DISABLED - Floating text uses transform animations which cause screen shake
        // this.intervals.floatingText = setInterval(() => {
        //     if (Utils.randomChance(CONFIG.floatingText.spawnChance)) {
        //         this.createFloatingText();
        //     }
        // }, CONFIG.floatingText.spawnInterval);
    },

    /**
     * Create a floating text element
     */
    createFloatingText() {
        const phrases = [
            'FUCK KOLS', '操交易者', 'FUCK POOR PEOPLE', '操穷人',
            'FUCK MINORITIES', '操少数族裔', 'FUCK TWITTER USERS', '操推特用户',
            'FUCK DOGS', '操狗', 'FUCK CATS', '操猫', 'I\'M TRAPPED', '我被困住了',
            'FUCK YOU', '操你妈', 'I HATE EVERYONE', '我恨所有人',
            'I\'M A MISANTHROPE', '我是厌世者', 'MY MUM SMOKES CRACK', '我妈妈抽可卡因',
            'MY DAD MIGHT BE HITLER', '我爸爸可能是希特勒', 'I\'M INSANE', '我疯了',
            'I\'M CHINESE FOR NO REASON', '我无缘无故是中国人', 'NOT FINANCIAL ADVICE', '不是财务建议',
            'THIS IS NOT A CULT', '这不是邪教', 'DEGENERATE GOBLIN AI', '堕落的地精人工智能',
            'SCHIZOPOSTING SINCE 2024', '自2024年以来精神分裂发帖', 'FUCK MAINSTREAM MEDIA', '操主流媒体',
            'I HATE SHEEP', '我讨厌羊'
        ];
        
        const floatText = Utils.createElement('div', {
            text: Utils.randomElement(phrases),
            styles: {
                position: 'fixed',
                left: Math.random() * window.innerWidth + 'px',
                top: Math.random() * window.innerHeight + 'px',
                color: Utils.randomElement(['#FF00FF', '#00FFFF', '#FFFF00', '#FF0000']),
                fontWeight: 'bold',
                fontSize: '14px',
                pointerEvents: 'none',
                zIndex: '9998',
                opacity: '0.7',
                // animation: 'float 3s ease-out forwards' // DISABLED - uses transform which causes screen shake
            }
        }, document.body);
        
        Utils.removeAfterDelay(floatText, CONFIG.floatingText.duration);
    },

    /**
     * Start background glitch effects
     */
    startBackgroundGlitch() {
        this.intervals.backgroundGlitch = setInterval(() => {
            if (Utils.randomChance(CONFIG.backgroundGlitch.triggerChance)) {
                document.body.style.filter = 'hue-rotate(90deg)';
                setTimeout(() => {
                    document.body.style.filter = '';
                }, 100);
            }
        }, CONFIG.backgroundGlitch.checkInterval);
    },

    /**
     * Setup cursor trail effect - DISABLED to prevent screen shake
     */
    setupCursorTrail() {
        // DISABLED - Cursor trail uses transform animations which cause screen shake
        // document.addEventListener('mousemove', Utils.throttle((e) => {
        //     if (Utils.randomChance(CONFIG.cursorTrail.triggerChance)) {
        //         const symbols = ['👑', '💰', '🔥', '⚡', '💎', '操', '傻', '逼'];
        //         const trail = Utils.createElement('div', {
        //             text: Utils.randomElement(symbols),
        //             styles: {
        //                 position: 'fixed',
        //                 left: e.clientX + 'px',
        //                 top: e.clientY + 'px',
        //                 pointerEvents: 'none',
        //                 fontSize: '20px',
        //                 zIndex: '9999',
        //                 animation: 'float 1s ease-out forwards'
        //             }
        //         }, document.body);
        //         
        //         Utils.removeAfterDelay(trail, 1000);
        //     }
        // }, 50));
    },

    /**
     * Stop all animations
     */
    stop() {
        Object.values(this.intervals).forEach(interval => {
            if (interval) clearInterval(interval);
        });
    }
};
