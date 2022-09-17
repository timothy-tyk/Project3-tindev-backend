const { sequelize } = require("../db/models");
const BaseController = require("./baseController");

class UserController extends BaseController {
  constructor(model, usersLobbiesModel) {
    super(model);
    this.usersLobbiesModel = usersLobbiesModel;
  }
  getOne = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    try {
      const user = await this.model.findByPk(userId);
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  insertOne = async (req, res) => {
    const { username, email, profilepicture, bio } = req.body;
    console.log("here");
    try {
      const [user, created] = await this.model.findOrCreate({
        where: { email: email },
        defaults: {
          username: username,
          profilepicture: profilepicture,
          bio: null,
          tokens: 50,
          online: true,
        },
      });
      if (created) {
        console.log("inserted");
        console.log(user);
        return res.json(user);
      }
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  updateOne = async (req, res) => {
    console.log("updateone");
    const { userId, profilepicture, username, bio } = req.body;
    console.log(req.body);
    try {
      const userData = await this.model.findByPk(userId);
      console.log(userData);
      userData.update({
        profilepicture: profilepicture,
        username: username,
        bio: bio,
      });
      console.log(userData);
      return res.json(userData);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getLobbies = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    try {
      const lobbies = this.usersLobbiesModel.findAll();
      return res.json(lobbies);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  joinLobby = async (req, res) => {
    const { userId, lobbyId } = req.params;
    let { prevLobbies } = req.body;
    console.log(userId, lobbyId, prevLobbies);
    if (!prevLobbies) {
      prevLobbies = [];
    }
    try {
      const user = await this.model.findByPk(userId);
      await user.update({ lobbiesJoin: [...prevLobbies, lobbyId] });
      const addLobby = await this.usersLobbiesModel.create({
        userId: userId,
        lobbyId: lobbyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await user.save();
      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = UserController;
