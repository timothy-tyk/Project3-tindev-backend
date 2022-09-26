"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("questions", [
      {
        mentee_id: 1,
        title: "How to open VSCode?",
        details: `{"blocks":[{"key":"as43o","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
        tokens_offered: 5,
        mentor_id: 2,
        lobby_id: 1,
        solved: true,
        img_url:
          "https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimageio.forbes.com%2Fspecials-images%2Fdam%2Fimageserve%2F958761228%2F960x0.jpg%3Fformat%3Djpg%26width%3D960",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        mentee_id: 2,
        title: "Javascript HELP!!",
        details: `{"blocks":[{"key":"as43o","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
        tokens_offered: 25,
        mentor_id: 1,
        lobby_id: 1,
        solved: true,
        img_url:
          "https://i.picsum.photos/id/169/200/300.jpg?hmac=5EPn5kvK71xgHn-1BAILeGz45FNBGasUBZQulf9HOmU",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("questions", null, {});
  },
};
