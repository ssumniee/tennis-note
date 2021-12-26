const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");
const config = require("./config");
const {
  cors: { allowedOrigin },
} = require("./config");
const cron = require("node-cron");

const authRouter = require("./router/auth");
const studentRouter = require("./router/student");
const clubRouter = require("./router/club");
const utilRouter = require("./router/util");
const app = express();

const corsOption = { origin: allowedOrigin, optionsSuccessStatus: 200, credentials: true };
app.use(cors(corsOption));
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Tennis Note!");
});
app.use("/auth", authRouter);
app.use("/student", studentRouter);
app.use("/club", clubRouter);
app.use("/util", utilRouter);

app.listen(config.port, async () => {
  console.log(`🚀 Listening on PORT: ${config.port}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

// 스케쥴러 설정: 각 요일의 자정마다, 그 전날에 수업이 있었던 수강생의 수업 횟수 1회씩 차감
const { minusUserCounts } = require("./controllers/functions/sequelize");
const days = [
  { id: 1, name: "Mon", toMinus: 7 },
  { id: 2, name: "Tue", toMinus: 1 },
  { id: 3, name: "Wed", toMinus: 2 },
  { id: 4, name: "Thu", toMinus: 3 },
  { id: 5, name: "Fri", toMinus: 4 },
  { id: 6, name: "Sat", toMinus: 5 },
  { id: 7, name: "Sun", toMinus: 6 },
];
days.forEach((day) => {
  cron.schedule(`0 0 0 * * ${day.name}`, async () => {
    try {
      const updated = await minusUserCounts(day.toMinus);
      console.log({ message: "counts updated", updated });
    } catch (err) {
      console.error(err);
    }
  });
});

// 스케쥴러 설정: 매일 오전 10시마다, 수업 횟수가 0인 수강생에게 재결제 알림 보내기
const { findAllClubInfo } = require("./controllers/functions/sequelize");
const { sendRepaymentSMS } = require("./controllers/util");
cron.schedule("0 0 9 * * *", async () => {
  try {
    const { clubs } = await findAllClubInfo();
    clubs.forEach(async (clubInfo) => await sendRepaymentSMS(clubInfo));
  } catch (err) {
    console.error(err);
  }
});
