const BaseController = require("./baseController");

const { Op } = require("sequelize");

class ReviewController extends BaseController {
  constructor(model, userModel) {
    super(model);
    this.userModel = userModel;
  }

  addOne = async (req, res) => {
    console.log("adding review!");
    console.log(req.body, "req body");
    const { reviewContent, reviewerId, revieweeId, questionId, role, rating } =
      req.body;
    try {
      const newEntry = await this.model.create({
        reviewContent: reviewContent,
        reviewerId: reviewerId,
        revieweeId: revieweeId,
        questionId: questionId,
        role: role,
        rating: rating,
      });
      console.log("inserted review!");
      return res.json(newEntry);
      //return to front end
    } catch (err) {
      console.log(err, "error");
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getOne = async (req, res) => {
    console.log("get 1 qns!");

    const { questionIndex } = req.params;
    console.log(questionIndex);

    try {
      const question = await this.model.findAll({
        where: { questionId: questionIndex },
        include: [{ model: this.userModel, as: "reviewerIdAlias" }],
      });
      return res.json(question);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = ReviewController;
