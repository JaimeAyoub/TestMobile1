// app.js — ENTRY POINT
// Connects the data layer (taskStore.js) with the presentation layer (taskUI.js).
 
import { getTasks, addTask, toggleTask, deleteTask,subscribeToTasks } from "./taskStore.js";
import { renderTasks, getFormInput } from "./taskUI.js";

 
const form = document.getElementById("taskForm");
let currentUserId = null;

console.log(auth);
 
// Re-renders the whole list every time something changes
function refresh(tasks) {
  renderTasks(tasks, {
    onToggle: (task) => toggleTask(currentUserId, task.id, task.completed),
    onDelete: (id) => deleteTask(currentUserId, id)

  });

}
 
auth.onAuthStateChanged((user) => {
  if (user) {
    currentUserId = user.uid;
    subscribeToTasks(user.uid, refresh);
    showStatus(`Logged in as: ${user.email}`);
  } else {
    currentUserId = null;
      showStatus(`Not logged in.`);
    refresh([]);
  }

  console.log(typeof showStatus);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!currentUserId) {
    alert("Debes iniciar sesión para agregar tareas.");
    return;
  }

  const input = getFormInput();
  const text = input.value.trim();
  if (!text) return;

  addTask(text, currentUserId);
  input.value = "";
  input.focus();
});
 