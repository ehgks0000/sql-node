module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false, //필수
      },
    },
    { charset: "utf8mb4", collate: "utf8mb4_general_ci" } // 한글 저장 설정
  );

  Image.associate = (db) => {
    db.User.belongsTo(db.Comment); // 게시글이 이미지를 여러개 가질수있음
  };

  return Image;
};
