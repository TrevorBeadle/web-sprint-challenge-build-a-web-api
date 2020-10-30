const express = require("express");
const morgan = require("morgan");
const actionRouter = require("./api/actionRouter");

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use("/api/actions", actionRouter);

server.get("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

module.exports = server;
