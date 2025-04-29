import api from "../utils/axios.js";
import { modalTemplate } from "./data.js";
import ScrollReveal from 'scrollreveal';


const carousel = document.getElementById("carousel");

const slides = carousel.children;
const totalSlides = slides.length;
let index = 0;
let libelle = "Toutes les voitures";

function afficheImageSuivante() {
  index = (index + 1) % totalSlides;
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(afficheImageSuivante, 3000);

async function fetchVehicules() {
  const accessToken = localStorage.getItem("access");
  try {

    const container = document.getElementById("containerc");

    container.innerHTML = "";
    const cards = document.createElement("div");
    cards.className = "flex flex-col items-center justify-center h-100 w-full animate-fadeIn";
    cards.innerHTML = `
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p class="mt-4 text-gray-600 text-lg font-medium">Chargement des véhicules en cours...</p>
        
    `;
    container.appendChild(cards);





    const response = await api.get("/vehicules/");
    const vehicules = response.data;

    const marqueF = document.getElementById('marqueF');
    const modeleF = document.getElementById('modeleF');
    let marqueFList = [];
    let modeleFList = [];

    vehicules.forEach((vehicule, i) => {
      if (!marqueFList.includes(vehicule.marque)) {
        marqueFList.push(vehicule.marque)
      }
      if (!modeleFList.includes(vehicule.modele)) {
        modeleFList.push(vehicule.modele)
      }
    })

    marqueFList.forEach((mark, i) => {
      let option = document.createElement('option');
      option.value = mark.toLowerCase();
      option.textContent = mark.toUpperCase();
      marqueF.appendChild(option);
    });

    modeleFList.forEach((mod, i) => {
      let option = document.createElement('option');
      option.value = mod.toLowerCase();
      option.textContent = mod.toUpperCase();
      modeleF.appendChild(option);
    });



    container.innerHTML = "";

    if (vehicules.length == 0) {
      container.innerHTML = `
     <div class="flex flex-col items-center w-full mt-5 justify-center">
          <img class="lg:w-160" src="src/assets/images/main/void.png" alt="">
          <div>
            <p class="text-xl mt-4 text-center">Pas de résultat</p>
          </div>
      </div>
    `;
    } else {
      vehicules.forEach((vehicule, i) => {
        const card = document.createElement("div");
        card.className = "max-w-xs bg-white rounded-md shadow-md overflow-hidden";

        card.innerHTML = `
        <img class="w-full h-48 object-cover rounded-md" src="data:image/jpeg;base64,${vehicule.images?.[0]?.image_base64 || "#"
          }" alt="${vehicule.modele}">
        <div class="p-4">
          <h2 class="text-lg font-semibold mb-2">${vehicule.marque} ${vehicule.modele
          }</h2>
          <p class="text-gray-600 text-sm">${vehicule.pilotage || "NA"
          }, couleur 
          ${vehicule.couleur || "NA"
          },
          ${vehicule.kilometrage || "NA"
          } KM,</p>
          <p class="text-gray-600 text-sm">
          ${vehicule.places || "NA"
          } places, 
          ${vehicule.portes || "NA"
          } portes, 
          ${vehicule.carburant || "NA"
          } ...</p>
          <p class="text-blue-800 font-bold mt-2">${vehicule.prix || "Prix non défini"
          } USD</p>
        </div>
      `;

        container.appendChild(card);

        card.addEventListener("click", () => {
          localStorage.setItem("idVoiture", vehicule.id);

          window.location.href = "/details";
        });


      });
    }
  } catch (err) {
    console.error("Erreur lors du chargement des véhicules :", err);
    const container = document.getElementById("containerc");
    container.innerHTML = `
     <div class="flex flex-col items-center w-full mt-5 justify-center">
          <img class="lg:w-160" src="src/assets/images/main/void.png" alt="">
          <div>
            <p class="text-xl mt-4 text-center">Pas de résultat</p>
          </div>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", fetchVehicules);


ScrollReveal().reveal('#contact', {
  delay: 300,
  distance: '100px',
  origin: 'bottom',
  duration: 800,
  easing: 'ease-in-out',
  reset: false
});

// Faire défiler jusqu'à la section #contact doucement
document.getElementById('link-contact').addEventListener('click', function (event) {
  event.preventDefault(); // Empêcher le comportement classique du lien

  document.querySelector('#contact').scrollIntoView({
    behavior: 'smooth'  // Défilement fluide
  });
});

// Faire défiler jusqu'à la section #contact doucement
document.getElementById('link-contacts').addEventListener('click', function (event) {
  event.preventDefault(); // Empêcher le comportement classique du lien

  document.querySelector('#contact').scrollIntoView({
    behavior: 'smooth'  // Défilement fluide
  });
});

ScrollReveal().reveal('#products', {
  delay: 300,
  distance: '100px',
  origin: 'bottom',
  duration: 800,
  easing: 'ease-in-out',
  reset: false
});

// Faire défiler jusqu'à la section #contact doucement
document.getElementById('link-product').addEventListener('click', function (event) {
  event.preventDefault(); // Empêcher le comportement classique du lien

  document.querySelector('#products').scrollIntoView({
    behavior: 'smooth'  // Défilement fluide
  });
});








ScrollReveal().reveal('#contact', {
  delay: 300,
  distance: '100px',
  origin: 'bottom',
  duration: 800,
  easing: 'ease-in-out',
  reset: false
});

// Faire défiler jusqu'à la section #contact doucement
document.getElementById('link-contactF').addEventListener('click', function (event) {
  event.preventDefault(); // Empêcher le comportement classique du lien

  document.querySelector('#contact').scrollIntoView({
    behavior: 'smooth'  // Défilement fluide
  });
});


ScrollReveal().reveal('#products', {
  delay: 300,
  distance: '100px',
  origin: 'bottom',
  duration: 800,
  easing: 'ease-in-out',
  reset: false
});

// Faire défiler jusqu'à la section #contact doucement
document.getElementById('link-productF').addEventListener('click', function (event) {
  event.preventDefault(); // Empêcher le comportement classique du lien

  document.querySelector('#products').scrollIntoView({
    behavior: 'smooth'  // Défilement fluide
  });
});









const menuButton = document.getElementById("menu-button");
const menu = document.getElementById('menu');
const outBody = document.getElementById('outBody');
const linkProduct = document.getElementById('link-product');
const linkContac = document.getElementById('link-contact');

menuButton.addEventListener("click", () => {
  menu.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
});

outBody.addEventListener("click", () => {
  menu.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
});

linkProduct.addEventListener("click", () => {
  if (document.body.classList.contains("overflow-hidden")) {
    document.body.classList.remove("overflow-hidden");
  }
  if (!menu.classList.contains("hidden")) {
    menu.classList.add("hidden");
  }
});

linkContac.addEventListener("click", () => {
  if (document.body.classList.contains("overflow-hidden")) {
    document.body.classList.remove("overflow-hidden");
  }
  if (!menu.classList.contains("hidden")) {
    menu.classList.add("hidden");
  }
});


async function fetchActus(wordSearch) {
  const accessToken = localStorage.getItem("access");
  try {

    const container = document.getElementById("containerc");

    container.innerHTML = "";
    const cards = document.createElement("div");
    cards.className = "flex flex-col items-center justify-center h-100 w-full animate-fadeIn";
    cards.innerHTML = `
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p class="mt-4 text-gray-600 text-lg font-medium">Chargement des véhicules en cours...</p>
        
    `;
    container.appendChild(cards);





    const response = await api.get("/vehicules/");
    const vehiculesZ = response.data;

    let vehicules = [];
    vehiculesZ.forEach((veh, i) => {
      let marquev = (veh.marque).toLowerCase()
      let modelev = (veh.modele).toLowerCase()

      if (marquev.includes(wordSearch.toLowerCase()) || modelev.includes(wordSearch.toLowerCase())) {
        vehicules.push(veh);
      }
    })
    container.innerHTML = "";

    if (vehicules.length == 0) {
      container.innerHTML = `
     <div class="flex flex-col items-center w-full mt-5 justify-center">
          <img class="lg:w-160" src="src/assets/images/main/void.png" alt="">
          <div>
            <p class="text-xl mt-4 text-center">Pas de résultat</p>
          </div>
      </div>
    `;
    } else {
      vehicules.forEach((vehicule, i) => {
        const card = document.createElement("div");
        card.className = "max-w-xs bg-white rounded-md shadow-md overflow-hidden";

        card.innerHTML = `
        <img class="w-full h-48 object-cover rounded-md" src="data:image/jpeg;base64,${vehicule.images?.[0]?.image_base64 || "#"
          }" alt="${vehicule.modele}">
        <div class="p-4">
          <h2 class="text-lg font-semibold mb-2">${vehicule.marque} ${vehicule.modele
          }</h2>
          <p class="text-gray-600 text-sm">${vehicule.pilotage || "NA"
          }, couleur 
          ${vehicule.couleur || "NA"
          },
          ${vehicule.kilometrage || "NA"
          } KM,</p>
          <p class="text-gray-600 text-sm">
          ${vehicule.places || "NA"
          } places, 
          ${vehicule.portes || "NA"
          } portes, 
          ${vehicule.carburant || "NA"
          } ...</p>
          <p class="text-blue-800 font-bold mt-2">${vehicule.prix || "Prix non défini"
          } USD</p>
        </div>
      `;

        container.appendChild(card);

        card.addEventListener("click", () => {
          localStorage.setItem("idVoiture", vehicule.id);

          window.location.href = "/details";
        });


      });
    }
  } catch (err) {
    console.error("Erreur lors du chargement des véhicules :", err);
    const container = document.getElementById("containerc");
    container.innerHTML = `
     <div class="flex flex-col items-center w-full mt-5 justify-center">
          <img class="lg:w-160" src="src/assets/images/main/void.png" alt="">
          <div>
            <p class="text-xl mt-4 text-center">Pas de résultat</p>
          </div>
      </div>
    `;
  }
}

async function filterDatas(marquec, modelec, prixinf, prixsup) {
  const accessToken = localStorage.getItem("access");
  try {

    const container = document.getElementById("containerc");

    container.innerHTML = "";
    const cards = document.createElement("div");
    cards.className = "flex flex-col items-center justify-center h-100 w-full animate-fadeIn";
    cards.innerHTML = `
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p class="mt-4 text-gray-600 text-lg font-medium">Chargement des véhicules en cours...</p>
        
    `;
    container.appendChild(cards);





    const response = await api.get("/vehicules/");
    const vehiculesZ = response.data;

    let vehicules = [];
    vehiculesZ.forEach((veh, i) => {
      let marquev = (veh.marque).toLowerCase();
      let modelev = (veh.modele).toLowerCase();
      let prix = veh.prix;

      if (marquev.includes(marquec.toLowerCase()) && modelev.includes(modelec.toLowerCase()) && parseInt(prix, 10) <= parseInt(prixsup, 10) && parseInt(prix, 10) >= parseInt(prixinf, 10)) {
        vehicules.push(veh);
      }
    })
    container.innerHTML = "";

    if (vehicules.length == 0) {
      container.innerHTML = `
     <div class="flex flex-col items-center w-full mt-5 justify-center">
          <img class="lg:w-160" src="src/assets/images/main/void.png" alt="">
          <div>
            <p class="text-xl mt-4 text-center">Pas de résultat</p>
          </div>
      </div>
    `;
    } else {
      vehicules.forEach((vehicule, i) => {
        const card = document.createElement("div");
        card.className = "max-w-xs bg-white rounded-md shadow-md overflow-hidden";

        card.innerHTML = `
        <img class="w-full h-48 object-cover rounded-md" src="data:image/jpeg;base64,${vehicule.images?.[0]?.image_base64 || "#"
          }" alt="${vehicule.modele}">
        <div class="p-4">
          <h2 class="text-lg font-semibold mb-2">${vehicule.marque} ${vehicule.modele
          }</h2>
          <p class="text-gray-600 text-sm">${vehicule.pilotage || "NA"
          }, couleur 
          ${vehicule.couleur || "NA"
          },
          ${vehicule.kilometrage || "NA"
          } KM,</p>
          <p class="text-gray-600 text-sm">
          ${vehicule.places || "NA"
          } places, 
          ${vehicule.portes || "NA"
          } portes, 
          ${vehicule.carburant || "NA"
          } ...</p>
          <p class="text-blue-800 font-bold mt-2">${vehicule.prix || "Prix non défini"
          } USD</p>
        </div>
      `;

        container.appendChild(card);

        card.addEventListener("click", () => {
          localStorage.setItem("idVoiture", vehicule.id);

          window.location.href = "/details";
        });


      });
    }
  } catch (err) {
    console.error("Erreur lors du chargement des véhicules :", err);
    const container = document.getElementById("containerc");
    container.innerHTML = `
     <div class="flex flex-col items-center w-full mt-5 justify-center">
          <img class="lg:w-160" src="src/assets/images/main/void.png" alt="">
          <div>
            <p class="text-xl mt-4 text-center">Pas de résultat</p>
          </div>
      </div>
    `;
  }
}

const vehiculeS = document.getElementById("vehiculeS");


function searchVehical() {
  index = (index + 1) % totalSlides;
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

const searchValue = document.getElementById('searchValue');

searchValue.addEventListener('keydown', function (event) {
  console.log("Okay")
  if (event.key === 'Enter') {
    console.log(searchValue.value);
    document.getElementById("products").scrollIntoView({ behavior: 'smooth' });
    let valueCC = searchValue.value;
    fetchActus(valueCC);
    vehiculeS.innerText = `Recherche ...'${valueCC}'`;
    searchValue.value = "";

  }
});


const searchValue2 = document.getElementById('searchValue2');

searchValue2.addEventListener('keydown', function (event) {
  console.log("Okay")
  if (event.key === 'Enter') {
    console.log(searchValue2.value);
    document.getElementById("products").scrollIntoView({ behavior: 'smooth' });
    let valueCC = searchValue2.value;
    fetchActus(valueCC);
    vehiculeS.innerText = `Recherche ...'${valueCC}'`;
    searchValue2.value = "";

  }
});



document.getElementById('filter').addEventListener('click', () => {
  let var1 = document.getElementById('marqueF').value;
  let var2 = document.getElementById('modeleF').value;
  let var3 = document.getElementById('upperP').value;
  let var4 = document.getElementById('lowerP').value;
  filterDatas(var1, var2, var4, var3);
  vehiculeS.innerText = `Filtre ... plus`;

})



