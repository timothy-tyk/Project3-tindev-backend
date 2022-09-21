const express = require("express");
const cors = require("cors");

const { auth } = require("express-oauth2-jwt-bearer");
//import controllers
const UserController = require("./controllers/userController");
const QuestionController = require("./controllers/questionController");
const LobbyController = require("./controllers/lobbyController");
const ReviewController = require("./controllers/reviewController");
const MessageController = require("./controllers/messageController");
//import routers
const UserRouter = require("./routers/userRouter");
const QuestionRouter = require("./routers/questionRouter");
const LobbyRouter = require("./routers/lobbyRouter");
const MessageRouter = require("./routers/messageRouter");
const ReviewRouter = require("./routers/reviewRouter");
const PORT = 3000;
const app = express();
const http = require("http").Server(app);

// importing DB
const db = require("./db/models/index");
const { user, lobby, users_lobbies, question, message, review } = db;

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER,
});
//initializing controllers
const userController = new UserController(user, lobby, users_lobbies);
const lobbyController = new LobbyController(
  lobby,
  user,
  users_lobbies,
  question,
  review
);
const questionController = new QuestionController(question, user);
const reviewController = new ReviewController(review, user);
const messageController = new MessageController(message, user);
//initializing routers
const userRouter = new UserRouter(userController, checkJwt).routes();
const lobbyRouter = new LobbyRouter(lobbyController, checkJwt).routes();
const questionRouter = new QuestionRouter(
  questionController,
  checkJwt
).routes();
const reviewRouter = new ReviewRouter(reviewController, checkJwt).routes();
const messageRouter = new MessageRouter(messageController, checkJwt).routes();

// Enable CORS access to this server
app.use(cors());
app.use(express.json());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

socketIO.on("connection", (socket) => {
  //once backend receives a "join_room" message, then join (data.room), i.e. lobbyId
  socket.on("join_room", (data) => {
    socket.join(data.room);
  });
  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("received_message", data);
  });
  socket.on("join_question", (data) => {
    socket.join(data.question);
  });
  socket.on("send_question_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("received_question_message", data);
  });

  socket.on("reply", () => console.log("replied"));
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.use("/users", userRouter);
app.use("/lobbies", lobbyRouter);
app.use("/question", questionRouter);
app.use("/review", reviewRouter);
app.use("/message", messageRouter);

http.listen(PORT, () => {
  console.log(`Http listening on ${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`Express app listening on port ${PORT}!`);
// });
