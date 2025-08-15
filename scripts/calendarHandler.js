const calendrierEl = document.getElementById('calendrier');
const zoneEditionEl = document.getElementById('zoneEdition');
const dateSelectionneeEl = document.getElementById('dateSelectionnee');
const infosJourEl = document.getElementById('infosJour');
const heureEmbaucheEl = document.getElementById('heureEmbauche');
const heureDebaucheEl = document.getElementById('heureDebauche');
const dureePauseEl = document.getElementById('dureePause');
const moisAfficheEl = document.getElementById('moisAffiche');
const btnPrecedent = document.getElementById('moisPrecedent');
const btnSuivant = document.getElementById('moisSuivant');

window.jourSelectionne = null;

const nomsMois = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

/**
 * Affiche le calendrier du mois et de l'année donnés.
 * Génère dynamiquement la grille des jours, les jours de la semaine,
 * et gère le décalage pour commencer au bon jour.
 * @param {number} mois - Le numéro du mois (0-11)
 * @param {number} annee - L'année (ex: 2025)
 */
function afficherCalendrier(mois, annee) {
    calendrierEl.innerHTML = '';
    moisAfficheEl.textContent = `${nomsMois[mois]} ${annee}`;
    const joursSemaine = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    joursSemaine.forEach(j => {
        const div = document.createElement('div');
        div.className = 'jour-semaine';
        div.textContent = j;
        calendrierEl.appendChild(div);
    });

    const premierJour = new Date(annee, mois, 1).getDay(); // 0 = dimanche
    const decalage = premierJour === 0 ? 6 : premierJour - 1;
    for (let i = 0; i < decalage; i++) {
        const vide = document.createElement('div');
        vide.className = 'case-vide';
        calendrierEl.appendChild(vide);
    }

    const nbJours = new Date(annee, mois + 1, 0).getDate();
    for (let jour = 1; jour <= nbJours; jour++) {
        const caseJour = document.createElement('div');
        caseJour.className = 'case-jour';
        caseJour.textContent = jour;
        caseJour.addEventListener('click', () => selectionnerJour(jour, mois, annee, caseJour));
        calendrierEl.appendChild(caseJour);
    }
}

/**
 * Sélectionne un jour dans le calendrier, affiche la zone d'édition,
 * et pré-remplit les champs si des valeurs existent déjà pour ce jour.
 * @param {number} jour - Le numéro du jour sélectionné
 * @param {number} mois - Le numéro du mois (0-11)
 * @param {number} annee - L'année
 * @param {HTMLElement} caseJour - L'élément HTML du jour sélectionné
 */
function selectionnerJour(jour, mois, annee, caseJour) {
    document.querySelectorAll('.case-jour.selectionnee').forEach(el => el.classList.remove('selectionnee'));
    caseJour.classList.add('selectionnee');
    window.jourSelectionne = window.obtenirJour(jour, mois, annee);
    dateSelectionneeEl.textContent = `${jour}/${mois+1}/${annee}`;
    zoneEditionEl.style.display = 'block';

    heureEmbaucheEl.value = window.jourSelectionne.heureEmbauche || '';
    heureDebaucheEl.value = window.jourSelectionne.heureDebauche || '';
    dureePauseEl.value = window.jourSelectionne.dureePause || '';

    afficherInfosJour();
}

/**
 * Affiche les informations (heures et pause) du jour sélectionné dans la zone d'édition.
 * Si aucune information n'est renseignée, affiche un message par défaut.
 */
function afficherInfosJour() {
    if (window.jourSelectionne.heureEmbauche || window.jourSelectionne.heureDebauche || window.jourSelectionne.dureePause) {
        infosJourEl.innerHTML = `
            <strong>Heure d'embauche :</strong> ${window.jourSelectionne.heureEmbauche || '-'}<br>
            <strong>Heure de débauche :</strong> ${window.jourSelectionne.heureDebauche || '-'}<br>
            <strong>Durée de pause :</strong> ${window.jourSelectionne.dureePause || '-'} min
        `;
    } else {
        infosJourEl.innerHTML = "<em>Aucune information renseignée.</em>";
    }
}

// Gestion des boutons de navigation des mois
btnPrecedent.addEventListener('click', () => {
    moisCourant--;
    if (moisCourant < 0) {
        moisCourant = 11;
        anneeCourante--;
    }
    afficherCalendrier(moisCourant, anneeCourante);
    zoneEditionEl.style.display = 'none';
});

btnSuivant.addEventListener('click', () => {
    moisCourant++;
    if (moisCourant > 11) {
        moisCourant = 0;
        anneeCourante++;
    }
    afficherCalendrier(moisCourant, anneeCourante);
    zoneEditionEl.style.display = 'none';
});

// Initialisation du calendrier au chargement
afficherCalendrier(new Date().getMonth(), new Date().getFullYear());
