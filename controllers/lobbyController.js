const BaseController = require("./baseController");

class LobbyController extends BaseController {
  constructor(model, userModel) {
    super(model);
    // this.userModel = userModel;
  }
  // getAllUserJoined = async (req, res) => {
  //   const { userId } = req.params;
  //   console.log(userId);
  //   try {
  //     const output = await this.model.findAll();
  //     return res.json(output);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // };
}

module.exports = LobbyController;
