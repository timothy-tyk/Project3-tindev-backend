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
    router.put("/", this.controller.updateOne);
    return router;
  }
}

module.exports = QuestionRouter;
