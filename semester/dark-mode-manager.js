(function() {
    function updatePDFIcons(src) {
        const pdfIcons = document.querySelectorAll('.pdf-icon');
        pdfIcons.forEach(icon => {
            icon.src = src;
        });
    }

    function updateRingColors(isDarkMode) {
        const rings = document.querySelectorAll('.ring i');
        const ringContainer = document.querySelector('.ring');
        if (!ringContainer) return;

        rings.forEach(ring => {
            ring.style.borderColor = isDarkMode ? 'white' : 'black';
            ring.style.filter = 'drop-shadow(0 0 0 transparent)';
        });
    }

    function applyDarkMode(body, modeIcon) {
        body.classList.add("dark-mode");
        modeIcon.src = "../static/light.png";
        localStorage.setItem("dark-mode", "enabled");
        updatePDFIcons("../static/image.png");
        updateYearImages(true); // Update year images for dark mode
        updateRingColors(true);
    }

    function applyLightMode(body, modeIcon) {
        body.classList.remove("dark-mode");
        modeIcon.src = "..static/dark.png";
        localStorage.setItem("dark-mode", "disabled");
        updatePDFIcons("..static/pdf.png");
        updateYearImages(false); // Update year images for light mode
        updateRingColors(false);
    }

    function toggleDarkMode() {
        const body = document.body;
        const modeIcon = document.getElementById('mode-icon');
        if (!modeIcon) return;

        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            applyDarkMode(body, modeIcon);
        } else {
            applyLightMode(body, modeIcon);
        }
    }

    function updateYearImages(isDarkMode) {
        const yearImages = document.querySelectorAll('.year-link-image');
        yearImages.forEach(img => {
            const year = img.dataset.year;
            img.src = isDarkMode ? `../static/${year}-dark.png` : `../static/${year}.png`;
        });
    }

    // Apply stored dark mode preference on load
    document.addEventListener('DOMContentLoaded', () => {
        const body = document.body;
        const modeIcon = document.getElementById('mode-icon');
        if (modeIcon) {
            if (localStorage.getItem("dark-mode") === "enabled") {
                applyDarkMode(body, modeIcon);
            } else {
                applyLightMode(body, modeIcon);
            }
        }
        updateYearImages(localStorage.getItem("dark-mode") === "enabled"); //set the year images on load

        // Ring Glow Effect Logic
        const ringContainer = document.querySelector('.ring');
        if (ringContainer) {
            document.addEventListener('mousemove', (e) => {
                const rect = ringContainer.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
                const radius = rect.width / 2;
                const rings = ringContainer.querySelectorAll('i');
                rings.forEach(ring => {
                    if (distance <= radius) {
                        const clr = getComputedStyle(ring).getPropertyValue('--clr').trim();
                        ring.style.borderColor = clr;
                        ring.style.filter = `drop-shadow(0 0 25px ${clr})`;
                    } else {
                        ring.style.borderColor = document.body.classList.contains("dark-mode") ? 'white' : 'black';
                        ring.style.filter = 'drop-shadow(0 0 0 transparent)';
                    }
                });
            });
        }
    });

    // Make toggleDarkMode globally accessible
    window.toggleDarkMode = toggleDarkMode;
})();