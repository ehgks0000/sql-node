const express = require("express");
const db = require("../models");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g);
    const newPost = await db.Post.create({
      content: req.body.content, // ex " 제로초 화이팅 #구독 #좋아요 눌러주세요"
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          db.Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      );
      await newPost.addHashtags(result.map((r) => r[0]));
    }
    // const User = await newPost.getUser();
    // newPost.User = User;
    // res.json(newPost);
    //-------------------------------------------------------
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: db.User, //게시글과 관련된 사람 즉 작성자
          attributes: ["id", "nickname", "email"],
        },
      ],
    });
    res.json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/images", (req, res) => {});

module.exports = router;
