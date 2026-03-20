/**
 * Inline Event Handlers - Extracted for Security
 * Binds all interactive elements via event listeners instead of inline handlers.
 * Game function implementations live in games.js (single source of truth).
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeEventHandlers();
    handleImageFallbacks();
    initClipboardCopy();
    initGameButtons();
});

function initializeEventHandlers() {
    var nothingLinks = document.querySelectorAll('[data-action="nothing-alert"]');
    nothingLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var message = this.getAttribute('data-message') || 'YOU CLICKED FOR NOTHING! 你点击了什么都没有！ YOU ARE GAY! 你是同性恋！ ( ͡° ͜ʖ ͡°)';
            alert(message);
        });
    });

    var voidLinks = document.querySelectorAll('a[href="javascript:void(0)"]');
    voidLinks.forEach(function(link) {
        link.href = '#';
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    var idBindings = {
        'free-money-btn': 'generateFreeMoney',
        'clicker-btn': 'clickButton',
        'random-num-btn': 'generateRandomNumber',
        'password-btn': 'generatePassword',
        'kol-btn': 'detectKOL',
        'translate-btn': 'translateToGoblin',
        'calc-btn': 'uselessCalculate',
        'meme-btn': 'generateMeme',
        'nothing-btn': 'doNothing',
        'coin-btn': 'flipCoin'
    };

    Object.keys(idBindings).forEach(function(id) {
        var el = document.getElementById(id);
        var fnName = idBindings[id];
        if (el && typeof window[fnName] === 'function') {
            el.addEventListener('click', window[fnName]);
        }
    });

    var inlineHandlers = document.querySelectorAll('[data-action="inline-handler"]');
    inlineHandlers.forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            var message = this.getAttribute('data-message');
            if (message) {
                alert(message);
            } else {
                alert('YOU CLICKED A SECRET LINK! 你点击了一个秘密链接! BUT THERE\'S NO SECRET! 但没有秘密! YOU ARE GAY! 你是同性恋! ( ͡° ͜ʖ ͡°)');
            }
        });
    });

    var formSubmits = document.querySelectorAll('[data-action="form-submit"]');
    formSubmits.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submission disabled for security. This is a static site.');
        });
    });
}

/**
 * Bind data-game="functionName" buttons to their game functions.
 * Handles duplicate game buttons (the large versions further down the page).
 */
function initGameButtons() {
    var gameButtons = document.querySelectorAll('[data-game]');
    gameButtons.forEach(function(btn) {
        var fnName = btn.getAttribute('data-game');
        if (typeof window[fnName] === 'function') {
            btn.addEventListener('click', window[fnName]);
        }
    });
}

/**
 * Handle image fallbacks via data attributes instead of inline onerror.
 * Supports:
 *   data-fallback-src  - try this URL first
 *   data-fallback-html - replace with emoji/text span on final failure
 *   data-fallback-style - style for the replacement span
 *   data-onerror="hide" - just hide the image on error
 */
function handleImageFallbacks() {
    var fallbackImages = document.querySelectorAll('img[data-fallback-html], img[data-fallback-src]');
    fallbackImages.forEach(function(img) {
        img.addEventListener('error', function handleError() {
            var fallbackSrc = this.getAttribute('data-fallback-src');
            if (fallbackSrc) {
                this.removeAttribute('data-fallback-src');
                this.src = fallbackSrc;
                return;
            }

            var fallbackHtml = this.getAttribute('data-fallback-html');
            if (fallbackHtml) {
                var span = document.createElement('span');
                span.textContent = fallbackHtml;
                var fallbackStyle = this.getAttribute('data-fallback-style');
                if (fallbackStyle) {
                    span.setAttribute('style', fallbackStyle);
                }
                this.parentNode.replaceChild(span, this);
            }
        });
    });

    var hideImages = document.querySelectorAll('img[data-onerror="hide"]');
    hideImages.forEach(function(img) {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
}

/**
 * Clipboard copy for the contract address box.
 */
function initClipboardCopy() {
    var copyBtn = document.getElementById('ca-copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            var caText = this.querySelector('.ca-text');
            if (!caText) return;
            var text = caText.textContent.trim();
            navigator.clipboard.writeText(text).catch(function() {});
            var feedback = copyBtn.querySelector('.copy-feedback');
            if (feedback) {
                feedback.style.opacity = '1';
                setTimeout(function() { feedback.style.opacity = '0'; }, 1500);
            }
        });
    }
}
