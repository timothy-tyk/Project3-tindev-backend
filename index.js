const express = require("express");
const cors = require("cors");

const { auth } = require("express-oauth2-jwt-bearer");
//import controllers
const UserController = require("./controllers/userController");
const QuestionController = require("./controllers/questionController");
//import routers
const UserRouter = require("./routers/userRouter");
const QuestionRouter = require("./routers/questionRouter");

const PORT = 3000;
const app = express();

// importing DB
const db = require("./db/models/index");
const { user, question } = db;

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER,
});
//initializing controllers
const userController = new UserController(user);
const questionController = new QuestionController(question);
//initializing routers
const userRouter = new UserRouter(userController, checkJwt).routes();
const questionRouter = new QuestionRouter(questionController).routes();
// Enable CORS access to this server
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/question", questionRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
