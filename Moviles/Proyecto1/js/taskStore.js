// Esta sección (módulo) es la que se va a encargar de almacenar los datos de las tareas y de los usuarios.
// CONCEPTOS IMPORTANTES:
// localStorage: Es un objeto que nos permite almacenar datos en el navegador del usuario.
// Los datos se almacenan en forma de pares clave-valor y persisten incluso después de cerrar el navegador.

const STORAGE_KEY = "app-task"
let currentRef = null;

export function getTasks() {

    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? JSON.parse(raw) : [];
}

function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function subscribeToTasks(userID, callback) {
if (currentRef) currentRef.off(); 

currentRef = db.ref("tasks/" + userID);

currentRef.on("value", (snapshot) => {
   const data = snapshot.val()  || {};
   const tasks = Object.entries(data).map(([id, task]) => ({ id, ...task }));
   callback(tasks);
  });

}
export function addTask(text, userID) {

    return db.ref("tasks/" + userID).push({ 
        text, completed: false });
}
export function toggleTask(userID,id,currentCompleted) {
  return db.ref("tasks/" + userID + "/" + id).update({ completed: !currentCompleted });
}

export function deleteTask(userId, id) {
  return db.ref(`tasks/${userId}/${id}`).remove();
}
