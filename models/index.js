const Sequelize = require("sequelize");
const user = require("./user");
const comment = require("./comment");
const hashtag = require("./hashtag");
const image = require("./image");
const post = require("./post");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Comment = comment;
db.Hashtag = hashtag;
db.Image = image;
db.Post = post;
db.User = user;

// db.User = user(sequelize, Sequelize);
// db.Comment = comment(sequelize, Sequelize);
// db.Hashtag = hashtag(sequelize, Sequelize);
// db.Image = image(sequelize, Sequelize);
// db.Post = post(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
