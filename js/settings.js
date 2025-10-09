
// ------------------------- Dropdown functionality -------------------------
// Récupère les éléments du DOM liés au menu de paramètres (icône / dropdown)
const settingsButton = document.getElementById("settingsButton");
const dropdown = document.querySelector(".dropdown");

// Quand on clique sur le bouton des paramètres, on ouvre/ferme le menu.
// stopPropagation empêche le clic de se propager (afin que le gestionnaire
// document.click ne le ferme immédiatement).
settingsButton.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdown.classList.toggle("active");
});

// Fermer le menu si l'utilisateur clique en dehors du dropdown
document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("active");
    }
});


// ------------------------- Theme (Dark/Light) -------------------------//
// lightstatus contient l'état actuel ('LIGHT' ou 'DARK')//
let lightstatus = localStorage.getItem('theme') || 'LIGHT'; // Valeur par défaut

/**
 * applyTheme(theme)
 * - Ajoute ou enlève la classe CSS 'dark-theme' sur <html>
 * - La classe 'dark-theme' active les variables CSS pour le mode sombre
 */
function applyTheme(theme) {
    if (theme === 'DARK') {
        document.documentElement.classList.add('dark-theme');
    } else {
        document.documentElement.classList.remove('dark-theme');
    }
}

/**
 * initTheme()
 * - Initialise le thème au chargement de la page :
 *   1) prend la préférence sauvegardée (localStorage)
 *   2) sinon utilise le thème clair par défaut (mode original)
 * - Met aussi à jour le label du bouton si présent
 */
function initTheme() {
    // charge la préférence si elle existe
    const saved = localStorage.getItem('theme');
    if (saved) {
        lightstatus = saved;
    } else {
        // Par défaut, on reste en LIGHT (mode original) si aucune préférence
        lightstatus = 'LIGHT';
    }
    // Appliquer visuellement le thème
    applyTheme(lightstatus);

    // Mettre à jour le texte du bouton (Dark Mode / Light Mode)
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = lightstatus === 'DARK' ? 'Light Mode' : 'Dark Mode';
}

/**
 * Gestionnaire clic sur le bouton de thème
 * - Bascule l'état
 * - Applique le thème
 * - Sauvegarde la préférence dans localStorage
 * - Met à jour le label du bouton
 * - Ferme le dropdown
 */
document.getElementById("themeToggle").addEventListener("click", (e) => {
    e.preventDefault();

    // Bascule l'état entre LIGHT et DARK 
    lightstatus = lightstatus === 'LIGHT' ? 'DARK' : 'LIGHT';

    // Log pour debug
    console.log('Changement de mode :', lightstatus);

    // Appliquer et sauvegarder
    applyTheme(lightstatus);
    localStorage.setItem('theme', lightstatus);

    // Update du texte du bouton si l'élément existe
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = lightstatus === 'DARK' ? 'Light Mode' : 'Dark Mode';

    // Fermer le menu après sélection
    dropdown.classList.remove("active");
});

// Initialisation du thème lorsque le DOM est prêt
document.addEventListener('DOMContentLoaded', initTheme);


// ------------------------- Autres options du menu -------------------------
// Exemple : changement de langue (à implémenter réellement)
document.getElementById("languageToggle").addEventListener("click", (e) => {
    e.preventDefault();
    
    alert("Changement de langue - À implémenter");
    dropdown.classList.remove("active");
});