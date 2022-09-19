const express = require("express");
const cors = require("cors");

const { auth } = require("express-oauth2-jwt-bearer");
//import controllers
const UserController = require("./controllers/userController");
const LobbyController = require("./controllers/lobbyController");
const QuestionController = require("./controllers/questionController");
//import routers
const UserRouter = require("./routers/userRouter");
const LobbyRouter = require("./routers/lobbyRouter");
const QuestionRouter = require("./routers/questionRouter");

const PORT = 3000;
const app = express();

// importing DB
const db = require("./db/models/index");
const { user, lobby, users_lobbies, question } = db;

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER,
});
//initializing controllers
const userController = new UserController(user, lobby, users_lobbies, question);
const lobbyController = new LobbyController(lobby, question);
const questionController = new QuestionController(question);
//initializing routers
const userRouter = new UserRouter(userController, checkJwt).routes();
const lobbyRouter = new LobbyRouter(lobbyController, checkJwt).routes();
const questionRouter = new QuestionRouter(
  questionController,
  checkJwt
).routes();

// Enable CORS access to this server
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/lobbies", lobbyRouter);
app.use("/questions", questionRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
