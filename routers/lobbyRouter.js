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
    router.get(
      "/:lobbyId/mentor/:userId",
      this.controller.getUserAsMentorStats
    );
    router.get(
      "/:lobbyId/mentee/:userId",
      this.controller.getUserAsMenteeStats
    );

    router.get("/:lobbyId/questions", this.controller.getQuestions);
    router.get(
      "/:lobbyId/:lobbyName/numberOnline",
      this.controller.getNumberOnline
    );
    router.put("/:lobbyId/:userId", this.controller.updateLocation);

    // router.post("/", this.auth, this.controller.insertOne);
    // router.put("/", this.controller.updateOne);
    return router;
  }
}

module.exports = LobbyRouter;
