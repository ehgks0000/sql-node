const express = require("express");
const db = require("../models");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g);
    const newPost = await db.Post.create({
      content: req.body.content,
    });
    if (hashtags) {
      hashtags.map((tag) =>
        db.Hashtag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() } })
      );
    }
    res.json(newPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/images", (req, res) => {});

module.exports = router;
