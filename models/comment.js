module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false, //필수
      },
    },
    { charset: "utf8mb4", collate: "utf8mb4_general_ci" } // 한글 저장 설정
  );

  Comment.associate = (db) => {
    db.User.belongsTo(db.User); // 글을 많이 적을수 있다
    db.User.belongsTo(db.Post); // 코멘트를 많이 할 수 있다.
  };

  return Comment;
};
