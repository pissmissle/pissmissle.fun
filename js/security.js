/**
 * Security utilities for Pissmissle website
 * Rate limiting, input validation, and sanitization helpers
 *
 * NOTE: CSP nonces require server-side generation to be effective.
 * This static site relies on header-based CSP (vercel.json / .htaccess)
 * with 'unsafe-inline' as an accepted trade-off for a static site.
 */

const Security = {
    /**
     * Rate limiting implementation
     * Tracks function calls per identifier with time windows
     */
    rateLimiter: {
        // Storage for rate limit data (in-memory, resets on page reload)
        // In production, this would be server-side
        storage: new Map(),
        
        /**
         * Check if an action is allowed based on rate limits
         * @param {string} identifier - Unique identifier (function name + user identifier)
         * @param {number} maxCalls - Maximum calls allowed
         * @param {number} windowMs - Time window in milliseconds
         * @returns {boolean} True if allowed, false if rate limited
         */
        check(identifier, maxCalls = 10, windowMs = 60000) {
            const now = Date.now();
            const key = identifier;
            
            if (!this.storage.has(key)) {
                this.storage.set(key, { calls: [], windowStart: now });
            }
            
            const record = this.storage.get(key);
            
            // Remove calls outside the current window
            record.calls = record.calls.filter(timestamp => 
                now - timestamp < windowMs
            );
            
            // Check if limit exceeded
            if (record.calls.length >= maxCalls) {
                return false;
            }
            
            // Record this call
            record.calls.push(now);
            return true;
        },
        
        /**
         * Get user identifier (simplified - uses sessionStorage)
         * In production, this would use IP address or user ID
         */
        getUserIdentifier() {
            let userId = sessionStorage.getItem('user-id');
            if (!userId) {
                userId = this.generateUserId();
                sessionStorage.setItem('user-id', userId);
            }
            return userId;
        },
        
        /**
         * Generate a unique user ID
         */
        generateUserId() {
            return 'user-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
        },
        
        /**
         * Rate limit wrapper for functions
         * @param {Function} fn - Function to wrap
         * @param {string} functionName - Name of function for rate limiting
         * @param {number} maxCalls - Maximum calls per window
         * @param {number} windowMs - Time window in milliseconds
         * @returns {Function} Wrapped function that checks rate limits
         */
        wrap(fn, functionName, maxCalls = 10, windowMs = 60000) {
            return (...args) => {
                const userId = this.getUserIdentifier();
                const identifier = `${functionName}:${userId}`;
                
                if (!this.check(identifier, maxCalls, windowMs)) {
                    console.warn(`Rate limit exceeded for ${functionName}`);
                    alert(`Rate limit exceeded. Please wait before trying again.`);
                    return;
                }
                
                return fn.apply(this, args);
            };
        }
    },

    /**
     * Validate component name against whitelist
     * Prevents directory traversal attacks
     */
    validateComponentName(componentName) {
        // Whitelist of allowed component names
        const allowedComponents = [
            'header',
            'footer',
            'navigation',
            'page-header'
        ];
        
        // Check if component name is in whitelist
        if (!allowedComponents.includes(componentName)) {
            console.error(`Invalid component name: ${componentName}`);
            return false;
        }
        
        // Additional validation: no path traversal characters
        if (componentName.includes('..') || 
            componentName.includes('/') || 
            componentName.includes('\\') ||
            componentName.includes('\0')) {
            console.error(`Component name contains invalid characters: ${componentName}`);
            return false;
        }
        
        return true;
    },

    /**
     * Sanitize component variables to prevent XSS
     * Enhanced version of sanitizeHTML
     */
    sanitizeVariable(value) {
        if (typeof value !== 'string') {
            return String(value);
        }
        
        // Use textContent to escape HTML
        const temp = document.createElement('div');
        temp.textContent = value;
        return temp.innerHTML;
    },

    init() {
        console.log('Security utilities initialized');
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Security.init());
} else {
    Security.init();
}
