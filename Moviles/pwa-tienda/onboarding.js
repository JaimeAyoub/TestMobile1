import { db, auth } from "./firebase-config.js";

const nameInput = document.getElementById("nameInput");
const saveBtn = document.getElementById("saveProfileBtn");
const statusMsg = document.getElementById("statusMsg");

// Proteger la ruta: si por error entran aquí sin sesión, los regresamos
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

saveBtn.addEventListener("click", () => {
  const user = auth.currentUser;
  const displayName = nameInput.value.trim();

  // Verificamos que Firebase ya haya cargado el usuario
  if (!user) {
    statusMsg.textContent = "⚠ Esperando conexión segura...";
    return;
  }

  // Validación de nombre vacío
  if (!displayName) {
    statusMsg.textContent = "⚠ Escribe un nombre antes de continuar";
    return;
  }

  statusMsg.style.color = "var(--accent-gold)";
  statusMsg.textContent = "Sellando registro...";

  // Guardamos en la base de datos
  db.ref("users/" + user.uid).update({
    displayName: displayName
  }).then(() => {
    window.location.href = "index.html"; // Redirigimos a la tienda
  }).catch((error) => {
    statusMsg.style.color = "var(--accent-red)";
    statusMsg.textContent = "⚠ Error al guardar: " + error.message;
    console.error(error);
  });
});