
import api from "../utils/axios.js";
const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");
const body = document.getElementById("bod");

menuButton.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});

document.getElementById("com1").addEventListener("click", () => {
    if (!menu.classList.contains("hidden")) {
        menu.classList.add("hidden"); // Close the menu
    }
});

document.getElementById("com2").addEventListener("click", () => {
    if (!menu.classList.contains("hidden")) {
        menu.classList.add("hidden"); // Close the menu
    }
});

document.getElementById("com3").addEventListener("click", () => {
    if (!menu.classList.contains("hidden")) {
        menu.classList.add("hidden"); // Close the menu
    }
});

body.addEventListener("click", () => {
    if (!menu.classList.contains("hidden")) {
        menu.classList.add("hidden"); // Close the menu
    }
});

let vehicule = {};

function changeValue(image) {

    document.getElementById("photo").src = image;
    document.getElementById("photo").classList.remove("zoom-in");
    document.getElementById("photo").classList.add("zoom-in");

};
window.changeValue = changeValue;

let voiture = {};

function envoyerMail() {
    let destinataire = "exemple@email.com";
    let objet = "Sujet de l'email";
    let corps = "Bonjour,\n\nVoici un message automatique.\n\nCordialement.";

    // Encodage pour éviter les erreurs avec les espaces et caractères spéciaux
    let mailto = `mailto:${destinataire}?subject=${encodeURIComponent(
        objet
    )}&body=${encodeURIComponent(corps)}`;

    // Ouvre le client mail
    window.location.href = mailto;
}
window.envoyerMail = envoyerMail;

async function ouvrirGmail() {

    const id = localStorage.getItem("idVoiture");
    const response = await api.get(`/vehicules/${id}/`);
    const vehicule = response.data;

    
    let destinataire = "worldltdhopebusiness@gmail.com";

    let objet =
        "[HOPE BUSINESS WORLD] Commande : " +
        vehicule.marque +
        " " +
        vehicule.modele +
        " de " +
        Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
            vehicule.prix
        );
    let corps = `Bonjour,
    \nVous avez sélectionné une voiture de marque ${vehicule.marque}, modèle ${vehicule.modele
        }, année ${vehicule.annee}, avec une cylindrée de ${vehicule.cylindres
        } et une transmission ${vehicule.transmission}. Ce véhicule, de couleur ${vehicule.couleur
        }, est équipé d’une boîte de vitesses ${vehicule.pilotage}, dispose de ${vehicule.places
        } places et ${vehicule.portes} portes, et fonctionne au ${vehicule.carburant
        }. Avec un kilométrage de ${vehicule.kilometrage
        } km, ce véhicule est proposé au prix de ${vehicule.prix
        } USD. \n\nEn plus des caractéristiques standards, il est doté d’équipements supplémentaires tels que ${vehicule.equipements
            .toString()
            .replace(
                ",",
                ", "
            )}. Afin de finaliser votre achat, vous devez également voir le véhicule en présentiel, permettant ainsi de mieux visualiser son état et ses finitions.
    \nCette commande témoigne d’une volonté du client d’acquérir un véhicule fiable, adapté à ses attentes en matière de confort, de performance et de sécurité.
    \nVous recevrez dans peu de temps un message sur votre mail ou numéro de téléphone.\nVous pouvez révoir les images de la voiture en cliquant sur ce lien : ${window.location.href
        }
    \n\n➡ Votre téléphone : +243 _______

    Nos coordonnées :
    
    AV.P.E. Lumumba
    Bukavu, BP. 285
    DR Congo
    📞 Tel: +243 997 671 960
    📞 Tel: +243 822 633 356

    Le Directeur
    Albert Bisimwa Bagula
    HOPE BUSINESS WORLD LTD

        `;

    // Encodage des éléments pour éviter les erreurs avec les caractères spéciaux
    let gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        destinataire
    )}&su=${encodeURIComponent(objet)}&body=${encodeURIComponent(corps)}`;

    // Ouvre Gmail dans un nouvel onglet
    document.getElementById("orderModal").classList.add("hidden");
    window.open(gmailURL, "_blank");
}

window.ouvrirGmail = ouvrirGmail;

async function openWhatsapp() {
    // const vehicule = JSON.parse(localStorage.getItem("voitureSelectionnee"));
    const id = localStorage.getItem("idVoiture");
    const response = await api.get(`/vehicules/${id}/`);
    const vehicule = response.data;
    // Numéro du destinataire (format international sans "+" ni espaces)
    // let phoneNumber = "243894097071"; // Exemple pour la RDC
    let phoneNumber = "243997671960"; // Exemple pour la RDC

    let message = `*[HOPE BUSINESS WORLD] COMMANDE VOITURE*

