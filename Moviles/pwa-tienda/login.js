import { auth } from "./firebase-config.js";

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const statusMsg = document.getElementById("statusMsg");

// Función auxiliar para mostrar errores
const showError = (message) => {
  statusMsg.textContent = "⚠ " + message;
};

// Crear Cuenta
document.getElementById("signUpBtn").addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) return showError("Completa todos los campos");

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      // Si usas onboarding, déjalo así, o cambialo a index.html
      window.location.href = "onboarding.html";
    })
    .catch((error) => {
      showError(error.message);
    });
});

// Iniciar Sesión
document.getElementById("logInBtn").addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) return showError("Completa todos los campos");

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "index.html"; // Redirige a la tienda
    })
    .catch((error) => {
      showError("Credenciales incorrectas o usuario no encontrado.");
    });
});