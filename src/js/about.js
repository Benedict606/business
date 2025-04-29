import ScrollReveal from 'scrollreveal';

function toggleNavbar(collapseID) {
    document.getElementById(collapseID).classList.toggle("hidden");
    document.getElementById(collapseID).classList.toggle("block");
}

window.toggleNavbar = toggleNavbar


const contentBlock = document.getElementById("hbwContent");
const title = document.getElementById("hbwTitle");
const text1 = document.getElementById("hbwText1");
const text2 = document.getElementById("hbwText2");

const contentFR = {
    title: "Présentation générale de HBW",
    text1: "Fondée en l’an 2000, Hope Business World LTD est une entreprise internationale basée en République Démocratique du Congo.",
    text2: "Spécialisée dans l’import-export et la logistique de transport, nous accompagnons nos partenaires à travers l’Afrique et au-delà grâce à un service rapide, sécurisé et de qualité.",
};

const contentEN = {
    title: "General Overview of HBW",
    text1: "Founded in 2000, Hope Business World LTD is an international company based in the Democratic Republic of Congo.",
    text2: "Specialized in import-export and transport logistics, we support our partners across Africa and beyond with fast, secure, and high-quality service.",
};

let isFrench = true;

setInterval(() => {
    // Étape 1 : Animation de disparition
    contentBlock.classList.remove("opacity-100");
    contentBlock.classList.add("opacity-0");

    // Étape 2 : Après la disparition (1s), changement de contenu
    setTimeout(() => {
        const newContent = isFrench ? contentEN : contentFR;
        title.textContent = newContent.title;
        text1.textContent = newContent.text1;
        text2.textContent = newContent.text2;

        // Étape 3 : Réapparaître avec animation
        contentBlock.classList.remove("opacity-0");
        contentBlock.classList.add("opacity-100");

        isFrench = !isFrench;
    }, 1000); // correspond à duration-1000
}, 10000); // 3s visible, 1s fade out, 1s fade in, 1s pause

const growthBlock = document.getElementById("growthContent");
const growthTitle = document.getElementById("growthTitle");
const growthText1 = document.getElementById("growthText1");
const growthText2 = document.getElementById("growthText2");

const contentFRc = {
    title: "Une entreprise en pleine croissance",
    text1: "Depuis sa création en 2000, Hope Business World LTD a tracé un chemin remarquable dans le secteur du transport et de l’import-export.",
    text2: "Nous avons bâti une expertise solide et un réseau fiable qui nous permettent aujourd’hui de proposer des solutions logistiques efficaces et sur mesure.",
};

const contentENc = {
    title: "A Fast-Growing Company",
    text1: "Since its founding in 2000, Hope Business World LTD has made remarkable progress in the field of transport and import-export.",
    text2: "We have built solid expertise and a reliable network that today allow us to offer efficient and customized logistics solutions.",
};

let isFrenchc = true;

setInterval(() => {
    // Étape 1 : fade out
    growthBlock.classList.remove("opacity-100");
    growthBlock.classList.add("opacity-0");

    // Étape 2 : changer le texte après disparition
    setTimeout(() => {
        const content = isFrenchc ? contentENc : contentFRc;
        growthTitle.textContent = content.title;
        growthText1.textContent = content.text1;
        growthText2.textContent = content.text2;

        // Étape 3 : fade in
        growthBlock.classList.remove("opacity-0");
        growthBlock.classList.add("opacity-100");

        isFrenchc = !isFrenchc;
    }, 1000); // attendre la fin de l’animation (1s)
}, 10000); // changement toutes les 6 secondes



ScrollReveal().reveal('#domaine', {
    delay: 300,
    distance: '100px',
    origin: 'bottom',
    duration: 800,
    easing: 'ease-in-out',
    reset: false
});

ScrollReveal().reveal('#team', {
    delay: 300,
    distance: '100px',
    origin: 'bottom',
    duration: 800,
    easing: 'ease-in-out',
    reset: false
});

ScrollReveal().reveal('#debut', {
    delay: 300,
    distance: '100px',
    origin: 'bottom',
    duration: 800,
    easing: 'ease-in-out',
    reset: false
});

ScrollReveal().reveal('#together', {
    delay: 300,
    distance: '100px',
    origin: 'bottom',
    duration: 800,
    easing: 'ease-in-out',
    reset: false
});

document.getElementById('link-domaine').addEventListener('click', function (event) {
    event.preventDefault(); // Empêcher le comportement classique du lien

    document.querySelector('#domaine').scrollIntoView({
        behavior: 'smooth'  // Défilement fluide
    });
    document.getElementById('example-collapse-navbar').classList.toggle("hidden");
});

document.getElementById('link-domaines').addEventListener('click', function (event) {
    event.preventDefault(); // Empêcher le comportement classique du lien

    document.querySelector('#domaine').scrollIntoView({
        behavior: 'smooth'  // Défilement fluide
    });
});


document.getElementById('link-team').addEventListener('click', function (event) {
    event.preventDefault(); // Empêcher le comportement classique du lien

    document.querySelector('#team').scrollIntoView({
        behavior: 'smooth'  // Défilement fluide
    });
    document.getElementById('example-collapse-navbar').classList.toggle("hidden");
});

document.getElementById('link-teams').addEventListener('click', function (event) {
    event.preventDefault(); // Empêcher le comportement classique du lien

    document.querySelector('#team').scrollIntoView({
        behavior: 'smooth'  // Défilement fluide
    });
});


document.getElementById('link-debut').addEventListener('click', function (event) {
    event.preventDefault(); // Empêcher le comportement classique du lien

    document.querySelector('#debut').scrollIntoView({
        behavior: 'smooth'  // Défilement fluide
    });
});


document.getElementById('link-together').addEventListener('click', function (event) {
    event.preventDefault(); // Empêcher le comportement classique du lien

    document.querySelector('#together').scrollIntoView({
        behavior: 'smooth'  // Défilement fluide
    });
    document.getElementById('example-collapse-navbar').classList.toggle("hidden");
});

let comm = ''