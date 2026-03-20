/**
 * Counter management module
 * Handles visitor count, meme sales, and response time counters
 */

const Counters = {
    visitorCount: CONFIG.visitor.initialCount,
    memesSold: CONFIG.memes.initialSold,
    responseTime: 0.00,
    
    intervals: {
        visitor: null,
        memes: null,
        responseTime: null
    },

    /**
     * Initialize all counters
     */
    init() {
        this.startVisitorCounter();
        this.startMemeCounter();
        this.startResponseTimeCounter();
    },

    /**
     * Start visitor counter with random fluctuations
     */
    startVisitorCounter() {
        const visitorElement = document.getElementById('visitorCount');
        
        this.intervals.visitor = setInterval(() => {
            const change = Utils.randomNumber(
                -CONFIG.visitor.changeRange, 
                CONFIG.visitor.changeRange
            );
            this.visitorCount += change;
            if (this.visitorCount < 0) this.visitorCount = 0;
            
            if (visitorElement) {
                visitorElement.textContent = Utils.formatNumber(this.visitorCount);
            }
        }, CONFIG.visitor.updateInterval);
    },

    /**
     * Start meme sales counter
     */
    startMemeCounter() {
        const memesSoldElement = document.getElementById('memesSold');
        
        this.intervals.memes = setInterval(() => {
            this.memesSold += Utils.randomNumber(0, CONFIG.memes.incrementRange);
            
            if (memesSoldElement) {
                memesSoldElement.textContent = Utils.formatNumber(this.memesSold);
            }
        }, CONFIG.memes.updateInterval);
    },

    /**
     * Start fake response time counter
     */
    startResponseTimeCounter() {
        // Disabled: DM replies now shows static "WHENEVER" text
    },

    /**
     * Stop all counters
     */
    stop() {
        Object.values(this.intervals).forEach(interval => {
            if (interval) clearInterval(interval);
        });
    }
};
