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
app.listen(port, () => console.log("API en puerto " + port));
