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

afficherCalendrier(new Date().getMonth(), new Date().getFullYear());
