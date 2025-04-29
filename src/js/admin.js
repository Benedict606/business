import api from "../utils/axios.js";
import { viewModalTemplate } from "./data.js";

const modal = document.getElementById("car-modal");
const openBtn = document.getElementById("open-modal-btn");
const closeBtn = document.getElementById("close-modal-btn");
const modalContent = document.getElementById("modal-content");
const form = document.getElementById("car-form");
const successMessage = document.getElementById("success-message");
const fieldsError = document.getElementById("fieldsError");

const accessToken = localStorage.getItem("access");

window.addEventListener("DOMContentLoaded", () => {
  if (!accessToken) {
    window.location.href = "/login";
  } else {
    accessProtectedData();
  }
});

async function accessProtectedData() {
  try {
    const res = await api.get("/vehicules/");
    console.log("Données admin :", res.data);
    populateTable(res.data);
  } catch (err) {
    console.error(
      "Erreur d'accès à /vehicules :",
      err.response?.data || err.message
    );

    if (err.response && err.response.status === 401) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
    }
  }
}

function populateTable(vehicules) {
  const tableBody = document.getElementById("voitures-list");
  tableBody.innerHTML = " ";

  vehicules.forEach((voiture) => {
    const tr = document.createElement("tr");
    tr.classList.add("border-b", "text-sm");

    tr.innerHTML = `
          <td class="p-4"><img src="data:image/jpeg;base64,${voiture.images?.[0]?.image_base64 || "#"
      }" alt="Image voiture" class="w-20 h-14 object-cover rounded-md"></td>
          <td class="p-4">${voiture.modele || "N/A"}</td>
          <td class="p-4">${voiture.annee || "N/A"}</td>
          <td class="p-4">${voiture.cylindres || "N/A"}</td>
          <td class="p-4">${voiture.transmission || "N/A"}</td>
          <td class="p-4">${voiture.carburant || "N/A"}</td>
          <td class="p-4">${voiture.kilometrage || "N/A"} km</td>
          <td class="p-4">${voiture.prix ? voiture.prix + " USD" : "N/A"}</td>
          <td class="p-4 space-x-2">
              <button class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-xs" onclick="afficherVoiture('${voiture.id
      }')">Afficher</button>
             
              <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-xs" onclick="supprimerVoiture('${voiture.id
      }','${voiture.modele}', '${voiture.marque}')">Supprimer</button>
          </td>
      `;

    tableBody.appendChild(tr);
  });
}

document.getElementById('logout-button').addEventListener("click", () => {
  localStorage.removeItem("access");
  window.location.href = "/login";
})

openBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
  setTimeout(() => {
    modalContent.classList.remove("scale-95", "opacity-0");
    modalContent.classList.add("scale-100", "opacity-100");
  }, 10);
});

function closeModal() {
  modalContent.classList.remove("scale-100", "opacity-100");
  modalContent.classList.add("scale-95", "opacity-0");
  document.body.classList.remove("overflow-hidden");
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 200);
}

closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});



async function submitForm(event) {
  event.preventDefault();

  const form = document.getElementById("car-form");
  const formData = new FormData(form);

  const equipements = document.querySelectorAll('input[name="equipement[]"]');
  equipements.forEach((el) => {
    if (el.value.trim() !== "") {
      formData.append("equipements", el.value);
    }
  });

  const images = document.querySelectorAll('input[name="images[]"]');

  // Fonction pour convertir PNG/JPG en JPEG (blob)
  async function convertImageToJPEG(file) {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = function (e) {
        img.onload = function () {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name.replace(/\.(png|jpg)$/, ".jpeg"), { type: "image/jpeg" }));
          }, "image/jpeg", 0.9);
        };
        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    });
  }

  for (const input of images) {
    if (input.files.length > 0) {
      const file = input.files[0];
      const ext = file.name.split('.').pop().toLowerCase();

      if (["png", "jpg"].includes(ext)) {
        const jpegFile = await convertImageToJPEG(file);
        formData.append("images_files", jpegFile);
      } else {
        formData.append("images_files", file);
      }
    }
  }

  try {
    const response = await fetch("https://api.jsdgrandslacs.org/vehicules/", {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json"
      },
      body: formData
    });

    const data = await response.json();
    if (response.ok) {
      setTimeout(() => {
        document.getElementById("success-message").classList.add("hidden");
        if (typeof closeModal === "function") closeModal();
      }, 2000);
      form.reset();
      location.reload()
      console.log(data);
    } else {
      console.log(response.status);
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    console.error("Erreur lors de l'envoi :", error.response?.data || error.message);
    alert("Une erreur est survenue lors de l'envoi du formulaire.");
  }
}


