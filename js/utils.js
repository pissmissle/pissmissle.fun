/**
 * Utility functions for Pissmissle website
 * Common helper functions used throughout the application
 */

const Utils = {
    /**
     * Debounce function to limit how often a function can be called
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function to limit function execution rate
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Get random element from array
     * @param {Array} array - Array to get random element from
     * @returns {*} Random element
     */
    randomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    /**
     * Get random number between min and max (inclusive)
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random number
     */
    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Check if random chance is met
     * @param {number} chance - Chance value between 0 and 1
     * @returns {boolean} True if chance is met
     */
    randomChance(chance) {
        return Math.random() < chance;
    },

    /**
     * Create and append element to DOM
     * @param {string} tag - HTML tag name
     * @param {Object} options - Element options (classes, styles, text, etc.)
     * @param {HTMLElement} parent - Parent element to append to
     * @returns {HTMLElement} Created element
     */
    createElement(tag, options = {}, parent = null) {
        const element = document.createElement(tag);
        
        if (options.classes) {
            element.className = Array.isArray(options.classes) 
                ? options.classes.join(' ') 
                : options.classes;
        }
        
        if (options.id) {
            element.id = options.id;
        }
        
        if (options.text) {
            element.textContent = options.text;
        }
        
        if (options.html) {
            element.innerHTML = options.html;
        }
        
        if (options.styles) {
            Object.assign(element.style, options.styles);
        }
        
        if (options.attributes) {
            Object.entries(options.attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }
        
        if (options.events) {
            Object.entries(options.events).forEach(([event, handler]) => {
                element.addEventListener(event, handler);
            });
        }
        
        if (parent) {
            parent.appendChild(element);
        }
        
        return element;
    },

    /**
     * Remove element from DOM after delay
     * @param {HTMLElement} element - Element to remove
     * @param {number} delay - Delay in milliseconds
     */
    removeAfterDelay(element, delay) {
        setTimeout(() => {
            if (element && element.parentNode) {
                element.remove();
            }
        }, delay);
    },

    /**
     * Fade out element
     * @param {HTMLElement} element - Element to fade out
     * @param {number} duration - Duration in milliseconds
     * @param {Function} callback - Callback after fade completes
     */
    fadeOut(element, duration = 500, callback = null) {
        element.style.transition = `opacity ${duration}ms`;
        element.style.opacity = '0';
        setTimeout(() => {
            if (callback) callback();
        }, duration);
    },

    /**
     * Scroll to element smoothly
     * @param {string|HTMLElement} target - Element ID or element itself
     * @param {Object} options - Scroll options
     */
    scrollToElement(target, options = {}) {
        const element = typeof target === 'string' 
            ? document.getElementById(target) 
            : target;
        
        if (element) {
            element.scrollIntoView({
                behavior: options.behavior || 'smooth',
                block: options.block || 'start'
            });
        }
    },

    /**
     * Format number with locale string
     * @param {number} number - Number to format
     * @returns {string} Formatted number
     */
    formatNumber(number) {
        return number.toLocaleString();
    },

    /**
     * Get current timestamp in HH:MM:SS format
     * @returns {string} Formatted timestamp
     */
    getTimestamp() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
