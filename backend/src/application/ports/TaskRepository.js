class TaskRepository {
  findAll() { throw new Error("findAll debe implementarse en el repositorio concreto."); }
  create() { throw new Error("create debe implementarse en el repositorio concreto."); }
  findById() { throw new Error("findById debe implementarse en el repositorio concreto."); }
  updateStatus() { throw new Error("updateStatus debe implementarse en el repositorio concreto."); }
}

module.exports = { TaskRepository };
