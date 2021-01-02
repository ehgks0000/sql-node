module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT, // 매우 긴 글
        // type: DataTypes.STRING(140), // 매우 긴 글
        allowNull: false, //필수
      },
    },
    { charset: "utf8mb4", collate: "utf8mb4_general_ci" } // 한글 저장 설정
  );

  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 글을 많이 적을수 있다
    db.Post.hashMany(db.Comment); // 코멘트를 많이 할 수 있다.
    db.Post.hashMany(db.Image); // 코멘트를 많이 할 수 있다.  --> 최신 DB들은 Post테이블안에 이미지 배열을 지원하지만 통계에서 문제가 생긴다?
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // 이름 구별안갈때// 내글을 리트윗
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // 다대다 관계
    dp.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // 한 유저가 내 게시글 좋아요 또는 하나의 게시글이 여러개의 좋아요 // 다대다 라이크
  };

  return Post;
};