function addEquipmentField() {
  const container = document.getElementById("equipment-container");
  const newField = document.createElement("div");
  newField.classList.add("flex", "items-center", "mb-4");
  newField.innerHTML = `
  <input type="text" name="equipement[]" class="p-2 border border-gray-300 rounded-md mr-2 w-full" placeholder="Nom de l'équipement">
  <button type="button" class="bg-red-500 text-white px-4 py-2 rounded-md" onclick="removeField(this)">Supprimer</button>
    `;
  container.appendChild(newField);
}

function removeField(button) {
  const field = button.parentElement;
  const container = field.parentElement;

  if (container.children.length > 1) {
    field.remove();
  } else {
    fieldsError.textContent = "Vous ne pouvez pas supprimer le dernier champ.";
    setTimeout(() => {
      fieldsError.textContent = " ";
    }, 2000);
  }
}

function addImageField() {
  const container = document.getElementById("image-container");
  const newField = document.createElement("div");
  newField.classList.add("my-1", "flex", "items-center", "mb-4");
  newField.innerHTML = `
    <input type="file" name="images[]" accept="image/*" class="p-2 border border-gray-300 rounded-md w-full">
    `;
  container.appendChild(newField);
}


function afficherModalSuppression(modele, marque) {
  // Crée le HTML du modal
  const modalHtml = `
    <div id="suppressionModal" style="
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex; align-items: center; justify-content: center;
      z-index: 9999;
    ">
      <div style="
        background: white;
        padding: 20px 30px;
        border-radius: 8px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
      ">
        <h3>Suppression réussie</h3>
        <p>La voiture <strong>${marque} ${modele}</strong> a été supprimée avec succès.</p>
        <button id="btnOkSuppression" style="
          margin-top: 15px;
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        ">OK</button>
      </div>
    </div>
  `;

  // Injecte dans le body
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Ajoute l'événement au bouton OK
  document.getElementById("btnOkSuppression").onclick = function () {
    document.getElementById("suppressionModal").remove();
    location.reload(); // Recharge la page
  };
}


window.removeField = removeField;
window.addEquipmentField = addEquipmentField;
window.addImageField = addImageField;
window.submitForm = submitForm;

window.afficherVoiture = async function (id) {
  console.log(id);
  try {
    if (!document.getElementById("view-modal")) {
      document.body.insertAdjacentHTML("beforeend", viewModalTemplate);
    }

    const viewModal = document.getElementById("view-modal");
    const modalBody = document.getElementById("view-modal-body");
    const closeViewBtn = document.getElementById("close-view-modal");

    const res = await api.get(`/vehicules/${id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const voiture = res.data;

    modalBody.innerHTML = `
      <div><strong>Modèle :</strong> ${voiture.modele || "N/A"}</div>
      <div><strong>Marque :</strong> ${voiture.marque || "N/A"}</div>
      <div><strong>Kilométrage :</strong> ${voiture.kilometrage || "N/A"
      } km</div>
      <div><strong>Prix :</strong> <span class="text-xl text-blue-900 font-bold" > ${voiture.prix ? voiture.prix + " USD" : "N/A"
      }<span></div>
      <div class="text-sm/6 font-semibold text-gray-900 mb-5"> ${voiture.modele || "N/A"} de couleur ${voiture.couleur || "N/A"}, année de fabrication : ${voiture.annee || "N/A"}, cylindres : ${voiture.cylindres || "N/A"}, ${voiture.carburant || "N/A"}, ${voiture.equipements || "N/A"}, ${voiture.pilotage || "N/A"}, transmission : ${voiture.pilotage || "N/A"} </div>
      <div class="grid grid-cols-2 gap-2 mt-2">
        ${voiture.images
        ?.map(
          (img) => `
            <img src="data:image/jpeg;base64,${img.image_base64}" alt="image voiture" class="w-full h-32 object-cover rounded-md">
          `
        )
        .join("") || ""
      }
      </div>
    `;

    viewModal.classList.remove("hidden");
    closeViewBtn.addEventListener("click", () => {
      viewModal.classList.add("hidden");
    });

    viewModal.addEventListener("click", (e) => {
      if (e.target === viewModal) {
        viewModal.classList.add("hidden");
      }
    });
  } catch (err) {
    console.error(
      "Erreur lors de l'affichage :",
      err.response?.data || err.message
    );
    alert("Impossible de charger les détails du véhicule.");
  }
};


window.supprimerVoiture = async function (id, modele, marque) {
  console.log(id);
  try {

    const res = await api.delete(`/vehicules/${id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Voiture supprimée avec succès :", modele);
    afficherModalSuppression(modele, marque);

    // Vous pouvez rafraîchir la liste ou rediriger l'utilisateur après suppression

  } catch (err) {

    console.error(
      "Erreur lors de la suppression :",
      err.response?.data || err.message
    );

    alert("Échec de la suppression du véhicule.");
  }
};



