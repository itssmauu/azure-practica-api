const appInsights = require("applicationinsights");
appInsights.setup().setAutoCollectConsole(true).start();
const express = require("express");
const cors = require("cors");
const app = express();
const origin = process.env.ALLOWED_ORIGIN || "*";
app.use(cors({ origin }));

app.get("/", (req, res) => res.send("API funcionando"));
app.get("/health", (req, res) => res.status(200).send("ok"));
app.get("/api/hello", (req, res) =>
  res.json({ message: "Hola desde Azure", env: process.env.APP_ENV || "sin definir" })
);

const port = process.env.PORT || 8080;
app.get("/api/error", (req, res) => {
  throw new Error("Fallo simulado para practicar");
});

app.use((err, req, res, next) => {
  console.error("Error en " + req.path + ": " + err.message);
  const client = appInsights.defaultClient;
  if (client) {
    client.trackException({ exception: err, properties: { route: req.path } });
    client.flush();
  }
  res.status(500).json({ error: "Error interno" });
});
app.listen(port, () => console.log("API en puerto " + port));
