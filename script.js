/* ============================================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   Author: Saniya Perween
   Version: 3.0 — Interactive Edition
   ============================================================ */

// ============================================================
// 1. DOM ELEMENT REFERENCES
// ============================================================
const loader = document.getElementById('loader');
const backToTopBtn = document.getElementById('backToTop');
const darkModeToggle = document.getElementById('darkModeToggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');
const contactForm = document.querySelector('.contact-form');
const sections = document.querySelectorAll('section[id]');
const revealElements = document.querySelectorAll('.reveal');
const statNumbers = document.querySelectorAll('.stat-number');
const toastContainer = document.getElementById('toastContainer');

// ============================================================
// 2. UTILITY / REUSABLE FUNCTIONS
// ============================================================

/**
 * Show a toast notification message
 * @param {string} message - Text to display
 * @param {string} type - 'success', 'error', or 'info'
 * @param {number} duration - How long to show (ms)
 */
function showToast(message, type, duration) {
    type = type || 'info';
    duration = duration || 3000;

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    // Trigger entrance animation
    requestAnimationFrame(function () {
        toast.classList.add('toast-visible');
    });

    // Auto-remove after duration
    setTimeout(function () {
        toast.classList.remove('toast-visible');
        toast.addEventListener('transitionend', function () {
            toast.remove();
        });
    }, duration);
}

/**
 * Validate an email address format
 * @param {string} email - Email string to validate
 * @returns {boolean}
 */
function isValidEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

/**
 * Show inline error message below a form field
 * @param {HTMLElement} input - The input element
 * @param {string} message - Error text
 */
function showFieldError(input, message) {
    clearFieldError(input);
    input.classList.add('input-error');
    var errorEl = document.createElement('span');
    errorEl.className = 'field-error';
    errorEl.textContent = message;
    input.parentElement.appendChild(errorEl);
}

/**
 * Clear inline error message from a form field
 * @param {HTMLElement} input - The input element
 */
function clearFieldError(input) {
    input.classList.remove('input-error');
    var existing = input.parentElement.querySelector('.field-error');
    if (existing) existing.remove();
}

/**
 * Save a value to localStorage
 * @param {string} key
 * @param {*} value
 */
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        // localStorage not available
    }
}

/**
 * Get a value from localStorage
 * @param {string} key
 * @returns {*}
 */
function getFromStorage(key) {
    try {
        var item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        return null;
    }
}

/**
 * Debounce function — limits how often a function can fire
 * @param {Function} func
 * @param {number} wait - Delay in ms
 * @returns {Function}
 */
function debounce(func, wait) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            func.apply(context, args);
        }, wait);
    };
}

// ============================================================
// 3. LOADER — Hide after page loads
// ============================================================
window.addEventListener('load', function () {
    loader.classList.add('loaded');
});

// ============================================================
// 4. SCROLL REVEAL (IntersectionObserver)
// ============================================================
var revealObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealElements.forEach(function (el) {
    revealObserver.observe(el);
});

// ============================================================
// 5. BACK-TO-TOP BUTTON
// ============================================================
window.addEventListener(
    'scroll',
    debounce(function () {
        backToTopBtn.classList.toggle('show', window.scrollY > 400);
    }, 50)
);

// ============================================================
// 6. DARK MODE TOGGLE (with localStorage)
// ============================================================
function applyDarkMode(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    if (darkModeToggle) {
        darkModeToggle.setAttribute('aria-pressed', isDark);
        darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    }
}

function toggleDarkMode() {
    var isDark = !document.body.classList.contains('dark-mode');
    applyDarkMode(isDark);
    saveToStorage('portfolioDarkMode', isDark);
    showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled', 'info', 2000);
}

// Restore saved preference on load
(function initDarkMode() {
    var saved = getFromStorage('portfolioDarkMode');
    if (saved === true) {
        applyDarkMode(true);
    }
})();

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

// ============================================================
// 7. MOBILE HAMBURGER MENU
// ============================================================
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('nav-open');
    // Toggle body scroll when menu is open
    document.body.classList.toggle('menu-open', navMenu.classList.contains('nav-open'));
}

if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when a link is clicked
navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        if (navMenu.classList.contains('nav-open')) {
            toggleMobileMenu();
        }
    });
});

// ============================================================
// 8. ACTIVE NAV LINK HIGHLIGHTING ON SCROLL
// ============================================================
var navObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var id = entry.target.getAttribute('id');
                navLinks.forEach(function (link) {
                    link.classList.remove('nav-active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('nav-active');
                    }
                });
            }
        });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
);

sections.forEach(function (sec) {
    navObserver.observe(sec);
});

