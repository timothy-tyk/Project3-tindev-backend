const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll);
    router.get("/:userId", this.controller.getOne);
    router.post("/", this.auth, this.controller.insertOne);
    router.put("/", this.controller.updateOne);
    router.get("/:userId/lobbies", this.controller.getLobbies);
    router.post("/:userId/joinlobby/:lobbyId", this.controller.joinLobby);
    return router;
  }
}

module.exports = UserRouter;
