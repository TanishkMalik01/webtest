const rings = document.querySelectorAll('.ring i');
const ringContainer = document.querySelector('.ring');
const body = document.body;
const yearLogos = document.querySelectorAll('.year-link-image');
const telegramIcon = document.getElementById('telegram-icon');
const modeIcon = document.getElementById('mode-icon'); // Get modeIcon here for easier access


function toggleDarkMode() {
    body.classList.toggle("dark-mode");
    const isDarkModeEnabled = body.classList.contains("dark-mode"); // Check if dark mode is now enabled

    // Store dark mode preference in Local Storage
    if (isDarkModeEnabled) {
        localStorage.setItem('darkMode', 'enabled'); // Save 'enabled' if dark mode is ON
        modeIcon.src = "static/light.png"; // Update icon to light mode icon
    } else {
        localStorage.setItem('darkMode', 'disabled'); // Save 'disabled' if dark mode is OFF
        modeIcon.src = "static/dark.png"; // Update icon to dark mode icon
    }

    updateRingColors(isDarkModeEnabled);
    updateYearLogos(isDarkModeEnabled);
    updateTelegramIcon(isDarkModeEnabled);
}

function updateRingColors(isDarkMode) {
    rings.forEach(ring => {
        ring.style.borderColor = isDarkMode ? '#fff' : '#333';
        ring.style.filter = 'drop-shadow(0 0 0 transparent)';
    });
}

function updateYearLogos(isDarkMode) {
    yearLogos.forEach(logoImage => {
        let yearNumber = logoImage.dataset.year;
        if (isDarkMode) {
            logoImage.src = `static/${yearNumber}-dark.png`;
        } else {
            logoImage.src = `static/${yearNumber}.png`;
        }
    });
}

function updateTelegramIcon(isDarkMode) {
    if (isDarkMode) {
        telegramIcon.src = 'static/telegram-dark.png';
    } else {
        telegramIcon.src = 'static/telegram.png';
    }
}

// --------  PERSISTENT DARK MODE LOGIC (NEW!) --------
function applyStoredDarkModePreference() {
    const storedDarkMode = localStorage.getItem('darkMode'); // Check Local Storage

    if (storedDarkMode === 'enabled') { // If dark mode was previously enabled
        body.classList.add("dark-mode"); // Apply dark mode class
        modeIcon.src = "static/light.png"; // Set icon to light mode
        updateRingColors(true); // Update rings for dark mode
        updateYearLogos(true); // Update year logos for dark mode
        updateTelegramIcon(true); // Update Telegram icon for dark mode
    } else {
        // If 'darkMode' is not 'enabled' in Local Storage (or not set at all),
        // default to light mode (which is already the initial state in CSS)
        modeIcon.src = "static/dark.png"; // Ensure icon is set to dark mode icon for light mode default
        updateRingColors(false); // Ensure rings are set for light mode
        updateYearLogos(false); // Ensure year logos are set for light mode
        updateTelegramIcon(false); // Ensure Telegram icon is set for light mode
    }
}

applyStoredDarkModePreference(); // Call this function when the page loads to check and apply preference
// -------- END PERSISTENT DARK MODE LOGIC --------


document.addEventListener('mousemove', (e) => {
    const rect = ringContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width/2;
    const centerY = rect.top + rect.height/2;
    const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
    const radius = rect.width/2;

    rings.forEach(ring => {
        if (distance <= radius) {
            const clr = getComputedStyle(ring).getPropertyValue('--clr').trim();
            ring.style.borderColor = clr;
            ring.style.filter = `drop-shadow(0 0 25px ${clr})`;
        } else {
            updateRingColors(body.classList.contains('dark-mode'));
        }
    });
});