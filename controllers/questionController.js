const question = require("../db/models/question");
const BaseController = require("./baseController");

const { Op } = require("sequelize");

class UserController extends BaseController {
  constructor(model, userModel) {
    super(model);
    this.userModel = userModel;
  }
  //passing in questionmodel here

  addOne = async (req, res) => {
    console.log("adding question!");
    console.log(req.body, "req body");
    const { menteeId, title, details, tokensOffered, lobbyId } = req.body;
    try {
      const newEntry = await this.model.create({
        //dont even need the createdat and updatedat bc migration&PSQL makes it for us automatically
        menteeId: menteeId,
        title: title,
        details: details,
        tokensOffered: tokensOffered,
        lobbyId: lobbyId,
        solved: false,
      });
      //after find a mentor, can set the mentor ID like below using mix-ins
      // await newEntry.setCategories(categoryId);
      console.log("insert comment!");
      return res.json(newEntry);
      //return to front end
    } catch (err) {
      console.log(err, "error");
      return res.status(400).json({ error: true, msg: err });
    }
  };

  //Find or Create method - consider using for comments on each question
  // insertOne = async (req, res) => {
  //   const { title, description, tokensOffer } = req.body;
  //   console.log("create question!");
  //   try {
  //     const [user, created] = await this.model.findOrCreate({
  //       where: { email: email },
  //       defaults: {
  //         username: username,
  //         profilepicture: profilepicture,
  //         bio: null,
  //         tokens: 50,
  //         online: true,
  //       },
  //     });
  //     if (created) {
  //       console.log("inserted");
  //       console.log(user);
  //       return res.json(user);
  //     }
  //     return res.json(user);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // };

  getOne = async (req, res) => {
    console.log("get 1 qns!");

    const { questionIndex } = req.params;
    console.log(questionIndex);
    //req.params.sightingId
    try {
      const question = await this.model.findAll({
        //eager loading champion
        include: [
          { model: this.userModel, as: "menteeIdAlias" },
          { model: this.userModel, as: "mentorIdAlias" },
        ],
        //**** */
        where: { id: questionIndex },
      });
      return res.json(question);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  updateOne = async (req, res) => {
    console.log("editing a qns now!");
    //i didnt use menteeId and lobbyId cus im querying by the questionId instead
    const { questionId, menteeId, title, details, tokensOffered, lobbyId } =
      req.body;
    console.log(req.body);
    try {
      const questionData = await this.model.findByPk(questionId);
      console.log(questionData, "questionData before update");
      questionData.update({
        title: title,
        details: details,
        tokensOffered: tokensOffered,
        // stuff that is not updated will remain the same!
        // menteeId: menteeId,
        // lobbyId: lobbyId
      });
      console.log(questionData, "questionData after update");
      return res.json(questionData);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  updateOneMentor = async (req, res) => {
    const { questionId, mentorId } = req.body;
    console.log(req.body, "req body");
    try {
      const questionData = await this.model.findByPk(questionId);
      console.log(questionData, "questionData before update");
      questionData.update({
        mentorId: mentorId,
        //add a mentorId here
      });
      console.log(questionData, "questionData after update");
      return res.json(questionData);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  updateOneStatus = async (req, res) => {
    const { questionId } = req.body;
    console.log(req.body, "req body");
    try {
      const questionData = await this.model.findByPk(questionId);
      console.log(questionData, "questionData before update");
      questionData.update({
        solved: true,
        //change status solved here when mentorId accepts
      });
      console.log(questionData, "questionData after update");
      return res.json(questionData);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getAllFromUser = async (req, res) => {
    console.log("getting all from user");

    const { userId } = req.params;
    console.log(userId, "userId from req.params");
    try {
      const questions = await this.model.findAll({
        where: {
          [Op.or]: [{ menteeId: userId }, { mentorId: userId }],
        },
      });
      // let questionsData = [];
      // questions.forEach(async (question) => {
      //   await this.model.findAll({
      //     include: [
      //       { model: this.userModel, as: "menteeIdAlias" },
      //       { model: this.userModel, as: "mentorIdAlias" },
      //     ],
      //     where: { id: question.id },
      //   });
      //   questionsData = [...questionsData, question];
      // });
      // return res.json(questionsData);
      return res.json(questions);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = UserController;
