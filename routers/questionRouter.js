const express = require("express");
const router = express.Router();

class QuestionRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll);
    router.get("/:questionIndex", this.controller.getOne);
    router.post("/", this.controller.addOne);
    router.put("/editQuestion", this.controller.updateOne);
    router.put("/updateMentor", this.controller.updateOneMentor);
    router.put("/updateStatus", this.controller.updateOneStatus);
    router.get("/users/:userId", this.controller.getAllFromUser);
    return router;
  }
}

module.exports = QuestionRouter;
