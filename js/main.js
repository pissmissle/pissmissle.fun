/**
 * Main initialization file
 * Coordinates module loading and initializes the application.
 * Game functions are in games.js, bound via inline-handlers.js.
 * Interactive features and IRC remain in script.js.
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof Components !== 'undefined') {
        Components.init();
    }

    if (typeof Counters !== 'undefined') {
        Counters.init();
    }

    if (typeof Taskbar !== 'undefined') {
        Taskbar.init();
    }

    if (typeof Animations !== 'undefined') {
        Animations.init();
    }
});
