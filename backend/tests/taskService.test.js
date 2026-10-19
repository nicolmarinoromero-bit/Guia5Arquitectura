const test = require("node:test");
const assert = require("node:assert/strict");
const { TaskService } = require("../src/application/services/TaskService");
const { InMemoryTaskRepository } = require("../src/infrastructure/persistence/InMemoryTaskRepository");

function makeService() {
  return new TaskService(new InMemoryTaskRepository());
}

test("lista las tareas iniciales", () => {
  assert.equal(makeService().listTasks().length, 2);
});

test("crea una tarea con título normalizado", () => {
  const task = makeService().createTask({ title: "  Escribir pruebas  ", description: "  Unitarias  " });
  assert.equal(task.title, "Escribir pruebas");
  assert.equal(task.description, "Unitarias");
  assert.equal(task.status, "pendiente");
});

test("rechaza títulos demasiado cortos", () => {
  assert.throws(() => makeService().createTask({ title: "ab" }), { statusCode: 400 });
});

test("cambia el estado y rechaza estados inválidos", () => {
  const service = makeService();
  assert.equal(service.changeStatus(1, "finalizada").status, "finalizada");
  assert.throws(() => service.changeStatus(1, "bloqueada"), { statusCode: 400 });
});

test("responde con error 404 para una tarea inexistente", () => {
  assert.throws(() => makeService().changeStatus(999, "finalizada"), { statusCode: 404 });
});
