// Esta sección (módulo) es la que se va a encargar de almacenar los datos de las tareas y de los usuarios.
// CONCEPTOS IMPORTANTES:
// localStorage: Es un objeto que nos permite almacenar datos en el navegador del usuario.
// Los datos se almacenan en forma de pares clave-valor y persisten incluso después de cerrar el navegador.

const STORAGE_KEY = "app-task"

export function getTasks() {

    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? JSON.parse(raw) : [];
}

function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(text) {
    const tasks = getTasks();

    const newTask = {
        id: Date.now().toString(),
        text,
        completed: false
    };

    tasks.push(newTask);
    saveTasks(tasks);
    return tasks;
}
export function toggleTask(id) {
    const tasks = getTasks().map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks(tasks);
  return tasks;
}

export function deleteTask(id) {
    const tasks = getTasks().filter(task => task.id !== id);
    saveTasks(tasks);
    return tasks;
}

