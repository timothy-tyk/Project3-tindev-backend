"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("messages", [
      {
        question_id: 1,
        user_id: 1,
        message_content: "Hello I need help with VSCode!",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_id: 1,
        user_id: 2,
        message_content: "Hi I'm Darren, happy to help!",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_id: 2,
        user_id: 2,
        message_content: "Need help with Javascript, please.",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("messages", null, {});
  },
};
