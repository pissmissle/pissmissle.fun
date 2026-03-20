/**
 * Configuration file for Pissmissle website
 * Centralizes all configuration values for easy maintenance
 */

const CONFIG = {
    // Visitor counter settings
    visitor: {
        initialCount: 1337,
        updateInterval: 3000, // milliseconds
        changeRange: 5 // random change between -5 and +5
    },

    // Meme sales counter settings
    memes: {
        initialSold: 1337,
        updateInterval: 2000, // milliseconds
        incrementRange: 3 // random increment 0-3
    },

    // Response time settings
    responseTime: {
        updateInterval: 2000, // milliseconds
        maxTime: 0.5 // maximum fake response time
    },

    // Glitch effects settings
    glitch: {
        checkInterval: 2000, // milliseconds
        triggerChance: 0.3 // 30% chance
    },

    // Crypto price ticker settings
    crypto: {
        updateInterval: 5000, // milliseconds
        triggerChance: 0.2 // 20% chance
    },

    // Floating text settings
    floatingText: {
        spawnInterval: 2000, // milliseconds
        spawnChance: 0.15, // 15% chance
        duration: 3000 // milliseconds
    },

    // Background glitch settings
    backgroundGlitch: {
        checkInterval: 10000, // milliseconds
        triggerChance: 0.1 // 10% chance
    },

    // KOL detection settings
    kolDetection: {
        checkInterval: 15000, // milliseconds
        triggerChance: 0.01 // 1% chance
    },

    // Popup settings
    popups: {
        maxActive: 25,
        spawnInterval: 500, // milliseconds
        fasterSpawnInterval: 100 // milliseconds when triggered
    },

    // Content randomization settings
    contentRandomization: {
        headerDelay: 1000, // milliseconds
        sectionsDelay: 2000, // milliseconds
        mixInterval: 8000, // milliseconds (with random 0-7000ms)
        swapInterval: 20000, // milliseconds (with random 0-10000ms)
        elementRandomization: 800 // milliseconds
    },

    // IRC chat settings
    irc: {
        autoResponseInterval: 5000, // milliseconds
        autoResponseChance: 0.3 // 30% chance
    },

    // Fake button settings
    fakeButtons: {
        spawnInterval: 2000, // milliseconds
        lifetime: 10000 // milliseconds
    },

    // Copypasta settings
    copypasta: {
        spawnInterval: 8000, // milliseconds
        lifetime: 8000 // milliseconds
    },

    // Kaomoji settings
    kaomoji: {
        addInterval: 4000 // milliseconds
    },

    // Canvas animation settings
    canvas: {
        drawInterval: 50 // milliseconds (20 FPS)
    },

    // Cursor trail settings
    cursorTrail: {
        triggerChance: 0.02 // 2% chance on mousemove
    },

    // Konami code pattern
    konamiCode: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
