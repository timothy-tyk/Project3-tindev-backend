const BaseController = require("./baseController");

class MessageController extends BaseController {
  constructor(model, userModel) {
    super(model);
    this.userModel = userModel;
    // this.usersLobbiesModel = usersLobbiesModel;
    // this.questionModel = questionModel;
  }
  getAllFromQuestion = async (req, res) => {
    const { questionId } = req.params;
    console.log("questionid", questionId);
    try {
      const output = await this.model.findAll({
        include: [{ model: this.userModel }],
        order: [["id", "ASC"]],
        where: { questionId: questionId },
      });
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addOne = async (req, res) => {
    console.log("adding message!");
    const { userId, message, questionId } = req.body;
    console.log(req.body);
    try {
      const newEntry = await this.model.create({
        //dont even need the createdat and updatedat bc migration&PSQL makes it for us automatically
        questionId: questionId,
        userId: userId,
        messageContent: message,
      });
      //after find a mentor, can set the mentor ID like below using mix-ins
      // await newEntry.setCategories(categoryId);
      return res.json(newEntry);
    } catch (err) {
      console.log(err, "error");
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = MessageController;
