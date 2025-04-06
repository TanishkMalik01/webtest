// darkLightConfig.js

// Apply the stored dark mode preference on page load
function applyStoredDarkMode() {
    const storedMode = localStorage.getItem("dark-mode");
    const modeIcon = document.getElementById("mode-icon");
    if (storedMode === "enabled") {
      document.body.classList.add("dark-mode");
      if (modeIcon) modeIcon.src = "/static/light.png";
    } else {
      document.body.classList.remove("dark-mode");
      if (modeIcon) modeIcon.src = "/static/dark.png";
    }
  }
  
  // Toggle dark mode and save the preference
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const modeIcon = document.getElementById("mode-icon");
    if (document.body.classList.contains("dark-mode")) {
      if (modeIcon) modeIcon.src = "/static/light.png";
      localStorage.setItem("dark-mode", "enabled");
    } else {
      if (modeIcon) modeIcon.src = "/static/dark.png";
      localStorage.setItem("dark-mode", "disabled");
    }
  }
  
  // Expose functions to the global scope
  window.toggleDarkMode = toggleDarkMode;
  window.applyStoredDarkMode = applyStoredDarkMode;
  