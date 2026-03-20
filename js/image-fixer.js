/**
 * Image Fixer - Replaces broken images with OFFENSIVE CDN alternatives
 * PROVOCATIVE EDITION - For the chaotic goblin energy
 */

// Working GIF URLs from reliable CDNs - OFFENSIVE & PROVOCATIVE EDITION
const REPLACEMENT_GIFS = {
    // Anime GIFs - ahegao, lewd, provocative
    'anime-dance': 'https://media.giphy.com/media/l378giAZgxPw3eO52/giphy.gif', // anime girl flashing
    'anime-girl-dance': 'https://media.giphy.com/media/3o7TKT0pnXdBW2KL72/giphy.gif', // sexy anime dance
    'anime-character-dance': 'https://media.giphy.com/media/12npFVlmZoXN4Y/giphy.gif', // twerking anime
    'anime-cute': 'https://media.giphy.com/media/lkdH8FmImcGoylv3t3/giphy.gif', // provocative pose
    'anime-kawaii': 'https://media.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy.gif', // lewd wink
    'anime-wink': 'https://media.giphy.com/media/MZwUbgfEPNkVa/giphy.gif', // seductive wink
    'anime-happy': 'https://media.giphy.com/media/IwAZ6dvvvaTtdI8SD5/giphy.gif', // ecstasy face
    
    // Fire/chaos/destruction
    'flame': 'https://media.giphy.com/media/13d2jHlSlxklVe/giphy.gif', // nuclear explosion
    'fire': 'https://media.giphy.com/media/5nsiFjdgylfK3csZ5T/giphy.gif', // massive fire
    
    // Violent/aggressive spinning
    'spinning': 'https://media.giphy.com/media/ToMjGpNG0h0VJtn3s8E/giphy.gif', // spinning gun
    'rotating': 'https://media.giphy.com/media/3oEjI1erPMTMBFmNHi/giphy.gif', // trippy spiral
    
    // Disturbing glitch effects
    'glitch': 'https://media.giphy.com/media/3o7TKSx0g4rbhvep8Y/giphy.gif', // creepy glitch face
    'matrix': 'https://media.giphy.com/media/zOvBKUUEERdNm/giphy.gif', // hacker/terminal chaos
    
    // Chaotic/offensive retro
    'retro1': 'https://media.giphy.com/media/3oriNYQX2lC6dfW2Ji/giphy.gif', // middle finger
    'retro2': 'https://media.giphy.com/media/pDsCoECKh1Pa/giphy.gif', // explosion chaos
    'retro3': 'https://media.giphy.com/media/93lCI4D0murlu/giphy.gif', // wtf shocked
    'retro4': 'https://media.giphy.com/media/3oz8xLlw6GHVfokaNW/giphy.gif', // rage quit
    'retro5': 'https://media.giphy.com/media/12msOFU8oL1eww/giphy.gif', // mind blown
    'retro6': 'https://media.giphy.com/media/QxwDfOV4sAfounkNsG/giphy.gif', // chaotic rainbow vomit
    'retro7': 'https://media.giphy.com/media/fwoOoDZpEpdQewQdRR/giphy.gif', // demonic energy
};

// Additional offensive/provocative GIF pool - NSFW ENERGY
const GIF_POOL = [
    // Provocative/lewd
    'https://media.giphy.com/media/l378giAZgxPw3eO52/giphy.gif',
    'https://media.giphy.com/media/3o7TKT0pnXdBW2KL72/giphy.gif',
    'https://media.giphy.com/media/12npFVlmZoXN4Y/giphy.gif',
    'https://media.giphy.com/media/lkdH8FmImcGoylv3t3/giphy.gif',
    'https://media.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy.gif',
    
    // Violent/chaotic/explosive
    'https://media.giphy.com/media/13d2jHlSlxklVe/giphy.gif',
    'https://media.giphy.com/media/5nsiFjdgylfK3csZ5T/giphy.gif',
    'https://media.giphy.com/media/pDsCoECKh1Pa/giphy.gif',
    'https://media.giphy.com/media/ToMjGpNG0h0VJtn3s8E/giphy.gif',
    
    // Offensive gestures/attitudes
    'https://media.giphy.com/media/3oriNYQX2lC6dfW2Ji/giphy.gif',
    'https://media.giphy.com/media/3oz8xLlw6GHVfokaNW/giphy.gif',
    'https://media.giphy.com/media/93lCI4D0murlu/giphy.gif',
    
    // Disturbing/dark
    'https://media.giphy.com/media/3o7TKSx0g4rbhvep8Y/giphy.gif',
    'https://media.giphy.com/media/zOvBKUUEERdNm/giphy.gif',
    'https://media.giphy.com/media/fwoOoDZpEpdQewQdRR/giphy.gif',
    
    // Chaotic energy
    'https://media.giphy.com/media/12msOFU8oL1eww/giphy.gif',
    'https://media.giphy.com/media/QxwDfOV4sAfounkNsG/giphy.gif',
    'https://media.giphy.com/media/3oEjI1erPMTMBFmNHi/giphy.gif',
    'https://media.giphy.com/media/MZwUbgfEPNkVa/giphy.gif',
];

