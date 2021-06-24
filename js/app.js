const container = document.getElementById("mainContainer")
const button = document.querySelector('button');

// Code à trouver
let code = "";

// Génération du code à trouver avec 3 valeur aléatoire
const generationCode = () => {
    numeroUn = Math.floor(Math.random() * 10).toString()
    numeroDeux = Math.floor(Math.random() * 10).toString()
    numeroTrois = Math.floor(Math.random() * 10).toString()

    code = numeroUn + numeroDeux + numeroTrois
}

// Récupération de tous les champs
const recuperationInputs = () => {
    const input = document.querySelectorAll('.container')
    return input
}

// Initialiser le jeu
const initJeu = () => {
    generationCode();
    console.log(code);
    afficherNouveauxInputs();
}

// Générer trois nouveaux champs pour un tour de plus
const afficherNouveauxInputs= () => {
    const idContainer = recuperationInputs().length
    const inputs = document.createElement('div');
    let output = `
    <input />
    <input />
    <input />
    <span id="message"></span>
    `;
    
    inputs.className = "container";
    inputs.id = idContainer;
    inputs.innerHTML = output;
    container.appendChild(inputs);
}

// Verifie si le code de l'utilisateur est bon ou si il faut afficher un message d'erreur
const verifierCode = () => {
    const input = recuperationInputs();

    // Récupération du dernier nombre rentré par l'utilisteur
    const dernierInput = input[input.length - 1];
    const codeUtilisateur = dernierInput.childNodes[1].value + dernierInput.childNodes[3].value + dernierInput.childNodes[5].value
    const correctCombinaison = verifierCorrectCode(codeUtilisateur)

    // Si la combinaison est correct alors renvoie true
    if (correctCombinaison === 3) return true

    // Sinon afficher le bon message d'erreur
    afficherMessageErreur(correctCombinaison);

    return false
}

// Affiche le message d'erreur correspondant
const afficherMessageErreur = (correctCombinaison) => {
    // Récupère la dernière combinaison rentré par l'utilisateur
    const dernierInput = recuperationInputs()[recuperationInputs().length - 1]
    
    // Récupère la balise span avant de lui attribuer le message d'erreur
    const spanMessage = dernierInput.childNodes[7]

    // Vérifie quel message d'erreur afficher
    switch (correctCombinaison) {
        case 1:
            spanMessage.textContent = 'Un chiffre est juste'
            break;
        case 2:
            spanMessage.textContent = 'Deux chiffres sont justes'
            break;
        default:
            spanMessage.textContent = "Aucun chiffre n'est juste"
            break;
    }
}

// Affiche le message de fin de jeu
const afficherMessageGagnant = () => {
    const div = document.getElementById('winingMessage');
    if (div.textContent) return div
    const title = document.createElement('h1');

    title.textContent = "Vous avez trouvé la combinaison";

    return div.appendChild(title);
}

// Vérifie si le code de l'utilisateur correspond à celui généré
const verifierCorrectCode = (codeUtilisateur) => {
    let correctCombinaison = 0;
    const codeTableau = code.split('');
    const codeUtilisateurArray = codeUtilisateur.split('');

    codeTableau.forEach((number, index) => {
        if (number === codeUtilisateurArray[index]) correctCombinaison++
    })
    console.log(correctCombinaison)
    return correctCombinaison
}

// Fonction lancé lorsque l'utilisateur veux vérifier si sa combinaison est correct
const jouer = () => {
    const win = verifierCode();

    // Si win est false alors on affiche des nouveaux champs pour que le joueur puisse continuer à jouer
    if (win == false) {
        return afficherNouveauxInputs();
    }

    afficherMessageGagnant();
}

// Initialise le jeu au chargement de la page
document.addEventListener("DOMContentLoaded", initJeu)

// Si l'utilisateur clique sur le bouton alors on relance un tour de jeu
button.addEventListener('click', jouer);

// Initialisation du service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

