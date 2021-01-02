module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false, //필수
      },
    },
    { charset: "utf8mb4", collate: "utf8mb4_general_ci" } // 한글 저장 설정
  );

  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" }); // 글을 많이 적을수 있다
  };

  return Hashtag;
};
