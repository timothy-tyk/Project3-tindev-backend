const express = require("express");
const router = express.Router();

class LobbyRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll);
    router.get("/:lobbyId", this.controller.getOne);
    // router.post("/", this.auth, this.controller.insertOne);
    // router.put("/", this.controller.updateOne);
    return router;
  }
}

module.exports = LobbyRouter;