// ============================================================
// 9. FORM VALIDATION WITH REAL-TIME FEEDBACK
// ============================================================
if (contactForm) {
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var subjectInput = document.getElementById('subject');
    var messageInput = document.getElementById('message');

    // Real-time validation on blur (when user leaves the field)
    nameInput.addEventListener('blur', function () {
        validateName(nameInput);
    });

    emailInput.addEventListener('blur', function () {
        validateEmail(emailInput);
    });

    subjectInput.addEventListener('change', function () {
        validateSubject(subjectInput);
    });

    messageInput.addEventListener('blur', function () {
        validateMessage(messageInput);
    });

    // Clear errors on input (as user types)
    nameInput.addEventListener('input', function () {
        clearFieldError(nameInput);
    });

    emailInput.addEventListener('input', function () {
        clearFieldError(emailInput);
    });

    messageInput.addEventListener('input', function () {
        clearFieldError(messageInput);
        updateCharCounter(messageInput);
    });

    // Form submit handler
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var isValid = true;

        if (!validateName(nameInput)) isValid = false;
        if (!validateEmail(emailInput)) isValid = false;
        if (!validateSubject(subjectInput)) isValid = false;
        if (!validateMessage(messageInput)) isValid = false;

        if (isValid) {
            // Simulate sending (no backend)
            var submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span>';

            setTimeout(function () {
                showToast('Message sent successfully! Thank you, ' + nameInput.value + '.', 'success', 4000);
                contactForm.reset();
                clearAllErrors();
                var counter = document.getElementById('charCounter');
                if (counter) counter.textContent = '0 / 1000';
                submitBtn.disabled = false;
                submitBtn.innerHTML =
                    '<span>Send Message</span>' +
                    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
            }, 1500);
        } else {
            showToast('Please fix the errors in the form.', 'error', 3000);
        }
    });
}

/** Validate name field */
function validateName(input) {
    var value = input.value.trim();
    if (value.length === 0) {
        showFieldError(input, 'Name is required.');
        return false;
    }
    if (value.length < 2) {
        showFieldError(input, 'Name must be at least 2 characters.');
        return false;
    }
    clearFieldError(input);
    input.classList.add('input-success');
    return true;
}

/** Validate email field */
function validateEmail(input) {
    var value = input.value.trim();
    if (value.length === 0) {
        showFieldError(input, 'Email is required.');
        return false;
    }
    if (!isValidEmail(value)) {
        showFieldError(input, 'Please enter a valid email address.');
        return false;
    }
    clearFieldError(input);
    input.classList.add('input-success');
    return true;
}

/** Validate subject field */
function validateSubject(input) {
    if (!input.value) {
        showFieldError(input, 'Please select a subject.');
        return false;
    }
    clearFieldError(input);
    input.classList.add('input-success');
    return true;
}

/** Validate message field */
function validateMessage(input) {
    var value = input.value.trim();
    if (value.length === 0) {
        showFieldError(input, 'Message is required.');
        return false;
    }
    if (value.length < 10) {
        showFieldError(input, 'Message must be at least 10 characters. (' + value.length + '/10)');
        return false;
    }
    clearFieldError(input);
    input.classList.add('input-success');
    return true;
}

/** Clear all form errors */
function clearAllErrors() {
    var inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(function (input) {
        clearFieldError(input);
        input.classList.remove('input-success');
    });
}

/** Update character counter for message textarea */
function updateCharCounter(textarea) {
    var counter = document.getElementById('charCounter');
    if (counter) {
        counter.textContent = textarea.value.length + ' / 1000';
    }
}

// ============================================================
// 10. TYPING EFFECT ON HERO TAGLINE
// ============================================================
(function initTypingEffect() {
    var tagline = document.querySelector('.hero .tagline');
    if (!tagline) return;

    var fullText = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';

    var charIndex = 0;
    var typingDelay = 1400; // Wait for entrance animations to finish

    setTimeout(function typeChar() {
        if (charIndex < fullText.length) {
            tagline.textContent += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 40);
        }
    }, typingDelay);
})();

// ============================================================
// 11. STAT NUMBER COUNT-UP ANIMATION
// ============================================================
var statsAnimated = false;

var statsObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

var statsRow = document.querySelector('.stats-row');
if (statsRow) {
    statsObserver.observe(statsRow);
}

function animateStats() {
    statNumbers.forEach(function (el) {
        var text = el.textContent.trim();
        var suffix = '';
        var targetNum = 0;

        // Parse "3+", "5+", "100%"
        if (text.indexOf('+') !== -1) {
            suffix = '+';
            targetNum = parseInt(text, 10);
        } else if (text.indexOf('%') !== -1) {
            suffix = '%';
            targetNum = parseInt(text, 10);
        } else {
            targetNum = parseInt(text, 10) || 0;
        }

        if (isNaN(targetNum)) return;

        var current = 0;
        var increment = Math.ceil(targetNum / 40);
        var duration = 1200;
        var stepTime = duration / (targetNum / increment);

        el.textContent = '0' + suffix;

        var timer = setInterval(function () {
            current += increment;
            if (current >= targetNum) {
                current = targetNum;
                clearInterval(timer);
            }
            el.textContent = current + suffix;
        }, stepTime);
    });
}

// ============================================================
// 12. KEYBOARD ACCESSIBILITY — Escape closes mobile menu
// ============================================================
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('nav-open')) {
            toggleMobileMenu();
        }
    }
});

// ============================================================
// 13. DYNAMIC YEAR IN FOOTER
// ============================================================
(function updateFooterYear() {
    var footerP = document.querySelector('footer p:nth-child(2)');
    if (footerP) {
        var year = new Date().getFullYear();
        footerP.innerHTML = '&copy; ' + year + ' All rights reserved.';
    }
})();

// ============================================================
// 14. CONSOLE WELCOME MESSAGE
// ============================================================
console.log(
    '%c👋 Welcome to Saniya Perween\'s Portfolio!',
    'color: #6c5ce7; font-size: 16px; font-weight: bold;'
);
console.log(
    '%cBuilt with HTML5, CSS3 & Vanilla JavaScript',
    'color: #00cec9; font-size: 12px;'
);
