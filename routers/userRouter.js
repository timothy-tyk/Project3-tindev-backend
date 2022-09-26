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
    router.get("/:userId/lobbies", this.controller.getUserLobbies);
    router.post("/:userId/joinlobby/:lobbyId", this.controller.joinLobby);
    // router.get("/:userId/friends", this.controller.getUserFriends);
    router.post("/:profileId/add", this.controller.addFriend);
    router.put("/:userId/updateLocation", this.controller.updateLocation);
    return router;
  }
}

module.exports = UserRouter;
