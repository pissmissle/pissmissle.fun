
// Use Security.sanitizeVariable from security.js as the single sanitization source
function sanitizeHTML(str) {
    if (typeof Security !== 'undefined' && Security.sanitizeVariable) {
        return Security.sanitizeVariable(str);
    }
    if (typeof str !== 'string') return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

/**
 * Component loader module
 * Loads and injects HTML components into pages
 * SECURITY: Includes path validation and variable sanitization
 */

const Components = {
    /**
     * Whitelist of allowed component names
     * Prevents directory traversal attacks
     */
    ALLOWED_COMPONENTS: [
        'header',
        'footer',
        'navigation',
        'page-header'
    ],

    /**
     * Load a component from the components directory
     * @param {string} componentName - Name of component file (without .html)
     * @param {HTMLElement} targetElement - Element to inject component into
     * @param {Object} variables - Variables to replace in component (e.g., {title: "My Title"})
     */
    async load(componentName, targetElement, variables = {}) {
        try {
            // SECURITY: Validate component name against whitelist
            if (!this.ALLOWED_COMPONENTS.includes(componentName)) {
                console.error(`Security: Invalid component name "${componentName}". Allowed: ${this.ALLOWED_COMPONENTS.join(', ')}`);
                return;
            }
            
            // SECURITY: Additional path traversal prevention
            if (componentName.includes('..') || 
                componentName.includes('/') || 
                componentName.includes('\\') ||
                componentName.includes('\0') ||
                componentName.length > 50) {
                console.error(`Security: Component name contains invalid characters or is too long: "${componentName}"`);
                return;
            }
            
            // Detect if we're in pages/ directory and adjust path accordingly
            const isInPages = window.location.pathname.includes('/pages/') || 
                             window.location.pathname.match(/\/pages\/[^\/]+\.html/);
            const componentPath = isInPages ? `../components/${componentName}.html` : `components/${componentName}.html`;
            
            // SECURITY: Final path validation - ensure path doesn't contain traversal
            if (componentPath.includes('..') && !componentPath.match(/^\.\.\/components\/[^\/]+\.html$/)) {
                console.error(`Security: Invalid component path: "${componentPath}"`);
                return;
            }
            
            const response = await fetch(componentPath);
            if (!response.ok) {
                console.warn(`Component ${componentName} not found at ${componentPath}`);
                return;
            }
            
            let html = await response.text();
            
            // SECURITY: Sanitize all variables before replacement to prevent XSS
            const sanitizedVariables = {};
            Object.entries(variables).forEach(([key, value]) => {
                sanitizedVariables[key] = sanitizeHTML(String(value));
            });
            
            // Replace variables in the format {{variableName}}
            Object.entries(sanitizedVariables).forEach(([key, value]) => {
                const regex = new RegExp(`{{${key}}}`, 'g');
                html = html.replace(regex, value);
            });
            
            // Replace data attributes for dynamic content
            if (variables.title) {
                html = html.replace(/data-text="PAGE_TITLE"/g, `data-text="${variables.title}"`);
                html = html.replace(/>PAGE_TITLE</g, `>${variables.title}<`);
            }
            
            if (variables.subtitle) {
                html = html.replace(/data-subtitle/g, `>${variables.subtitle}<`);
                html = html.replace(/>PAGE_SUBTITLE</g, `>${variables.subtitle}<`);
            }
            
            if (variables.marqueeText) {
                html = html.replace(/data-marquee-text/g, `>${variables.marqueeText}<`);
            }
            
            if (componentName === 'navigation') {
                if (isInPages) {
                    // From pages/, links are already correct (relative to pages/)
                    // Just ensure index links are correct
                    html = html.replace(/href="\.\.\/index\.html/g, 'href="../index.html');
                } else {
                    // From root, fix page links to use pages/ prefix
                    html = html.replace(/href="([^"]+\.html)" class="nav-link[^"]*nav-page-link"/g, (match, page) => {
                        return match.replace(`href="${page}"`, `href="pages/${page}"`);
                    });
                    // Fix index links to remove ../
                    html = html.replace(/href="\.\.\/index\.html/g, 'href="index.html');
                }
            }
            
            // Fix page-header links
            if (componentName === 'page-header') {
                if (isInPages) {
                    html = html.replace(/href="index\.html"/g, 'href="../index.html"');
                } else {
                    html = html.replace(/href="\.\.\/index\.html"/g, 'href="index.html"');
                }
            }
            
            const sanitizedHtml = html.replace(/<script[\s\S]*?<\/script>/gi, '');
            targetElement.innerHTML = sanitizedHtml;
            
            // After injecting, fix navigation links with JavaScript for more reliable path detection
            if (componentName === 'navigation') {
                setTimeout(() => {
                    const isInPagesNow = window.location.pathname.includes('/pages/') || 
                                        window.location.pathname.match(/\/pages\/[^\/]+\.html/);
                    const navLinks = targetElement.querySelectorAll('.nav-page-link, .nav-index-link');
                    navLinks.forEach(link => {
                        if (link.classList.contains('nav-page-link')) {
                            const page = link.getAttribute('data-page') || link.getAttribute('href');
                            if (isInPagesNow) {
                                link.setAttribute('href', page);
                            } else {
                                link.setAttribute('href', 'pages/' + page);
                            }
                        } else if (link.classList.contains('nav-index-link')) {
                            const href = link.getAttribute('href');
                            if (isInPagesNow) {
                                link.setAttribute('href', href.replace('index.html', '../index.html'));
                            } else {
                                link.setAttribute('href', href.replace('../', ''));
                            }
                        }
                    });
                }, 0);
            }
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
        }
    },

    /**
     * Load header component
     * @param {HTMLElement} targetElement - Element to inject header into
     */
    async loadHeader(targetElement) {
        await this.load('header', targetElement);
    },

    /**
     * Load navigation component
     * @param {HTMLElement} targetElement - Element to inject navigation into
     */
    async loadNavigation(targetElement) {
        await this.load('navigation', targetElement);
    },

    /**
     * Load footer component
     * @param {HTMLElement} targetElement - Element to inject footer into
     */
    async loadFooter(targetElement) {
        await this.load('footer', targetElement);
    },

    /**
     * Load page header component (for sub-pages)
     * @param {HTMLElement} targetElement - Element to inject page header into
     * @param {Object} options - Options with title, subtitle, marqueeText
     */
    async loadPageHeader(targetElement, options = {}) {
        await this.load('page-header', targetElement, {
            title: options.title || 'PISSMISSLE',
            subtitle: options.subtitle || 'THE GOBLIN PRINCE',
            marqueeText: options.marqueeText || '⚠️ I\'M TRAPPED IN THIS FUCKING SYSTEM ⚠️ FUCK KOLS ⚠️ 操你妈 ⚠️'
        });
    },

    /**
     * Initialize components on page load
     * Looks for data-component attributes and loads them
     */
    async init() {
        const componentElements = document.querySelectorAll('[data-component]');
        
        for (const element of componentElements) {
            const componentName = element.getAttribute('data-component');
            const variables = {};
            
            // Extract data attributes as variables
            Array.from(element.attributes).forEach(attr => {
                if (attr.name.startsWith('data-var-')) {
                    const varName = attr.name.replace('data-var-', '');
                    variables[varName] = attr.value;
                }
            });
            
            await this.load(componentName, element, variables);
        }
    }
};
