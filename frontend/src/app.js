const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const taskList = document.querySelector("#task-list");
const message = document.querySelector("#message");
const apiStatus = document.querySelector("#api-status");

async function loadTasks() {
  try {
    const tasks = await window.taskApi.list();
    window.taskView.renderTasks(taskList, tasks);
    window.taskView.setApiStatus(apiStatus, true);
  } catch (error) {
    window.taskView.setApiStatus(apiStatus, false);
    window.taskView.renderError(taskList, `${error.message}. Verifica que el backend esté iniciado.`);
  }
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  message.textContent = "";
  try {
    await window.taskApi.create({ title: titleInput.value, description: descriptionInput.value });
    form.reset();
    window.taskView.showMessage(message, "Tarea creada correctamente.", true);
    await loadTasks();
  } catch (error) {
    window.taskView.showMessage(message, error.message);
  }
});

document.querySelector("#refresh").addEventListener("click", loadTasks);

taskList.addEventListener("click", async event => {
  const button = event.target.closest("[data-save-id]");
  if (!button) return;
  const id = button.dataset.saveId;
  const select = taskList.querySelector(`[data-task-id="${id}"]`);
  try {
    await window.taskApi.updateStatus(id, select.value);
    await loadTasks();
  } catch (error) {
    window.taskView.showMessage(message, error.message);
  }
});

loadTasks();
