
// Dropdown functionality
const settingsButton = document.getElementById("settingsButton");
const dropdown = document.querySelector(".dropdown");

let lightstatus = "LIGHT";

settingsButton.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdown.classList.toggle("active");
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("active");
    }
});

// Handle dropdown menu items
document.getElementById("themeToggle").addEventListener("click", (e) => {
    e.preventDefault();
    
    alert("Changement de thème - À implémenter");
    dropdown.classList.remove("active");
});

document.getElementById("languageToggle").addEventListener("click", (e) => {
    e.preventDefault();
    
    if(isDarkMode) {//si dejas dark mode mettre en light mode
        
    } else {//si pas dark mode mettre en dark mode

    }

    isDarkMode = !isDarkMode;
    alert("Changement de langue - À implémenter");
    dropdown.classList.remove("active");
});