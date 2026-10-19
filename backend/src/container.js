const { TaskService } = require("./application/services/TaskService");
const { InMemoryTaskRepository } = require("./infrastructure/persistence/InMemoryTaskRepository");
const { createApp } = require("./presentation/http/createApp");

function createApplication({ repository = new InMemoryTaskRepository() } = {}) {
  const taskService = new TaskService(repository);
  return createApp(taskService);
}

module.exports = { createApplication };
