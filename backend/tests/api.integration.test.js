const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const { createApplication } = require("../src/container");

function request(server, method, path, body) {
  const address = server.address();
  const payload = body === undefined ? null : Buffer.from(JSON.stringify(body));
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: "127.0.0.1",
      port: address.port,
      path,
      method,
      headers: payload ? { "Content-Type": "application/json", "Content-Length": payload.length } : {}
    }, res => {
      let data = "";
      res.setEncoding("utf8");
      res.on("data", chunk => { data += chunk; });
      res.on("end", () => resolve({ status: res.statusCode, body: JSON.parse(data) }));
    });
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

test("la API crea tareas y las devuelve en el listado", async () => {
  const server = createApplication().listen(0);
  await new Promise(resolve => server.once("listening", resolve));
  try {
    const created = await request(server, "POST", "/api/tasks", { title: "Validar API" });
    assert.equal(created.status, 201);
    const listed = await request(server, "GET", "/api/tasks");
    assert.equal(listed.status, 200);
    assert.ok(listed.body.some(task => task.id === created.body.id));
  } finally {
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});