*Marque* : ${vehicule.marque}
*Modèle* : ${vehicule.modele}
*Année* : ${vehicule.annee}
*Cylindrée* : ${vehicule.cylindres}
*Transmission* : ${vehicule.transmission}
*Couleur* : ${vehicule.couleur}
*Boîte de vitesses* : ${vehicule.pilotage}
*Places* : ${vehicule.places}
*Portes* : ${vehicule.portes}
*Carburant* : ${vehicule.carburant}
*Kilométrage* : ${vehicule.kilometrage} km
*Prix* : ${vehicule.prix} USD

*Équipements supplémentaires* : ${vehicule.equipements}

Pour finaliser votre achat, une visite en présentiel est recommandée afin d’évaluer l’état du véhicule.

Vous recevrez également un message sur votre e-mail ou votre numéro de téléphone. Vous pouvez révoir les images de la voiture en cliquant sur ce lien :
${window.location.href}

*Nos coordonnées* :

*Adresse* : AV. P.E. Lumumba, Bukavu, BP. 285, DR Congo
*Tel*   : +243 997 671 960
*Tel*   : +243 822 633 356
*Email* : worldltdhopebusiness@gmail.com

*Le Directeur*
Albert Bisimwa Bagula
*HOPE BUSINESS WORLD LTD*`;

    // Encoder le message pour l'URL
    let encodedMessage = encodeURIComponent(message);

    // URL pour ouvrir WhatsApp
    let whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Ouvrir WhatsApp dans un nouvel onglet
    document.getElementById("orderModal").classList.add("hidden");
    window.open(whatsappUrl, "_blank");
}
window.openWhatsapp = openWhatsapp;

function openModal() {
    document.getElementById("orderModal").classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
}
window.openModal = openModal;

// Fonction pour fermer le pop-up
function closeModal() {
    document.getElementById("orderModal").classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
}

window.closeModal = closeModal;

let connexion = localStorage.getItem("connexion");
let user = JSON.parse(localStorage.getItem("userBusiness"));
document.getElementById("com3").innerText = "Se connecter";

if (connexion == "1") {
    document.getElementById("userLogin").innerHTML = `
        <div class="size-12 rounded-full flex justify-center items-center">
            <img src="${user.image}" class="size-12 rounded-full" alt="Profile">
        </div>
    `;

    document.getElementById("com3").innerText = "Se deconnecter";
}

function addChange(texte) {
    return texte.replace(/,/g, ', ');
  }


async function fetchVoiture() {

    const id = localStorage.getItem("idVoiture");
    const response = await api.get(`/vehicules/${id}/`);
    const voiture = response.data;

    console.log(voiture);

    if (!voiture) return;

    const imageViews = document.getElementById("imageView");

    voiture.images.forEach(element => {
        const card = document.createElement("div");
        card.className = "size-25 border-2 border-gray-100 rounded-md flex justify-center items-center mt-4";
        card.innerHTML = ` 
  <button onclick="changeValue('data:image/jpeg;base64,${element?.image_base64?.replace(/'/g, "\\'") || ""}')">
    <img class="size-25 object-cover hover:cursor-pointer rounded-md" src="data:image/jpeg;base64,${element?.image_base64 || ""}" alt="Image véhicule">
  </button>
`;

        imageViews.appendChild(card);
    });

    document.getElementById(
        "photo"
    ).src = `data:image/jpeg;base64,${voiture.images?.[0]?.image_base64 || "#"}`;
    document.getElementById(
        "modMaq"
    ).textContent = `${voiture.marque} ${voiture.modele}`;
    document.getElementById("mar").textContent = `: ${voiture.modele}`;
    document.getElementById("referenc").textContent = `: ${voiture.reference || "Non défini"
        }`;
    document.getElementById("annee").textContent = `: ${voiture.annee || "Non précisée"
        }`;
    document.getElementById("cylynd").textContent = `: ${voiture.cylindres || "Non précisée"
        }`;
    document.getElementById("pil").textContent = `: ${voiture.pilotage || "Non précisé"
        }`;
    document.getElementById("trans").textContent = `: ${voiture.transmission || "Non précisée"
        }`;
    document.getElementById("prix").textContent = `: ${voiture.prix || "Non précisé"
        } USD`;
    document.getElementById("equipe").textContent = `: ${ addChange(voiture.equipements.toString()) || "Non défini"
        }`;
  
    document.getElementById("prop").textContent = `: ${voiture.historique_proprietaires || "Non défini"
        }`;
    document.getElementById("reparation").textContent = `: ${voiture.historique_reparations || "Non défini"
        }`;
    document.getElementById("locat").textContent = `: ${voiture.localisation || "Non défini"
        }`;
    document.getElementById("dist").textContent = `: ${voiture.kilometrage || "Non défini"
        } Km`;
    document.getElementById("porte").textContent = `: ${voiture.portes || "Non défini"
        }`;
    document.getElementById("place").textContent = `: ${voiture.places || "Non défini"
        }`;
    document.getElementById("carb").textContent = `: ${voiture.carburant || "Non défini"
        }`;
    document.getElementById("color").textContent = `: ${voiture.couleur || "Non défini"
        }`;

}


document.addEventListener("DOMContentLoaded", fetchVoiture);
