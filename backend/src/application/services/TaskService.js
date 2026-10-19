const { AppError } = require("../errors/AppError");

const VALID_STATUSES = ["pendiente", "en progreso", "finalizada"];

class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  listTasks() {
    return this.taskRepository.findAll();
  }

  createTask({ title, description = "" }) {
    if (typeof title !== "string" || title.trim().length < 3) {
      throw new AppError("El título debe tener al menos 3 caracteres.");
    }
    if (typeof description !== "string") {
      throw new AppError("La descripción debe ser texto.");
    }
    return this.taskRepository.create({
      title: title.trim(),
      description: description.trim(),
      status: "pendiente"
    });
  }

  changeStatus(id, status) {
    if (!VALID_STATUSES.includes(status)) {
      throw new AppError(`Estado inválido. Use: ${VALID_STATUSES.join(", ")}.`);
    }
    const task = this.taskRepository.updateStatus(id, status);
    if (!task) {
      throw new AppError("No existe una tarea con ese identificador.", 404);
    }
    return task;
  }
}

module.exports = { TaskService, VALID_STATUSES };
