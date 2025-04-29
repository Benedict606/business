export const modeles = ["Toyota Corolla", "Honda Civic", "Ford Fiesta"];
export const transmissions = ["Manuelle", "Automatique"];
export const carburants = ["Essence", "Diesel", "Hybride", "Électrique"];


export const modalTemplate = `
<div id="action-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
  <div class="bg-white w-full max-w-xl p-6 rounded-xl shadow-lg relative">
    <h2 id="modal-title" class="text-xl font-semibold mb-4"></h2>
    <div id="modal-body" class="space-y-2 text-sm text-gray-700"></div>
    <div class="mt-6 flex justify-end space-x-2">
      <button id="modal-cancel-btn" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Annuler</button>
      <button id="modal-confirm-btn" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hidden">Confirmer</button>
    </div>
  </div>
</div>
`;

export const viewModalTemplate = `
<div id="view-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
  <div class="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg relative">
    <h2 class="text-2xl font-semibold mb-4">Détails de la voiture</h2>
    <div id="view-modal-body" class="space-y-2 text-sm text-gray-700"></div>
    <div class="mt-6 flex justify-end">
      <button id="close-view-modal" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Fermer</button>
    </div>
  </div>
</div>
`;

export const deleteModalTemplate = `
<div id="delete-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
  <div class="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg relative">
    <h2 class="text-xl font-semibold mb-4 text-red-600">Confirmation de suppression</h2>
    <p id="delete-modal-body" class="text-gray-700 mb-6 text-sm"></p>
    <div class="flex justify-end space-x-3">
      <button id="cancel-delete-btn" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Annuler</button>
      <button id="confirm-delete-btn" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Supprimer</button>
    </div>
  </div>
</div>
`;

export const editModalTemplate = `
<div id="edit-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
  <div class="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg relative">
    <h2 class="text-2xl font-semibold mb-4">Modifier la voiture</h2>
    <form id="edit-car-form" class="space-y-4">
      <input type="hidden" id="edit-car-id">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Modèle</label>
          <input type="text" id="edit-modele" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Année</label>
          <input type="number" id="edit-annee" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Cylindres</label>
          <input type="text" id="edit-cylindres" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Transmission</label>
          <input type="text" id="edit-transmission" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Carburant</label>
          <input type="text" id="edit-carburant" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Kilométrage</label>
          <input type="number" id="edit-kilometrage" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div class="col-span-2">
          <label class="block text-sm font-medium text-gray-700">Prix</label>
          <input type="number" id="edit-prix" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
      </div>
      <div class="mt-6 flex justify-end space-x-2">
        <button type="button" id="cancel-edit-btn" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Annuler</button>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Enregistrer</button>
      </div>
    </form>
  </div>
</div>
`;
