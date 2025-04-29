import api from "../utils/axios.js";

const loginError = document.getElementById("loginError");

const accessToken = localStorage.getItem("access");

if (accessToken) {
  window.location.href = "/admin/";
}


document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await api.post("/auth/login/", {
        username,
        password,
      });

      const { access, refresh } = response.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      await accessProtectedData();
      window.location.href = "/admin/";
    } catch (err) {
      loginError.textContent = err.response?.data.detail;
      setTimeout(() => {
        loginError.textContent = " ";
      }, 4000);
    }
  });

async function accessProtectedData() {
  try {
    const res = await api.get("/vehicules/");
    console.log("Données admin :", res.data);
  } catch (err) {
    loginError.textContent = "Erreur d'accès à la page admin";
    setTimeout(() => {
      loginError.textContent = " ";
    }, 3000);
    console.error(
      "Erreur d'accès à /admin :",
      err.response?.data || err.message
    );
  }
}
