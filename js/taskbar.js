/**
 * Taskbar clock module
 * Handles Windows 97-style taskbar clock updates
 */

const Taskbar = {
    interval: null,

    /**
     * Initialize taskbar clock
     */
    init() {
        this.updateClock();
        this.interval = setInterval(() => this.updateClock(), 1000);
    },

    /**
     * Update taskbar clock display
     */
    updateClock() {
        const timeElement = document.getElementById('taskbar-time');
        if (timeElement) {
            timeElement.textContent = Utils.getTimestamp();
        }
    },

    /**
     * Stop taskbar clock
     */
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
};
