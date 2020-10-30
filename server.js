const express = require("express");
const morgan = require("morgan");
const actionRouter = require("./api/actionRouter");
const projectRouter = require("./api/projectRouter");

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

module.exports = server;
