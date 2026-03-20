/**
 * Counter management module
 * Handles visitor count, meme sales counters
 * Visitor count persists in localStorage and increments each visit
 */

const Counters = {
    visitorCount: 0,
    memesSold: CONFIG.memes.initialSold,
    
    intervals: {
        visitor: null,
        memes: null
    },

    /**
     * Initialize all counters
     */
    init() {
        this.startVisitorCounter();
        this.startMemeCounter();
    },

    /**
     * Start visitor counter — persists in localStorage, increments each visit
     * Also does small random fluctuations to feel alive
     */
    startVisitorCounter() {
        // Base count + real visits from localStorage
        var baseCount = 69420;
        var stored = 0;
        try {
            stored = parseInt(localStorage.getItem('piss_visitor_count') || '0', 10);
            stored++;
            localStorage.setItem('piss_visitor_count', String(stored));
        } catch(e) {
            stored = Math.floor(Math.random() * 100);
        }
        this.visitorCount = baseCount + stored;

        // Update all visitor counter elements
        var self = this;
        function updateAll() {
            var formatted = self.visitorCount.toLocaleString();
            var padded = String(self.visitorCount).padStart(6, '0');
            
            var el1 = document.getElementById('visitorCount');
            if (el1) el1.textContent = formatted;
            
            var el2 = document.getElementById('popup-visitor-count');
            if (el2) el2.textContent = formatted;
            
            var el3 = document.getElementById('visitor-counter-2');
            if (el3) el3.textContent = padded;
            
            var el4 = document.getElementById('mini-visitor-count');
            if (el4) el4.textContent = formatted;
        }

        // Initial update
        updateAll();

        // Small random fluctuations every 3 seconds (the count is alive)
        this.intervals.visitor = setInterval(function() {
            var change = Math.floor(Math.random() * 7) - 2; // -2 to +4 bias upward
            self.visitorCount += change;
            if (self.visitorCount < baseCount) self.visitorCount = baseCount;
            updateAll();
        }, CONFIG.visitor.updateInterval);
    },

    /**
     * Start meme sales counter
     */
    startMemeCounter() {
        var self = this;
        var memesSoldElement = document.getElementById('memesSold');
        
        this.intervals.memes = setInterval(function() {
            self.memesSold += Math.floor(Math.random() * (CONFIG.memes.incrementRange + 1));
            if (memesSoldElement) {
                memesSoldElement.textContent = self.memesSold.toLocaleString();
            }
        }, CONFIG.memes.updateInterval);
    },

    /**
     * Stop all counters
     */
    stop() {
        Object.values(this.intervals).forEach(function(interval) {
            if (interval) clearInterval(interval);
        });
    }
};
