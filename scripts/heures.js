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
