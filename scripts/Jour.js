window.listeJours = [];

/**
 * Recherche un objet jour correspondant à la date (jour, mois, année).
 * Si aucun objet n'existe pour cette date, il en crée un nouveau avec des champs vides pour les heures.
 * @param {number} jour - Le numéro du jour (1-31)
 * @param {number} mois - Le numéro du mois (0-11)
 * @param {number} annee - L'année (ex: 2025)
 * @returns {Object} L'objet représentant le jour sélectionné
 */
window.obtenirJour = function(jour, mois, annee) {
    let jourObj = window.listeJours.find(j => j.jour === jour && j.mois === mois && j.annee === annee);
    if (!jourObj) {
        jourObj = { jour, mois, annee, heureEmbauche: '', heureDebauche: '', dureePause: '' };
        window.listeJours.push(jourObj);
    }
    return jourObj;
};

/**
 * Modifie les heures d'embauche, de débauche et la durée de pause pour un jour donné.
 * @param {Object} jourObj - L'objet jour à modifier
 * @param {string} embauche - Heure d'embauche (format "HH:MM")
 * @param {string} debauche - Heure de débauche (format "HH:MM")
 * @param {string|number} pause - Durée de la pause en minutes
 */
window.modifierHeuresJour = function(jourObj, embauche, debauche, pause) {
    jourObj.heureEmbauche = embauche;
    jourObj.heureDebauche = debauche;
    jourObj.dureePause = pause;
};
