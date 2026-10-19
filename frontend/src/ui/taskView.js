(() => {
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));

  function renderTasks(taskList, tasks) {
    if (!tasks.length) {
      taskList.innerHTML = "<p>No hay tareas todavía. Crea la primera.</p>";
      return;
    }
    taskList.innerHTML = tasks.map(task => `
      <article class="task">
        <div class="task-top">
          <div>
            <h3>${escapeHtml(task.title)}</h3>
            <p>${escapeHtml(task.description || "Sin descripción")}</p>
          </div>
          <strong>#${task.id}</strong>
        </div>
        <div class="task-actions">
          <label for="status-${task.id}">Estado</label>
          <select id="status-${task.id}" data-task-id="${task.id}">
            ${["pendiente", "en progreso", "finalizada"].map(status =>
              `<option ${task.status === status ? "selected" : ""}>${status}</option>`).join("")}
          </select>
          <button type="button" class="secondary" data-save-id="${task.id}">Guardar estado</button>
        </div>
      </article>
    `).join("");
  }

  function renderError(taskList, message) {
    taskList.innerHTML = `<p>${escapeHtml(message)}</p>`;
  }

  function setApiStatus(element, connected) {
    element.textContent = connected ? "API conectada" : "API no disponible";
    element.style.background = connected ? "" : "#fde8e8";
    element.style.color = connected ? "" : "#9b2222";
  }

  function showMessage(element, text, success = false) {
    element.style.color = success ? "#17663a" : "#a12b2b";
    element.textContent = text;
  }

  window.taskView = { renderTasks, renderError, setApiStatus, showMessage };
})();
