const express = require("express");
const router = express.Router();

class LobbyRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }
  routes() {
    router.get("/", this.controller.getAll);
    router.get("/:lobbyId", this.controller.getOne);
    router.put("/:lobbyId/:userId", this.controller.updateLocation);
    router.get(
      "/:lobbyId/:lobbyName/numberOnline",
      this.controller.getNumberOnline
    );
    router.get("/:lobbyId/questions", this.controller.getQuestions);
    router.get(
      "/:lobbyId/mentor/:userId",
      this.controller.getUserAsMentorStats
    );
    router.get(
      "/:lobbyId/mentee/:userId",
      this.controller.getUserAsMenteeStats
    );
    router.put("/logout", this.controller.updateUserLocationOnLogOut);

    //general chat
    // router.get("/:lobbyId/chat", this.controller.getChatLog);
    router.post("/:lobbyId/chat", this.controller.addChatMessage);
    return router;
  }
}

module.exports = LobbyRouter;

// router.get("/", this.controller.getAll);
// router.get("/:lobbyId", this.controller.getOne);
// router.put("/:lobbyId/:userId", this.controller.updateLocation);
// router.get("/:lobbyId/:lobbyName/numberOnline",this.controller.getNumberOnline);
// router.get("/:lobbyId/questions", this.controller.getQuestions);
// router.get("/:lobbyId/mentor/:userId",this.controller.getUserAsMentorStats);
// router.get("/:lobbyId/mentee/:userId",this.controller.getUserAsMenteeStats);
