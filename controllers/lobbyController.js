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
      const output = await this.model.findByPk(lobbyId);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getQuestions = async (req, res) => {
    const { lobbyId } = req.params;
    console.log(lobbyId);
    try {
      const questions = await this.questionModel.findAll({
        //eager loading champion
        include: [{ model: this.userModel, as: "menteeIdAlias" }],
        order: [["id", "ASC"]],
        //**** */
        where: { lobbyId: Number(lobbyId) },
      });
      return res.json(questions);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getUserAsMenteeStats = async (req, res) => {
    const { lobbyId, userId } = req.params;
    console.log(userId);
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
    console.log(userId);
    try {
      const output = await this.questionModel.findAll({
        where: { lobbyId: lobbyId, mentorId: userId },
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = LobbyController;
