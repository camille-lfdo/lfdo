/**
 * Gère la soumission du formulaire d'édition des heures pour un jour sélectionné.
 * Empêche le rechargement de la page, met à jour les valeurs du jour sélectionné.
 * recueille les valeurs des champs du formulaire,
 * modifie l'objet jour correspondant dans la liste des jours,
 * et affiche les nouvelles informations dans la zone d'information.
 */
document.getElementById('formulaireHeures').addEventListener('submit', function(e) {
    e.preventDefault();
    if (window.jourSelectionne) {
        window.modifierHeuresJour(
            window.jourSelectionne,
            document.getElementById('heureEmbauche').value,
            document.getElementById('heureDebauche').value,
            document.getElementById('dureePause').value
        );
        document.getElementById('infosJour').innerHTML = `
            <strong>Heure d'embauche :</strong> ${window.jourSelectionne.heureEmbauche || '-'}<br>
            <strong>Heure de débauche :</strong> ${window.jourSelectionne.heureDebauche || '-'}<br>
            <strong>Durée de pause :</strong> ${window.jourSelectionne.dureePause || '-'} min
        `;
    }
});
