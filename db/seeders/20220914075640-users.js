"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        username: "MonJ",
        email: "mon@mon.com",
        profilepicture: null,
        bio: "I am MonJ",
        tokens: 50,
        lobbies_join: [1, 2],
        online: false,
        rating: 0.12,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "DarTan11",
        email: "dt@dt.com",
        profilepicture: null,
        bio: "I am DarTan",
        tokens: 50,
        lobbies_join: [1],
        online: false,
        rating: 0.34,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
