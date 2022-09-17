const BaseController = require("./baseController");

class UserController extends BaseController {
  constructor(model) {
    super(model);
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
        status: false,
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
      const question = await this.model.findByPk(questionIndex);
      return res.json(question);
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
}

module.exports = UserController;
