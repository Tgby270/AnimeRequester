///////////////////////////////////////////////////////////////////////////////
// --------------------------- Theme (Dark/Light) ---------------------------//
///////////////////////////////////////////////////////////////////////////////

/**
 * applyTheme(theme)
 * - Ajoute ou enlève la classe CSS 'dark-theme'
 * - La classe 'dark-theme' active les variables CSS pour le mode sombre
 */
 function applyTheme(theme) {
    const htmlElement = document.documentElement;
    if(theme === 'DARK') {
        htmlElement.classList.add('dark-theme');
    } else {
        htmlElement.classList.remove('dark-theme');
    }
}

/**
 * initTheme()
 * - Initialise le thème au chargement de la page :
 * - Thème clair par défaut
 */
function initTheme() {
    // Applique le theme sur la page
    applyTheme('LIGHT');
}

/**
 * Gestionnaire clic sur le bouton de thème
 * -check la nouvelle valeur de la checkbox
 * - Bascule l'état
 * - Applique le thème
 */
document.getElementById("themeToggleCheckbox").addEventListener("change", (e) => {
    
    const checked = e.target.checked;

    // Bascule entre LIGHT et DARK 
    currentTheme = checked ? 'DARK' : 'LIGHT';

    // Appliquer et sauvegarder
    applyTheme(currentTheme);

});

// Initialisation du thème lorsque le DOM est prêt
document.addEventListener('DOMContentLoaded', initTheme);