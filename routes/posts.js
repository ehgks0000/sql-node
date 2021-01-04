const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"], // 유저의 아이디와 닉네임만 가져온다 // 패스워드 가져오지 않기 조심!
        },
      ],
      order: [
        ["createdAt", "DESC"],
        ["updatedAt", "ASC"],
      ], // 2차원 배열인 이유 , 조건을 여러개 줄수있다.
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
