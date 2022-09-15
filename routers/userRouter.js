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
    router.post("/", this.auth, this.controller.insertOne);

    return router;
  }
}

module.exports = UserRouter;
