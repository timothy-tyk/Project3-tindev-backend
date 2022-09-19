const BaseController = require("./baseController");

class LobbyController extends BaseController {
  constructor(model, questionModel) {
    super(model);
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
}

module.exports = LobbyController;
