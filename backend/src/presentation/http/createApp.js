const express = require("express");
const cors = require("cors");
const { createTaskController } = require("./controllers/TaskController");
const { createTaskRoutes } = require("./routes/taskRoutes");

function createApp(taskService) {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.get("/api/health", (req, res) => res.json({ status: "ok" }));
  app.use("/api/tasks", createTaskRoutes(createTaskController(taskService)));
  app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      error: statusCode === 500 ? "Error interno del servidor" : error.message
    });
  });
  return app;
}

module.exports = { createApp };
