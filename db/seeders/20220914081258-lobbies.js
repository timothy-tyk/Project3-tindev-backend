"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("lobbies", [
      {
        name: "React",
        number_online: 0,
        // messages: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Sequelize",
        number_online: 0,
        // messages: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Auth0",
        number_online: 0,
        // messages: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Material UI",
        number_online: 0,
        // messages: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "ExpressJS",
        number_online: 0,
        // messages: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "NodeJS",
        number_online: 0,
        // messages: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("lobbies", null, {});
  },
};
