/**
 * Global error handling and logging system
 */

const ErrorHandler = {
    /**
     * Initialize error handling
     */
    init() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.logError({
                type: 'JavaScript Error',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error?.stack,
                timestamp: new Date().toISOString()
            });
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            this.logError({
                type: 'Unhandled Promise Rejection',
                message: event.reason?.message || String(event.reason),
                stack: event.reason?.stack,
                timestamp: new Date().toISOString()
            });
        });

        const originalError = console.error;
        let isLogging = false;
        console.error = (...args) => {
            if (isLogging) {
                originalError.apply(console, args);
                return;
            }
            isLogging = true;
            try {
                this.logError({
                    type: 'Console Error',
                    message: args.map(arg => {
                        try {
                            return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
                        } catch (e) {
                            return '[unserializable]';
                        }
                    }).join(' '),
                    timestamp: new Date().toISOString()
                });
            } catch (e) {
                // Prevent infinite recursion
            }
            isLogging = false;
            originalError.apply(console, args);
        };

        console.log('Error handler initialized');
    },

    /**
     * Log error to console and optionally send to server
     * @param {Object} errorInfo - Error information object
     */
    logError(errorInfo) {
        // Log to console
        console.error('[ErrorHandler]', errorInfo);

        // Store in sessionStorage for debugging
        try {
            const errors = JSON.parse(sessionStorage.getItem('errors') || '[]');
            errors.push(errorInfo);
            // Keep only last 10 errors
            if (errors.length > 10) {
                errors.shift();
            }
            sessionStorage.setItem('errors', JSON.stringify(errors));
        } catch (e) {
            // Ignore storage errors
        }

        // In production, send to error tracking service
        // Example: sendToSentry(errorInfo);
    },

    /**
     * Get stored errors
     * @returns {Array} Array of error objects
     */
    getStoredErrors() {
        try {
            return JSON.parse(sessionStorage.getItem('errors') || '[]');
        } catch (e) {
            return [];
        }
    },

    /**
     * Clear stored errors
     */
    clearStoredErrors() {
        sessionStorage.removeItem('errors');
    },

    /**
     * Wrap async function with error handling
     * @param {Function} fn - Async function to wrap
     * @param {string} context - Context name for error logging
     * @returns {Function} Wrapped function
     */
    wrapAsync(fn, context = 'Unknown') {
        return async (...args) => {
            try {
                return await fn(...args);
            } catch (error) {
                this.logError({
                    type: 'Async Function Error',
                    context,
                    message: error.message,
                    stack: error.stack,
                    timestamp: new Date().toISOString()
                });
                throw error;
            }
        };
    }
};

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ErrorHandler.init());
} else {
    ErrorHandler.init();
}

// Make available globally
window.ErrorHandler = ErrorHandler;
