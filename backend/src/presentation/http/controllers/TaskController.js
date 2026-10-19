function createTaskController(taskService) {
  return {
    list(req, res, next) {
      try {
        res.json(taskService.listTasks());
      } catch (error) {
        next(error);
      }
    },
    create(req, res, next) {
      try {
        res.status(201).json(taskService.createTask(req.body || {}));
      } catch (error) {
        next(error);
      }
    },
    updateStatus(req, res, next) {
      try {
        res.json(taskService.changeStatus(req.params.id, req.body?.status));
      } catch (error) {
        next(error);
      }
    }
  };
}

module.exports = { createTaskController };
