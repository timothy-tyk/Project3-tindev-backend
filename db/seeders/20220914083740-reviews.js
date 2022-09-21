"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("reviews", [
      {
        reviewee_id: 1,
        question_id: 1,
        reviewer_id: 2,
        review_content: "Couldn't understand her singlish",
        role: "mentor",
        rating: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        reviewee_id: 2,
        question_id: 1,
        reviewer_id: 1,
        role: "mentee",
        rating: 1,
        review_content: "Couldn't understand his English",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        reviewee_id: 2,
        question_id: 2,
        reviewer_id: 1,
        role: "mentor",
        rating: 2,
        review_content: "Couldn't understand his English AGAIN!!",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("reviews", null, {});
  },
};
