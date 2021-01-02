const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
// const path = require("path");

const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport");

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
passportConfig();

app.use(morgan("dev"));

// app.use("/", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: true,
    // origin: "http://localhost:3000",
    credentials: true, // 이 2개가 프론트와 백엔드 쿠키 주고박기 가능하게 해줌(서로 서버가 다를 때)
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false, // https 사용 시 true
    },
    name: "klajslgkasd", //익스프레스 디폴트 이름이 connect.sid << 보안ㅇ취약할 수 있으니 이름을 무분별하게 지정
  })
);
app.use(passport.initialize());
app.use(passport.session()); //   exrpess session 아래에

app.get("/", (req, res) => {
  res.send("hello express");
});
// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use("/posts", postsRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행 중! : https://localhost:3065");
});
