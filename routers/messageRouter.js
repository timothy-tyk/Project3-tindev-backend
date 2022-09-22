const express = require("express");
const router = express.Router();

class MessageRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll);
    router.get("/:questionId", this.controller.getAllFromQuestion);
    router.post("/:questionId", this.controller.addOne);

    return router;
  }
}

module.exports = MessageRouter;
