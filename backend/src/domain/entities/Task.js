class Task {
  constructor({ id, title, description = "", status = "pendiente", createdAt = new Date().toISOString() }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
  }
}

module.exports = { Task };
