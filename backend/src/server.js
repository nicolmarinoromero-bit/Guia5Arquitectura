const { createApplication } = require("./container");

function startServer(port = process.env.PORT || 3000) {
  const app = createApplication();
  return app.listen(port, () => console.log(`API lista en http://localhost:${port}`));
}

if (require.main === module) {
  startServer();
}

module.exports = { startServer };
