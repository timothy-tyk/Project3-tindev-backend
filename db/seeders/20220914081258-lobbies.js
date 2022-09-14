"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("lobbies", [
      {
        name: "FullStack",
        number_online: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "FrontEnd",
        number_online: 12,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("lobbies", null, {});
  },
};