/**
 * Get a working GIF URL from the pool
 */
function getWorkingGif(keyword = '') {
    // Try to match keyword first
    const lowerKeyword = keyword.toLowerCase();
    
    if (lowerKeyword.includes('anime')) {
        const animeGifs = Object.keys(REPLACEMENT_GIFS)
            .filter(k => k.startsWith('anime'))
            .map(k => REPLACEMENT_GIFS[k]);
        return animeGifs[Math.floor(Math.random() * animeGifs.length)];
    }
    
    if (lowerKeyword.includes('flame') || lowerKeyword.includes('fire')) {
        return Math.random() > 0.5 ? REPLACEMENT_GIFS.flame : REPLACEMENT_GIFS.fire;
    }
    
    if (lowerKeyword.includes('spin') || lowerKeyword.includes('rotate')) {
        return Math.random() > 0.5 ? REPLACEMENT_GIFS.spinning : REPLACEMENT_GIFS.rotating;
    }
    
    // Return random from pool
    return GIF_POOL[Math.floor(Math.random() * GIF_POOL.length)];
}

/**
 * Fix broken image by replacing with PROVOCATIVE CDN URL
 */
function fixBrokenImage(img) {
    const originalSrc = img.src;
    const alt = img.alt || '';
    
    // Don't fix data URIs or already working images
    if (originalSrc.startsWith('data:') || originalSrc.includes('giphy.com')) {
        return;
    }
    
    // Check if image is from known broken sources
    const isBroken = originalSrc.includes('tenor.com') || 
                     originalSrc.includes('gifer.com') || 
                     originalSrc.includes('geocities.com');
    
    if (isBroken) {
        const newSrc = getWorkingGif(alt);
        console.log(`[ImageFixer] REPLACING BROKEN SHIT: ${originalSrc} -> ${newSrc}`);
        img.src = newSrc;
    }
}

/**
 * Initialize image fixer - OFFENSIVE MODE ACTIVATED
 */
function initImageFixer() {
    console.log('[ImageFixer] 🔥 SCANNING FOR BROKEN SHIT... FUCK TENOR.COM 🔥');
    
    // Fix all images on page load
    const images = document.querySelectorAll('img');
    let fixedCount = 0;
    
    images.forEach(img => {
        const src = img.src || img.getAttribute('src') || '';
        
        // Fix known broken sources immediately
        if (src.includes('tenor.com') || src.includes('gifer.com') || src.includes('geocities.com')) {
            fixBrokenImage(img);
            fixedCount++;
        }
        
        // Also setup error handler for any other failures
        img.addEventListener('error', function() {
            console.log(`[ImageFixer] 💀 IMAGE FAILED LIKE A KOL: ${this.src}`);
            fixBrokenImage(this);
        }, { once: true });
    });
    
    console.log(`[ImageFixer] ✅ DESTROYED ${fixedCount} BROKEN IMAGES, MONITORING ${images.length - fixedCount} MORE FOR FAILURE`);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageFixer);
} else {
    initImageFixer();
}

// Also fix images added dynamically
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
                if (node.tagName === 'IMG') {
                    const src = node.src || '';
                    if (src.includes('tenor.com') || src.includes('gifer.com') || src.includes('geocities.com')) {
                        fixBrokenImage(node);
                    }
                }
                // Check child images
                const imgs = node.querySelectorAll && node.querySelectorAll('img');
                if (imgs) {
                    imgs.forEach(img => {
                        const src = img.src || '';
                        if (src.includes('tenor.com') || src.includes('gifer.com') || src.includes('geocities.com')) {
                            fixBrokenImage(img);
                        }
                    });
                }
            }
        });
    });
});

observer.observe(document.body || document.documentElement, {
    childList: true,
    subtree: true
});

// Export for manual use if needed
if (typeof window !== 'undefined') {
    window.fixAllImages = initImageFixer;
    window.getWorkingGif = getWorkingGif;
}
