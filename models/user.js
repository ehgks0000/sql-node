module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User", // 대문자로 하면 자동으로 앞은 소문자 뒤는 s가 붙어서  "users" 이렇게 테이블이 생김
    {
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false, //필수
      },
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true, // 고유한 값
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    { charset: "utf8", collate: "utf8_general_ci" } // 한글 저장 설정
  );

  User.associate = (db) => {
    db.User.hashMany(db.Post, { as: "Posts" }); // 글을 많이 적을수 있다
    db.User.hashMany(db.Comment); // 코멘트를 많이 할 수 있다.
    dp.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); // 한 유저가 내 게시글 좋아요 또는 하나의 게시글이 여러개의 좋아요 // 다대다 라이크
    db.User.belongsToMany(db.User, { through: "Follow", as: "Followers" });
    db.User.belongsToMany(db.User, { through: "Follow", as: "Followings" }); //한테이블이 자기자신을 불러올때 2개 //
    // 유저가 유저를 팔로우 다대다
    //Tip! belongsToMany는 as를 다는게 좋다
  };

  return User;
};

// const user = {                    as의 이름으로 온다
//   id: 1,
//   nickname: "tttt",
//   Liked: [{ 게시글1 }, { 게시글2 }],
//   Followers: [{ 사용자1 }, { 사용자2 }],
// };
