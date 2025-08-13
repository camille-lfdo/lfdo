window.listeJours = [];

window.obtenirJour = function(jour, mois, annee) {
    let jourObj = window.listeJours.find(j => j.jour === jour && j.mois === mois && j.annee === annee);
    if (!jourObj) {
        jourObj = { jour, mois, annee, heureEmbauche: '', heureDebauche: '', dureePause: '' };
        window.listeJours.push(jourObj);
    }
    return jourObj;
};

window.modifierHeuresJour = function(jourObj, embauche, debauche, pause) {
    jourObj.heureEmbauche = embauche;
    jourObj.heureDebauche = debauche;
    jourObj.dureePause = pause;
};
