const { TaskRepository } = require("../../application/ports/TaskRepository");
const { Task } = require("../../domain/entities/Task");

const initialTasks = [
  { id: 1, title: "Analizar el proyecto base", description: "Identificar responsabilidades", status: "en progreso" },
  { id: 2, title: "Diseñar la arquitectura", description: "Proponer módulos", status: "pendiente" }
];

class InMemoryTaskRepository extends TaskRepository {
  constructor(seedTasks = initialTasks) {
    super();
    this.tasks = seedTasks.map(task => new Task(task));
    this.nextId = this.tasks.reduce((next, task) => Math.max(next, task.id + 1), 1);
  }

  findAll() {
    return [...this.tasks];
  }

  create(data) {
    const task = new Task({ ...data, id: this.nextId++ });
    this.tasks.push(task);
    return task;
  }

  findById(id) {
    const numericId = Number(id);
    return this.tasks.find(task => task.id === numericId) || null;
  }

  updateStatus(id, status) {
    const task = this.findById(id);
    if (!task) return null;
    task.status = status;
    return task;
  }
}

module.exports = { InMemoryTaskRepository };
