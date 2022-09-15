const BaseController = require("./baseController");

class UserController extends BaseController {
  constructor(model) {
    super(model);
  }

  insertOne = async (req, res) => {
    const { username, email, profilepicture, bio } = req.body;
    console.log("here");
    console.log(req.body);
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
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = UserController;
