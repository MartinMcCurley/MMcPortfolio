/**
 * Production-Ready Logging Utility
 * Provides conditional logging based on environment and proper error handling
 */

// Immediate fallback for scripts that load before logger is ready
window.safeLog = window.safeLog || {
    error: console.error.bind(console),
    warn: console.warn.bind(console),
    info: console.log.bind(console),
    debug: console.log.bind(console),
    perf: console.log.bind(console),
    group: (title, callback) => { console.group(title); callback(); console.groupEnd(); },
    safe: (operation, fallback) => { try { return operation(); } catch(e) { console.error(e); return fallback; } },
    safeAsync: async (operation, fallback) => { try { return await operation(); } catch(e) { console.error(e); return fallback; } }
};

class Logger {
    constructor() {
        // Determine environment - in production, limit logging
        this.isDevelopment = this.detectEnvironment();
        this.logLevel = this.isDevelopment ? 'debug' : 'error';
        this.errorCount = 0;
        this.maxErrors = 10; // Prevent log spam
        
        // Initialize error tracking
        this.initErrorTracking();
        
        if (this.isDevelopment) {
            console.log('🔧 Logger initialized in development mode');
        }
    }

    /**
     * Detect if we're in development or production
     */
    detectEnvironment() {
        // Check various indicators for development environment
        const isDev = 
            location.hostname === 'localhost' ||
            location.hostname === '127.0.0.1' ||
            location.hostname.includes('github.io') ||
            location.protocol === 'file:' ||
            window.location.search.includes('debug=true') ||
            localStorage.getItem('debug') === 'true';
            
        return isDev;
    }

    /**
     * Initialize global error tracking
     */
    initErrorTracking() {
        // Catch unhandled errors
        window.addEventListener('error', (event) => {
            this.error('Unhandled error:', event.error || event.message, {
                filename: event.filename,
                line: event.lineno,
                column: event.colno
            });
        });

        // Catch unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.error('Unhandled promise rejection:', event.reason);
            event.preventDefault(); // Prevent console spam
        });
    }

    /**
     * Log levels: error (0), warn (1), info (2), debug (3)
     */
    shouldLog(level) {
        const levels = { error: 0, warn: 1, info: 2, debug: 3 };
        return levels[level] <= levels[this.logLevel];
    }

    /**
     * Format log message with timestamp and context
     */
    formatMessage(level, message, ...args) {
        if (!this.isDevelopment && level !== 'error') {
            return; // Don't format non-errors in production
        }

        const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
        const prefix = {
            error: '❌',
            warn: '⚠️',
            info: 'ℹ️',
            debug: '🔧'
        }[level];

        return [`[${timestamp}] ${prefix}`, message, ...args];
    }

    /**
     * Error logging - always shown, with tracking
     */
    error(message, ...args) {
        this.errorCount++;
        
        // Prevent error spam
        if (this.errorCount > this.maxErrors) {
            if (this.errorCount === this.maxErrors + 1) {
                console.error('❌ Error logging limit reached. Suppressing further errors.');
            }
            return;
        }

        const formatted = this.formatMessage('error', message, ...args);
        if (formatted) {
            console.error(...formatted);
        }

        // Send to analytics in production (if available)
        if (!this.isDevelopment && typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: message,
                fatal: false
            });
        }
    }

    /**
     * Warning logging - shown in development, limited in production
     */
    warn(message, ...args) {
        if (!this.shouldLog('warn')) return;
        
        const formatted = this.formatMessage('warn', message, ...args);
        if (formatted) {
            console.warn(...formatted);
        }
    }

    /**
     * Info logging - development only
     */
    info(message, ...args) {
        if (!this.shouldLog('info')) return;
        
        const formatted = this.formatMessage('info', message, ...args);
        if (formatted) {
            console.log(...formatted);
        }
    }

    /**
     * Debug logging - development only
     */
    debug(message, ...args) {
        if (!this.shouldLog('debug')) return;
        
        const formatted = this.formatMessage('debug', message, ...args);
        if (formatted) {
            console.log(...formatted);
        }
    }

    /**
     * Performance logging - with conditional detail
     */
    perf(metric, value, unit = 'ms') {
        if (this.isDevelopment) {
            console.log(`⚡ ${metric}: ${value}${unit}`);
        }
        
        // Send to analytics regardless of environment
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                name: metric,
                value: Math.round(value)
            });
        }
    }

    /**
     * Group logging for complex operations
     */
    group(title, callback) {
        if (this.isDevelopment) {
            console.group(title);
            callback();
            console.groupEnd();
        } else {
            callback();
        }
    }

    /**
     * Safe error boundary wrapper
     */
    safeExecute(operation, fallback = null, context = 'Unknown operation') {
        try {
            return operation();
        } catch (error) {
            this.error(`Error in ${context}:`, error);
            return fallback;
        }
    }

    /**
     * Async safe execution wrapper
     */
    async safeExecuteAsync(operation, fallback = null, context = 'Unknown async operation') {
        try {
            return await operation();
        } catch (error) {
            this.error(`Async error in ${context}:`, error);
            return fallback;
        }
    }

    /**
     * Enable debug mode temporarily
     */
    enableDebug() {
        this.logLevel = 'debug';
        localStorage.setItem('debug', 'true');
        console.log('🔧 Debug mode enabled');
    }

    /**
     * Disable debug mode
     */
    disableDebug() {
        this.logLevel = this.isDevelopment ? 'info' : 'error';
        localStorage.removeItem('debug');
        console.log('✅ Debug mode disabled');
    }

    /**
     * Get error statistics
     */
    getStats() {
        return {
            environment: this.isDevelopment ? 'development' : 'production',
            logLevel: this.logLevel,
            errorCount: this.errorCount,
            maxErrors: this.maxErrors
        };
    }
}

// Create global logger instance
window.logger = new Logger();

// Provide backward compatibility with console methods
window.safeLog = {
    error: (...args) => window.logger.error(...args),
    warn: (...args) => window.logger.warn(...args),
    info: (...args) => window.logger.info(...args),
    debug: (...args) => window.logger.debug(...args),
    perf: (...args) => window.logger.perf(...args),
    group: (...args) => window.logger.group(...args),
    safe: (...args) => window.logger.safeExecute(...args),
    safeAsync: (...args) => window.logger.safeExecuteAsync(...args)
};

// Development helper functions
if (window.logger.isDevelopment) {
    window.enableDebug = () => window.logger.enableDebug();
    window.disableDebug = () => window.logger.disableDebug();
    window.getLogStats = () => window.logger.getStats();
} 