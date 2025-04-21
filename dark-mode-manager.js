console.clear();

gsap.registerPlugin(Draggable);

let bgCanvas, bgCanvasCtx, raf, slider, sliderHandle, sliderHandleProps;
let modes = ["light", "dark"];
let activeMode = modes[0];
let currentMode;

function updatePDFIcons(src) {
    const pdfIcons = document.querySelectorAll('.pdf-icon');
    pdfIcons.forEach(icon => {
        icon.src = src;
    });
}

function updateRingColors(isDarkMode) {
    const rings = document.querySelectorAll('.ring i');
    const ringContainer = document.querySelector('.ring');
    if (!ringContainer) return; // Check if .ring exists on the page

    rings.forEach(ring => {
        ring.style.borderColor = isDarkMode ? 'white' : 'black';
        ring.style.filter = 'drop-shadow(0 0 0 transparent)';
    });
}

function applyDarkMode() {
    const body = document.body;
    body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
    updatePDFIcons("/static/image.png");
    updateRingColors(true); // Pass true for dark mode
    // No need to update modeIcon here as the slider handles it visually
    const semLogos = document.querySelectorAll('.year-link-image');
    const telegramIcon = document.getElementById('telegram-icon');
    if (semLogos) {
        semLogos.forEach(logoImage => {
            let semNumber = logoImage.dataset.sem;
            logoImage.src = `static/${semNumber}-dark.png`;
        });
    }
    if (telegramIcon) {
        telegramIcon.src = 'static/telegram-dark.png';
    }
}

function applyLightMode() {
    const body = document.body;
    body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
    updatePDFIcons("static/pdf.png");
    updateRingColors(false); // Pass false for light mode
    // No need to update modeIcon here as the slider handles it visually
    const semLogos = document.querySelectorAll('.year-link-image');
    const telegramIcon = document.getElementById('telegram-icon');
    if (semLogos) {
        semLogos.forEach(logoImage => {
            let semNumber = logoImage.dataset.sem;
            logoImage.src = `static/${semNumber}.png`;
        });
    }
    if (telegramIcon) {
        telegramIcon.src = 'static/telegram.png';
    }
}

function initDragEvent() {
    slider = document.querySelector(".slider");
    sliderHandle = slider.querySelector(".handle");
    const sliderDrop = slider.querySelector(".drop");

    if (!slider || !sliderHandle || !sliderDrop) return;

    sliderHandleProps = {
        radius: sliderHandle.getBoundingClientRect().width / 2,
        radiusOffset: 0,
        position: {
            x: sliderHandle.getBoundingClientRect().left,
            y: sliderHandle.getBoundingClientRect().top
        }
    };

    gsap.set(sliderHandle, {
        x: 0
    });

    let tl = gsap.timeline({
        onComplete: () => {
            if (activeMode != currentMode) {
                toggleColor();
                currentMode = activeMode;
                if (activeMode === "dark") {
                    applyDarkMode();
                } else {
                    applyLightMode();
                }
            }
        }
    });

    Draggable.create(sliderHandle, {
        type: "x",
        bounds: slider,
        onRelease(e) {
            if (!this.hitTest(sliderDrop)) {
                activeMode = modes[0];
                tl.to(sliderHandle, {
                    x: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, .75)"
                });
            } else {
                activeMode = modes[1];
                tl.to(sliderHandle, {
                    x: sliderDrop.offsetLeft - 5,
                    duration: 0.6,
                    ease: "elastic.out(1, .8)"
                });
            }
        }
    });

    function toggleColor() {
        gsap.set(sliderHandle, { pointerEvents: "none" });
        let date = Date.now();
        gsap
            .timeline()
            .to(sliderHandleProps, {
                duration: 0.3, // Reduced duration
                radiusOffset: Math.max(window.innerWidth, window.innerHeight) * 0.7 // Adjusted radius offset
            })
            .to(
                "body",
                {
                    duration: 0.15,
                    "--handle-background": activeMode === "dark" ? "#fff" : "#000"
                },
                "-=0.15" // Slightly adjusted timing
            )
            .set("body", {
                // Rely on the CSS class for background color
            })
            .set(sliderHandleProps, { radiusOffset: 0 })
            .set(sliderHandle, { pointerEvents: "all" });
    }
}

function initCanvas() {
    bgCanvas = document.getElementById("bgCanvas");
    bgCanvasCtx = bgCanvas.getContext("2d");
    if (!bgCanvasCtx) return;
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    animate();
}

function animate() {
    if (!bgCanvasCtx || !sliderHandle) return;
    bgCanvasCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    sliderHandleProps.radius = sliderHandle.getBoundingClientRect().width / 2;
    sliderHandleProps.position = {
        x: sliderHandle.getBoundingClientRect().left,
        y: sliderHandle.getBoundingClientRect().top
    };

    drawCircle();

    raf = requestAnimationFrame(animate);
}

function drawCircle() {
    if (!bgCanvasCtx || !sliderHandleProps) return;
    let ctx = bgCanvasCtx;
    let position = sliderHandleProps.position;
    let radius = sliderHandleProps.radius;
    ctx.beginPath();
    ctx.arc(
        position.x + radius,
        position.y + radius,
        radius / 2 + sliderHandleProps.radiusOffset,
        0,
        2 * Math.PI,
        false
    );
    ctx.fillStyle = activeMode === "dark" ? "#000" : "#fff";
    ctx.fill();
    ctx.closePath();
}

function initializeRingGlowEffect() {
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
}

document.addEventListener('DOMContentLoaded', () => {
    initDragEvent();
    initCanvas();
    initializeRingGlowEffect(); // Call the function here

    // Apply stored dark mode preference on load
    if (localStorage.getItem("darkMode") === "enabled") {
        activeMode = modes[1]; // Set active mode to dark
        if (sliderHandle) {
            const sliderDrop = slider.querySelector(".drop");
            if (sliderDrop) {
                gsap.to(sliderHandle, { x: sliderDrop.offsetLeft - 5, duration: 0.3 });
            }
        }
        applyDarkMode();
        currentMode = activeMode;
        gsap.set("body", { "--handle-background": "#fff" }); // Set initial handle color
    } else {
        activeMode = modes[0]; // Set active mode to light
        applyLightMode();
        currentMode = activeMode;
        gsap.set("body", { "--handle-background": "#000" }); // Set initial handle color
    }
});

window.addEventListener("resize", () => {
    initCanvas();
});