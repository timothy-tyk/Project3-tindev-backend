const BaseController = require("./baseController");

class LobbyController extends BaseController {
  constructor(model, userModel, usersLobbiesModel) {
    super(model);
    this.userModel = userModel;
    this.usersLobbiesModel = usersLobbiesModel;
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
}

module.exports = LobbyController;
