const BaseController = require("./baseController");

class LobbyController extends BaseController {
  constructor(model, userModel, usersLobbiesModel, questionModel) {
    super(model);
    this.userModel = userModel;
    this.usersLobbiesModel = usersLobbiesModel;
    this.questionModel = questionModel;
  }
  getOne = async (req, res) => {
    const { lobbyId } = req.params;
    console.log(lobbyId);
    try {
      const output = await this.model.findByPk(lobbyId, {
        include: this.questionModel,
        where: { lobbyId: lobbyId },
      });

      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getQuestions = async (req, res) => {
    const { lobbyId } = req.params;
    console.log(lobbyId);
    try {
      const questions = await this.questionModel.findAll({
        include: [{ model: this.userModel, as: "menteeIdAlias" }],
        order: [["id", "ASC"]],
        where: { lobbyId: Number(lobbyId) },
      });
      return res.json(questions);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getUserAsMenteeStats = async (req, res) => {
    const { lobbyId, userId } = req.params;
    try {
      const output = await this.questionModel.findAll({
        where: { lobbyId: lobbyId, menteeId: userId },
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getUserAsMentorStats = async (req, res) => {
    const { lobbyId, userId } = req.params;
    try {
      const output = await this.questionModel.findAll({
        where: { lobbyId: lobbyId, mentorId: userId },
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getNumberOnline = async (req, res) => {
    const { lobbyId, lobbyName } = req.params;
    try {
      const output = await this.userModel.findAll({
        where: { location: lobbyName },
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  updateLocation = async (req, res) => {
    const { userId, lobbyName } = req.body;
    try {
      const userData = await this.userModel.findByPk(userId);
      userData.update({
        location: lobbyName,
      });
      return res.json(userData);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  updateUserLocationOnLogOut = async (req, res) => {
    const { userId } = req.body;
    try {
      const userData = await this.userModel.findByPk(userId);
      userData.update({
        location: null,
        online: false,
      });
      return res.json(userData);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = LobbyController;
