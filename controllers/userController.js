const BaseController = require("./baseController");

class UserController extends BaseController {
  constructor(model) {
    super(model);
  }

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
}

module.exports = UserController;
